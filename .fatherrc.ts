import { defineConfig } from 'father';

export default defineConfig({
    platform: 'browser',
    esm: { output: 'dist' },
    prebundle: {
        deps: {},
    },
});
