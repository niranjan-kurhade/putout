'use strict';

const {operator, types} = require('putout');

const {remove} = operator;
const {isProgram} = types;

const isStrictMode = (a) => a.node.value.value === 'use strict';

module.exports.report = () => `Avoid 'use strict' in ESM`;

module.exports.fix = (path) => remove(path);

module.exports.traverse = ({push, store}) => ({
    'await __a(__args)'({scope}) {
        const {block} = scope;
        
        if (isProgram(block))
            store('is-module', true);
    },
    'ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|ExportAllDeclaration'() {
        store('is-module', true);
    },
    Program: {
        exit(path) {
            const [strictPath, ...paths] = path.get('body');
            
            for (const path of paths) {
                if (path.isExpressionStatement() && path.node.expression.value === 'use strict') {
                    push(path);
                }
            }
            
            const directives = path.get('directives');
            
            if (directives.length) {
                directives
                    .slice(1)
                    .filter(isStrictMode)
                    .forEach(push);
            }
            
            if (!store('is-module'))
                return;
            
            directives
                .filter(isStrictMode)
                .forEach(push);
            
            if (strictPath.isExpressionStatement() && strictPath.node.expression.value === 'use strict')
                push(strictPath);
        },
    },
});
