[![nlm-github](https://img.shields.io/badge/github-groupon%2Fphy%2Fissues-F4D03F?logo=github&logoColor=white)](https://github.com/groupon/phy/issues)
![nlm-node](https://img.shields.io/badge/node-%3E%3D8.3-blue?logo=node.js&logoColor=white)
![nlm-version](https://img.shields.io/badge/version-4.2.5-blue?logo=version&logoColor=white)
# `phy`

Minimal hyperscript helpers for Preact.

The intent while creating this package was to create as small of a footprint as possible, with only Preact as a dependency.

## Examples

```js
const h = require('phy');

module.exports = function SomeComponent() {
  return h('#foo', h('span.bar', 'whee!'));
}
```

or, if you need access to other things from Preact, `Component` and `render`
are passed thru for your convenience:

```js
const { h, Component } = require('phy');

class SomeComponent extends Component {
  render() {
    return h('#foo', h('span.bar', 'whee!'));
  }
}
module.exports = SomeComponent;
```

You can create a Fragment tersely by passing only one argument: an
array of other nodes or strings:

```js
const frag = h([
  h('div', 'one'),
  h('div', 'two'),
  'three'
]);

// is equivalent to:

const { Fragment } = require('preact');
const frag = h(Fragment, [
  h('div', 'one'),
  h('div', 'two'),
  'three'
]);
```

## Optional Tag Helpers

At the cost of a modestly larger import and slight function call overhead,
you can also use a set of named tag function helpers for terser syntax.

**Important**: bare string children **must** be enclosed in an array.
`h('div', 'kittens')` or `div(['kittens'])` are ok, `div('kittens')` is NOT.

```js
// h() is passed through as an export so you don't need to require preact
const { h, span, div } = require('phy/tags');

module.exports = function SomeComponent() {
  return div('#foo', [span(['kittens']), h(SomeOtherComponent)]);
}
```

License
----------------------------------------------------------------------

[BSD 3-Clause open source license](LICENSE)
