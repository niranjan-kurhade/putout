'use strict';

const {createTest} = require('@putout/test');
const typescript = require('@putout/plugin-typescript');

const remove = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['strict-mode/remove', remove],
    ],
});

test('plugin-strict-mode: remove: report', (t) => {
    t.report('esm', `Avoid 'use strict' in ESM`);
    t.end();
});

test('plugin-strict-mode: remove: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-strict-mode: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: remove: export all', (t) => {
    t.transform('export-all');
    t.end();
});

test('plugin-strict-mode: remove: transform: top-level-await', (t) => {
    t.transform('top-level-await');
    t.end();
});

test('plugin-strict-mode: remove: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-strict-mode: remove: no transform: use-client', (t) => {
    t.noTransform('use-client');
    t.end();
});

test('plugin-strict-mode: remove: transform: typescript', (t) => {
    t.transform('typescript', {
        typescript,
    });
    t.end();
});
