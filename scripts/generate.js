const { SyntaxKind, Project } = require('ts-morph');
const path = require('path');

const project = new Project();

project.addSourceFilesAtPaths('src/**/__tests__/*.tsx');

const testFiles = project.getSourceFiles();

const results = [];

testFiles.forEach((sourceFile) => {
    const fileName = sourceFile.getBaseName();
    const componentName = fileName.match(/^(\w+)\.test\.tsx/)[1] || '';
    /**
     * @type {CallExpression}
     */
    let describeCallExpression = null;

    // Get "describe" jest function call expression first
    const expressionStatements = sourceFile.getStatements().filter((s) => s.isKind(SyntaxKind.ExpressionStatement));
    expressionStatements.forEach((s) => {
        const callExpressions = s.getChildrenOfKind(SyntaxKind.CallExpression);
        callExpressions.forEach((callExpression) => {
            const identifier = callExpression.getFirstChildByKind(SyntaxKind.Identifier);
            if (identifier?.getText() === 'describe') {
                describeCallExpression = callExpression;
            }
        });
    });

    if (!describeCallExpression) return;

    const [_, describeFunc] = describeCallExpression.getArguments();
    const exampleCodeMap = new Map();

    describeFunc
        .asKind(SyntaxKind.ArrowFunction)
        .getStatements()
        .forEach((s) => {
            if (s.isKind(SyntaxKind.ExpressionStatement)) {
                const jsDoc = s.getFirstChildByKind(SyntaxKind.JSDoc);
                // Only record test example code with @link jsdoc tag
                const jsDocLinkTag = jsDoc
                    ?.getChildrenOfKind(SyntaxKind.JSDocTag)
                    .find((tag) => tag.getFirstChildByKind(SyntaxKind.Identifier)?.getText() === 'link');
                const linkMethodName = jsDocLinkTag?.getCommentText();
                if (!linkMethodName) return;

                s.getChildrenOfKind(SyntaxKind.CallExpression).forEach((callExpression) => {
                    const identifier = callExpression.getFirstChildByKind(SyntaxKind.Identifier);
                    if (['test', 'it'].includes(identifier?.getText())) {
                        const [_, testFn] = callExpression.getArguments();
                        const exampleCode = testFn.asKind(SyntaxKind.ArrowFunction).getBodyText();
                        exampleCodeMap.set(linkMethodName, exampleCode);
                    }
                });
            }
        });

    results.push({ componentName, exampleCodeMap });
});

function capitalizeFirstLetter(input) {
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
}

function addImportModule(sourceFile, moduleNames, path) {
    const existingImport = sourceFile.getImportDeclaration(
        (declaration) => declaration.getModuleSpecifierValue() === path
    );

    if (existingImport) {
        existingImport.addNamedImports(moduleNames);
    } else {
        sourceFile.addImportDeclaration({
            namedImports: moduleNames,
            moduleSpecifier: path,
        });
    }
}

const outputProject = new Project();
outputProject.addSourceFilesAtPaths('dist/(esm|cjs)/*/index.d.ts');

outputProject.getSourceFiles().forEach((outputFile) => {
    const dirPath = outputFile.getDirectoryPath();
    const dirName = path.basename(dirPath);
    const result = results.find(({ componentName }) => componentName === dirName);
    if (!result || result.exampleCodeMap.size === 0) return;

    const { exampleCodeMap } = result;

    addImportModule(outputFile, ['MixinElement'], '../interface');

    outputFile.getStatements().forEach((s) => {
        // It may be arrow function or common function
        if (![SyntaxKind.VariableStatement, SyntaxKind.FunctionDeclaration].includes(s.getKind())) return;
        const declaration = s.isKind(SyntaxKind.VariableStatement) ? s.getDeclarations()?.[0] : s;
        if (!declaration) return;

        // Find method declaration and if it has example test code, add jsdoc
        const methodName = declaration.getFirstChildByKind(SyntaxKind.Identifier)?.getText();

        // Extract complex return types to outside
        if (methodName?.startsWith('query')) {
            const returnType = declaration.getReturnTypeNode();
            const returnTypeText = returnType.getText()?.replace('import("../interface").MixinElement', 'MixinElement');
            const newTypeAliasName = capitalizeFirstLetter(methodName) + 'ReturnElement';
            declaration.setReturnType(newTypeAliasName);
            outputFile.addTypeAlias({
                name: newTypeAliasName,
                type: returnTypeText,
            });
        }

        if (!exampleCodeMap.has(methodName)) return;
        const testExampleCode = exampleCodeMap.get(methodName);

        // If method has jsdoc already, append it, or add a new jsdoc with example code
        const jsDoc = s.getJsDocs().at(0) || s.addJsDoc({ tags: [] });
        jsDoc.addTag({ tagName: 'example', text: '\n' + testExampleCode });
    });

    outputFile.saveSync();
});
