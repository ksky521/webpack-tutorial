const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const gen = require('@babel/generator').default;
// const t = require('@babel/types')

let source = fs.readFileSync('./source.js');

babel.parse(source, (err, ast) => {
    // console.log(err, ast)
    let indent = '';
    traverse(ast, {
        enter(path) {
            console.log(indent + '<' + path.node.type + '>');
            indent += '  ';
        },
        exit(path) {
            indent = indent.slice(0, -2);
            console.log(indent + '<' + '/' + path.node.type + '>');
        }
    });
    // vistors
    // let paramName
    // const vistors = {
    //   FunctionDeclaration(path) {
    //     const param = path.node.params[0]
    //     paramName = param.name
    //     param.name = 'x'
    //   },

    //   Identifier(path) {
    //     if (path.node.name === paramName) {
    //       path.node.name = 'x'
    //     }
    //   }
    // }
    // traverse(ast, vistors)
    gen(ast).code;
});
