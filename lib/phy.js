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

const preact = require('preact');

/**
 * @typedef {preact.VNode} VNode
 * @typedef {preact.ComponentType} ComponentType
 * @typedef {preact.ComponentChildren} ComponentChildren
 */

// VNode props https://github.com/preactjs/preact/blob/master/src/index.d.ts#L14-L17
const VNODE_ATTRS = ['props', 'type', 'key', 'ref'];

/** @param {object} obj
 *  @returns {boolean}
 */
function isPreactNode(obj) {
  if (!obj) {
    return false;
  }
  return VNODE_ATTRS.every(prop =>
    Object.prototype.hasOwnProperty.call(obj, prop)
  );
}

const objectToString = Object.toString();

/** @param {VNode | Readonly<Record<string, any>>} obj */
function isAttributes(obj) {
  return (
    'object' === typeof obj &&
    (!obj.constructor || obj.constructor.toString() === objectToString) &&
    !isPreactNode(obj)
  );
}

// possible arg combos (eliding createElement) (kids* = 0-or-more-kids):
/**
 * @param {typeof preact.createElement} createElement
 * @param {string | ComponentType} selector
 * @param {Readonly<Record<string, any>>} [attrs]
 * @param {ComponentChildren[]} kids
 */
function h(createElement, selector, attrs, ...kids) {
  if (attrs) {
    if (!isAttributes(attrs)) {
      kids.unshift(/** @type {ComponentChildren} */ (attrs));
      attrs = {};
    }
  } else attrs = {};

  if ('string' !== typeof selector) {
    return createElement(selector, attrs, ...kids);
  }

  let tag = 'div';

  const { class: klass, className, ...restAttrs } = attrs;
  const attrClass = klass || className;
  /** @type {Set<string>} */
  const classes = new Set(attrClass ? attrClass.trim().split(/\s+/) : []);

  // recast to remove readonly
  /** @type {Record<string, any>} */
  const attrsOut = restAttrs;

  const re = /^([a-zA-Z\d-]+)|([.#])([\w-]+)/g;
  let m;
  while ((m = re.exec(selector))) {
    const [, explicitTag, sep, classOrId] = m;
    if (explicitTag) tag = explicitTag;
    else if (sep === '#') attrsOut.id = classOrId;
    else classes.add(classOrId);
  }

  if (classes.size > 0) attrsOut.class = [...classes].join(' ');

  return createElement(tag, attrsOut, ...kids);
}

/** @type {import('./typedefs')} */
module.exports = exports = h.bind(null, preact.createElement);

exports.h = exports;
exports.isVNode = isPreactNode;
exports.Component = preact.Component;
exports.render = preact.render;
