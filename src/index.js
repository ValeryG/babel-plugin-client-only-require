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

                    console.log("HERE?", from, filePath);

                    path.replaceWith(t.IfStatement(
                        {
                            "type": "UnaryExpression",
                            "start": 4,
                            "end": 98,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 5,
                                    "column": 2
                                }
                            },
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                                "type": "UnaryExpression",
                                "start": 5,
                                "end": 98,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 2
                                    }
                                },
                                "operator": "!",
                                "prefix": true,
                                "argument": {
                                    "type": "LogicalExpression",
                                    "start": 10,
                                    "end": 95,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 31
                                        }
                                    },
                                    "left": {
                                        "type": "LogicalExpression",
                                        "start": 10,
                                        "end": 60,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 17
                                            }
                                        },
                                        "left": {
                                            "type": "BinaryExpression",
                                            "start": 10,
                                            "end": 39,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 31
                                                }
                                            },
                                            "left": {
                                                "type": "UnaryExpression",
                                                "start": 10,
                                                "end": 23,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 2
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 15
                                                    }
                                                },
                                                "operator": "typeof",
                                                "prefix": true,
                                                "argument": {
                                                    "type": "Identifier",
                                                    "start": 17,
                                                    "end": 23,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 9
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 15
                                                        },
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
                                                "start": 28,
                                                "end": 39,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 20
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 31
                                                    }
                                                },
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
                                            "start": 45,
                                            "end": 60,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 17
                                                }
                                            },
                                            "object": {
                                                "type": "Identifier",
                                                "start": 45,
                                                "end": 51,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 2
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 8
                                                    },
                                                    "identifierName": "window"
                                                },
                                                "name": "window"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "start": 52,
                                                "end": 60,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 9
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 17
                                                    },
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
                                        "start": 66,
                                        "end": 95,
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 31
                                            }
                                        },
                                        "object": {
                                            "type": "MemberExpression",
                                            "start": 66,
                                            "end": 81,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 17
                                                }
                                            },
                                            "object": {
                                                "type": "Identifier",
                                                "start": 66,
                                                "end": 72,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 2
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 8
                                                    },
                                                    "identifierName": "window"
                                                },
                                                "name": "window"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "start": 73,
                                                "end": 81,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 9
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 17
                                                    },
                                                    "identifierName": "document"
                                                },
                                                "name": "document"
                                            },
                                            "computed": false
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "start": 82,
                                            "end": 95,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 31
                                                },
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
                                            "value": filePath+'qqq'
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
