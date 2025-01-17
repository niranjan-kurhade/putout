'use strict';

const camel = require('just-camel-case');
const {
    types,
    operator,
    template,
} = require('putout');

const {
    replaceWith,
    insertBefore,
    compare,
} = operator;

const {
    ObjectProperty,
    Identifier,
    StringLiteral,
} = types;

module.exports.report = () => `Use top-level 'require()' instead of '...getRule()'`;

const REQUIRE = `const __a = require(__b)`;
const createRequire = template(REQUIRE, {
    placeholderPattern: /__/,
});

module.exports.match = () => ({
    'getRule(__a)': ({__a}, path) => {
        const name = __a.value;
        
        if (!path.parentPath.isSpreadElement())
            return false;
        
        return !path.scope.getAllBindings()[name];
    },
});

module.exports.replace = () => ({
    'getRule(__a)': ({__a}, path) => {
        const name = camel(__a.value);
        const id = Identifier(name);
        const node = ObjectProperty(__a, id);
        
        replaceWith(path.parentPath, node);
        
        const programPath = path.scope.getProgramParent().path;
        const body = programPath.get('body');
        const [first] = body;
        
        const nodeRequire = createRequire({
            __a: id,
            __b: StringLiteral(`./${__a.value}`),
        });
        
        if (compare(first, REQUIRE)) {
            const latest = getLatest(body.slice(1));
            insertBefore(latest, nodeRequire);
            
            return path;
        }
        
        programPath.node.body.unshift(nodeRequire);
        
        return path;
    },
});

function getLatest(body) {
    let path;
    
    for (path of body)
        if (!compare(path, REQUIRE))
            break;
    
    return path;
}
