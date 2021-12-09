'use strict';

const removeNestedBlocks = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-nested-blocks': removeNestedBlocks,
});

test('plugin-remove-nested-blocks: report', (t) => {
    t.report('for-of', 'Avoid nested blocks');
    t.end();
});

test('plugin-remove-nested-blocks: transform', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-nested-blocks: transform: switch: no vars', (t) => {
    t.transform('switch-no-vars');
    t.end();
});

test('plugin-remove-nested-blocks: transform: vars', (t) => {
    t.transform('vars');
    t.end();
});

test('plugin-remove-nested-blocks: no transform: switch', (t) => {
    t.noTransform('switch');
    t.end();
});

test('plugin-remove-nested-blocks: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
