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

const outputProject = new Project();
outputProject.addSourceFilesAtPaths('dist/(esm|cjs)/*/index.d.ts');

results.forEach(({ componentName, exampleCodeMap }) => {
    const outputFile = outputProject.getSourceFile((file) => {
        const dirPath = file.getDirectoryPath();
        const dirName = path.basename(dirPath);
        return componentName === dirName;
    });
    if (!outputFile || !exampleCodeMap.size) return;

    outputFile.getStatements().forEach((s) => {
        // It may be arrow function or common function
        if (![SyntaxKind.VariableStatement, SyntaxKind.FunctionDeclaration].includes(s.getKind())) return;
        const declaration = s.isKind(SyntaxKind.VariableStatement) ? s.getDeclarations()?.[0] : s;
        if (!declaration) return;

        // Find method declaration and if it has example test code, add jsdoc
        const methodName = declaration.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
        if (!exampleCodeMap.has(methodName)) return;
        const testExampleCode = exampleCodeMap.get(methodName);

        // If method has jsdoc already, append it, or add a new jsdoc with example code
        const jsDoc = s.getJsDocs().at(0) || s.addJsDoc({ tags: [] });
        jsDoc.addTag({ tagName: 'example', text: '\n' + testExampleCode });
    });

    outputFile.saveSync();
});
