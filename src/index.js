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
                                 "type": "UnaryExpression",
                                 "start": 4,
                                 "end": 89,
                                 "loc": {
                                   "start": {
                                     "line": 1,
                                     "column": 4
                                   },
                                   "end": {
                                     "line": 1,
                                     "column": 89
                                   }
                                 },
                                 "operator": "!",
                                 "prefix": true,
                                 "argument": {
                                   "type": "UnaryExpression",
                                   "start": 5,
                                   "end": 89,
                                   "loc": {
                                     "start": {
                                       "line": 1,
                                       "column": 5
                                     },
                                     "end": {
                                       "line": 1,
                                       "column": 89
                                     }
                                   },
                                   "operator": "!",
                                   "prefix": true,
                                   "argument": {
                                     "type": "LogicalExpression",
                                     "start": 7,
                                     "end": 88,
                                     "loc": {
                                       "start": {
                                         "line": 1,
                                         "column": 7
                                       },
                                       "end": {
                                         "line": 1,
                                         "column": 88
                                       }
                                     },
                                     "left": {
                                       "type": "LogicalExpression",
                                       "start": 7,
                                       "end": 55,
                                       "loc": {
                                         "start": {
                                           "line": 1,
                                           "column": 7
                                         },
                                         "end": {
                                           "line": 1,
                                           "column": 55
                                         }
                                       },
                                       "left": {
                                         "type": "BinaryExpression",
                                         "start": 7,
                                         "end": 36,
                                         "loc": {
                                           "start": {
                                             "line": 1,
                                             "column": 7
                                           },
                                           "end": {
                                             "line": 1,
                                             "column": 36
                                           }
                                         },
                                         "left": {
                                           "type": "UnaryExpression",
                                           "start": 7,
                                           "end": 20,
                                           "loc": {
                                             "start": {
                                               "line": 1,
                                               "column": 7
                                             },
                                             "end": {
                                               "line": 1,
                                               "column": 20
                                             }
                                           },
                                           "operator": "typeof",
                                           "prefix": true,
                                           "argument": {
                                             "type": "Identifier",
                                             "start": 14,
                                             "end": 20,
                                             "loc": {
                                               "start": {
                                                 "line": 1,
                                                 "column": 14
                                               },
                                               "end": {
                                                 "line": 1,
                                                 "column": 20
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
                                           "start": 25,
                                           "end": 36,
                                           "loc": {
                                             "start": {
                                               "line": 1,
                                               "column": 25
                                             },
                                             "end": {
                                               "line": 1,
                                               "column": 36
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
                                         "start": 40,
                                         "end": 55,
                                         "loc": {
                                           "start": {
                                             "line": 1,
                                             "column": 40
                                           },
                                           "end": {
                                             "line": 1,
                                             "column": 55
                                           }
                                         },
                                         "object": {
                                           "type": "Identifier",
                                           "start": 40,
                                           "end": 46,
                                           "loc": {
                                             "start": {
                                               "line": 1,
                                               "column": 40
                                             },
                                             "end": {
                                               "line": 1,
                                               "column": 46
                                             },
                                             "identifierName": "window"
                                           },
                                           "name": "window"
                                         },
                                         "property": {
                                           "type": "Identifier",
                                           "start": 47,
                                           "end": 55,
                                           "loc": {
                                             "start": {
                                               "line": 1,
                                               "column": 47
                                             },
                                             "end": {
                                               "line": 1,
                                               "column": 55
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
                                       "start": 59,
                                       "end": 88,
                                       "loc": {
                                         "start": {
                                           "line": 1,
                                           "column": 59
                                         },
                                         "end": {
                                           "line": 1,
                                           "column": 88
                                         }
                                       },
                                       "object": {
                                         "type": "MemberExpression",
                                         "start": 59,
                                         "end": 74,
                                         "loc": {
                                           "start": {
                                             "line": 1,
                                             "column": 59
                                           },
                                           "end": {
                                             "line": 1,
                                             "column": 74
                                           }
                                         },
                                         "object": {
                                           "type": "Identifier",
                                           "start": 59,
                                           "end": 65,
                                           "loc": {
                                             "start": {
                                               "line": 1,
                                               "column": 59
                                             },
                                             "end": {
                                               "line": 1,
                                               "column": 65
                                             },
                                             "identifierName": "window"
                                           },
                                           "name": "window"
                                         },
                                         "property": {
                                           "type": "Identifier",
                                           "start": 66,
                                           "end": 74,
                                           "loc": {
                                             "start": {
                                               "line": 1,
                                               "column": 66
                                             },
                                             "end": {
                                               "line": 1,
                                               "column": 74
                                             },
                                             "identifierName": "document"
                                           },
                                           "name": "document"
                                         },
                                         "computed": false
                                       },
                                       "property": {
                                         "type": "Identifier",
                                         "start": 75,
                                         "end": 88,
                                         "loc": {
                                           "start": {
                                             "line": 1,
                                             "column": 75
                                           },
                                           "end": {
                                             "line": 1,
                                             "column": 88
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
