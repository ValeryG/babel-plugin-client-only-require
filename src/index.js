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
                            value : filePath,
                            clientOnlyRequire
                        }
                    ] = args;

                    if (clientOnlyRequire) {
                        return;
                    }

                    path.replaceWith(t.IfStatement(
                        {
                            "type": "UnaryExpression",
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "!",
                                "prefix": true,
                                "argument": {
                                    "type": "LogicalExpression",
                                    "left": {
                                        "type": "LogicalExpression",
                                        "left": {
                                            "type": "BinaryExpression",
                                            "left": {
                                                "type": "UnaryExpression",
                                                "operator": "typeof",
                                                "prefix": true,
                                                "argument": {
                                                    "type": "Identifier",
                                                    "loc": {
                                                        "identifierName": "window"
                                                    },
                                                    "name": "window"
                                                },
                                                "extra": {
                                                    "parenthesizedArgument": false
                                                }
                                            },
                                            "operator": "!==",
                                            "right": {
                                                "type": "StringLiteral",
                                                "extra": {
                                                    "rawValue": "undefined",
                                                    "raw": "'undefined'"
                                                },
                                                "value": "undefined"
                                            }
                                        },
                                        "operator": "&&",
                                        "right": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "identifierName": "window"
                                                },
                                                "name": "window"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "identifierName": "document"
                                                },
                                                "name": "document"
                                            },
                                            "computed": false
                                        }
                                    },
                                    "operator": "&&",
                                    "right": {
                                        "type": "MemberExpression",
                                        "object": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "identifierName": "window"
                                                },
                                                "name": "window"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "identifierName": "document"
                                                },
                                                "name": "document"
                                            },
                                            "computed": false
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "loc": {
                                                "identifierName": "createElement"
                                            },
                                            "name": "createElement"
                                        },
                                        "computed": false
                                    },
                                    "extra": {
                                        "parenthesized": true,
                                        "parenStart": 6
                                    }
                                },
                                "extra": {
                                    "parenthesizedArgument": false
                                }
                            },
                            "extra": {
                                "parenthesizedArgument": false
                            }
                        },

                     {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "require"
                                    },
                                    "arguments": [
                                        {
                                            "type": "StringLiteral",
                                            "value": filePath,
                                            clientOnlyRequire: true
                                        }
                                    ]
                                }
                            }
                        ],
                        "directives": []
                     }
                 ));

                }
            }
        }
    };
}
