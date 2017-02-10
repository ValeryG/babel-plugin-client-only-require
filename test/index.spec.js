import { transformFileSync } from 'babel-core';
import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

describe('transforms assets', () => {


    const transform = (filename, config = {}) =>
        transformFileSync(path.resolve(__dirname,`${filename}`), {
            babelrc: false,
            presets: ['es2015'],
            plugins: [
                ['../../src/index.js', config],
            ]
        });

        it('change to conditional require for less and css for imports vars', () => {
            expect(transform('fixtures/import.js', {
                extensions: ['css', 'less'],
            }).code).to.be.equal(
`'use strict';

!!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('a.css') : void 0;
!!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('b.less') : void 0;

require('c');

require('d.jsx');`
            );
        });


        it('change to conditional require for less and css for imports', () => {

            expect(transform('fixtures/import1.js', {
                extensions: ['css', 'less'],
            }).code).to.be.equal(
`'use strict';

var _a = !!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('a.css') : void 0;

var _a2 = _interopRequireDefault(_a);

var _b = !!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('b.less') : void 0;

var _c = require('c');

var _d = require('d.jsx');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }`
            );
        });


        it('change to conditional require for less and css for requires', () => {
            expect(transform('fixtures/require.js', {
                extensions: ['css', 'less'],
            }).code).to.be.equal(
`'use strict';

!!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('a.css') : void 0;
!!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('b.less') : void 0;
require('c');
require('d.jsx');`
            );
        });

        it('change to conditional require for less and css for require vars', () => {

            expect(transform('fixtures/require1.js', {
                extensions: ['css', 'less'],
            }).code).to.be.equal(
`'use strict';

var va = !!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('a.css') : void 0;
var vb = (!!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require('b.less') : void 0).default;
var vc = require('c');
var vd = require('d.jsx');`
            );
        });

});
