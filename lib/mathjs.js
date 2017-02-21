/* @flow */
// Custom bundling of mathjs
// http://mathjs.org/docs/custom_bundling.html

import core from 'mathjs/core';

const math = core.create();

math.import(require('mathjs/lib/type/unit'));

export default math;
