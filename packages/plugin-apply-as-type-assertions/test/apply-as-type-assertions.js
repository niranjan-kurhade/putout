'use strict';

const applyAsTypeAssertiong = require('..');

const test = require('@putout/test')(__dirname, {
    'apply-as-type-assertiong': applyAsTypeAssertiong,
});

test('plugin-apply-as-type-assertiong: transform: report', (t) => {
    t.report('assertion', '"as" should be used for type assertions');
    t.end();
});

test('plugin-apply-as-type-assertiong: transform: object', (t) => {
    t.transform('assertion');
    t.end();
});

