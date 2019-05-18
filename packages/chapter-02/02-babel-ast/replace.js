const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const gen = require('@babel/generator').default;
const t = require('@babel/types');

let source = fs.readFileSync('./boxjs.js');
source = `
(function(){
  ${source}
})()
`;

babel.parse(source, (err, ast) => {
    let newSource;
    let first = true;
    const vistors = {
        FunctionExpression: {
            exit(path) {
                if (t.isProgram(path.parentPath.parentPath.parent)) {
                    newSource = path.node.body.body;
                }
            }
        },
        ExpressionStatement: {
            exit(path) {
                if (first && t.isProgram(path.parent)) {
                    first = false;
                    path.replaceWithMultiple(newSource);
                }
            }
        },
        ReturnStatement(path, state) {
            let parentPath = path.parentPath;

            let index = 3;
            while (index--) {
                // 循环网上查找
                parentPath = parentPath.parentPath || parentPath;
            }
            if (t.isProgram(parentPath.parent)) {
                const result = t.assignmentExpression(
                    '=',
                    t.memberExpression(t.identifier('module'), t.identifier('exports')),
                    path.node.argument
                );
                // console.log(result)
                path.replaceWith(result);
            }
        }
    };
    traverse(ast, vistors);
    console.log(gen(ast).code);
});
