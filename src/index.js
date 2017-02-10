import {dirname, isAbsolute, resolve} from 'path';

export default function transformAssets({types: t}) {

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
                            "type": "CallExpression",
                            "start": 7,
                            "end": 125,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 6,
                                    "column": 4
                                }
                            },
                            "callee": {
                                "type": "FunctionExpression",
                                "start": 8,
                                "end": 122,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 1
                                    }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 19,
                                    "end": 122,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 1
                                        }
                                    },
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "start": 21,
                                            "end": 120,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 0
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 32
                                                }
                                            },
                                            "argument": {
                                                "type": "UnaryExpression",
                                                "start": 28,
                                                "end": 120,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 7
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 32
                                                    }
                                                },
                                                "operator": "!",
                                                "prefix": true,
                                                "argument": {
                                                    "type": "UnaryExpression",
                                                    "start": 29,
                                                    "end": 120,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 8
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 32
                                                        }
                                                    },
                                                    "operator": "!",
                                                    "prefix": true,
                                                    "argument": {
                                                        "type": "LogicalExpression",
                                                        "start": 34,
                                                        "end": 119,
                                                        "loc": {
                                                            "start": {
                                                                "line": 3,
                                                                "column": 2
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 31
                                                            }
                                                        },
                                                        "left": {
                                                            "type": "LogicalExpression",
                                                            "start": 34,
                                                            "end": 84,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 2
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 17
                                                                }
                                                            },
                                                            "left": {
                                                                "type": "BinaryExpression",
                                                                "start": 34,
                                                                "end": 63,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 3,
                                                                        "column": 2
                                                                    },
                                                                    "end": {
                                                                        "line": 3,
                                                                        "column": 31
                                                                    }
                                                                },
                                                                "left": {
                                                                    "type": "UnaryExpression",
                                                                    "start": 34,
                                                                    "end": 47,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 3,
                                                                            "column": 2
                                                                        },
                                                                        "end": {
                                                                            "line": 3,
                                                                            "column": 15
                                                                        }
                                                                    },
                                                                    "operator": "typeof",
                                                                    "prefix": true,
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "start": 41,
                                                                        "end": 47,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 3,
                                                                                "column": 9
                                                                            },
                                                                            "end": {
                                                                                "line": 3,
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
                                                                    "start": 52,
                                                                    "end": 63,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 3,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 3,
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
                                                                "start": 69,
                                                                "end": 84,
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
                                                                    "start": 69,
                                                                    "end": 75,
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
                                                                    "start": 76,
                                                                    "end": 84,
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
                                                            }
                                                        },
                                                        "operator": "&&",
                                                        "right": {
                                                            "type": "MemberExpression",
                                                            "start": 90,
                                                            "end": 119,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 2
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 31
                                                                }
                                                            },
                                                            "object": {
                                                                "type": "MemberExpression",
                                                                "start": 90,
                                                                "end": 105,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 2
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 17
                                                                    }
                                                                },
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "start": 90,
                                                                    "end": 96,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 5,
                                                                            "column": 2
                                                                        },
                                                                        "end": {
                                                                            "line": 5,
                                                                            "column": 8
                                                                        },
                                                                        "identifierName": "window"
                                                                    },
                                                                    "name": "window"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "start": 97,
                                                                    "end": 105,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 5,
                                                                            "column": 9
                                                                        },
                                                                        "end": {
                                                                            "line": 5,
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
                                                                "start": 106,
                                                                "end": 119,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 18
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
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
                                                            "parenStart": 30
                                                        }
                                                    },
                                                    "extra": {
                                                        "parenthesizedArgument": false
                                                    }
                                                },
                                                "extra": {
                                                    "parenthesizedArgument": false
                                                }
                                            }
                                        }
                                    ],
                                    "directives": []
                                },
                                "extra": {
                                    "parenthesized": true,
                                    "parenStart": 7
                                }
                            },
                            "arguments": []
                        }



                     ,{
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
