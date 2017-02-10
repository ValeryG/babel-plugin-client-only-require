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
                        "type": "BinaryExpression",
                        "left": {
                            "type": "NumericLiteral",
                            "value": 1
                        },
                        "operator": "==",
                        "right": {
                            "type": "NumericLiteral",
                            "value": 1
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
