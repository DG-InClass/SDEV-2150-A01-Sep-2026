// lesson-07-jsx/vite.config.js
// We're going to configure our app to use
// JSX with vanilla JavaScript

import { defineConfig } from 'vite';

export default defineConfig({
    oxc: {
        jsx: {
            runtime: 'classic',
            pragma: 'h', // Our factory for JSX
        }
    },
});
