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

## Optional Tag Helpers

At the cost of a modestly larger import and slight function call overhead,
you can also use a set of named tag function helpers for terser syntax.

**Important**: bare string children **must** be enclosed in an array.
`h('div', 'kittens')` or `div(['kittens'])` are ok, `div('kittens')` is NOT.

```js
// h() is passed through as an export so you don't need to require preact
const { h, span, div } = require('phy/preact/tags');

module.exports = function SomeComponent() {
  return div('#foo', [span(['kittens']), h(SomeOtherComponent)]);
}
```

License
----------------------------------------------------------------------

[BSD 3-Clause open source license](LICENSE)
