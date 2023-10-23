import { defineConfig } from 'father';

export default defineConfig({
    platform: 'node',
    esm: { output: 'dist/esm' },
    cjs: { output: 'dist/cjs' },
    prebundle: {
        deps: {},
    },
});
