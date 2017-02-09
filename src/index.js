import {dirname, isAbsolute, resolve} from 'path';

export default function transformAssets({types: t}) {
    function resolveModulePath(filename) {
        const dir = dirname(filename);

        if (isAbsolute(dir)) {
            return dir;
        }

        if (process.env.PWD) {
            return resolve(process.env.PWD, dir);
        }

        return resolve(dir);
    }

    return {
        visitor: {
            CallExpression(path, {file, opts}) {
                const currentConfig = {
                    ...opts
                };

                currentConfig.extensions = currentConfig.extensions || [];

                require('asset-require-hook')(currentConfig);

                const {
                    callee: {
                        name: calleeName
                    },
                    arguments: args
                } = path.node;

                if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
                    return;
                }

                if (currentConfig.extensions.find(ext => args[0].value.endsWith(ext))) {
                    const [
                        {
                            value : filePath
                        }
                    ] = args;

                    const from = resolveModulePath(file.opts.filename);

                    const p = require(resolve(from, filePath));
                    console.log("HERE?", from, filePath);
                    console.log("HERE?", p);
                    const replaceString = `
                        if !!(typeof window !== 'undefined' && window.document &&window.document.createElement) {
                            var x = require("${filePath}");
                        }
          `;

          //console.log(path.parentPath);
          path.replaceWith(t.BlockStatement([{
               "type": "IfStatement",
               "test": {
                   "type": "BinaryExpression",
                   "left": {
                       "type": "LiteralNumericExpression",
                       "value": 1
                   },
                   "operator": "==",
                   "right": {
                       "type": "LiteralNumericExpression",
                       "value": 2
                   }
                },
                "consequent": {
                    "type": "BlockStatement",
                    "block": {
                        "type": "Block",
                        "statements": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "IdentifierExpression",
                                        "name": "require"
                                    },
                                    "arguments": [
                                        {
                                            "type": "LiteralStringExpression",
                                            "value": "./../../../../styles/myStyles.qqq"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                "alternate": null
             }
         ]));
                }
            }
        }
    };
}
