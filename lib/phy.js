/*
 * Copyright (c) 2018, Groupon, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of GROUPON nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

// simplified from lodash
const objectCtorString = Object.toString();
function isPlainObject(obj) {
  return (
    'object' === typeof obj &&
    (!obj.constructor || obj.constructor.toString() === objectCtorString)
  );
}

const re = /^([a-zA-Z\d-]+)|([.#])([\w-]+)/g;

// possible arg combos (eliding createElement) (kids* = 0-or-more-kids):
// h(selector: Component|string, kids*: string|Element|Array[kid])
// h(selector: Component|string, attrs: object|null, kids*: string|Element|Array[kid])
function h(createElement, selector, attrs) {
  const kids = Array.from(arguments).slice(3);

  if (attrs) {
    if (!isPlainObject(attrs)) {
      kids.unshift(attrs);
      attrs = {};
    }
  } else attrs = {};

  if ('string' !== typeof selector) return createElement(selector, attrs, kids);

  let tag = 'div';
  let classes;
  let m;
  while ((m = re.exec(selector))) {
    if (m[1]) tag = m[1];
    else if (m[2] === '#') attrs.id = m[3];
    else {
      if (!classes) {
        classes = attrs.class || attrs.className;
        classes = classes
          ? classes.split(/\s+/).reduce((o, c) => {
              o[c] = true;
              return o;
            }, {})
          : {};
      }
      classes[m[3]] = true;
    }
  }
  if (classes) {
    attrs.class = Object.keys(classes).join(' ');
    delete attrs.className;
  }

  return createElement.apply(null, [tag, attrs].concat(kids));
}

module.exports = h.bind(null, require('preact').createElement);
