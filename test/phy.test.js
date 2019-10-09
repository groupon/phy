'use strict';

const assert = require('assertive');

const h = require('../');
const { Fragment } = require('preact');
const render = require('preact-render-to-string');

const { h: h2, Component } = require('../');

function Comp(props) {
  const attrs = Object.assign({}, props);
  delete attrs.children;
  return h('span', attrs, props.children);
}

class Comp2 extends Component {
  render() {
    return h2('span', 'hooray');
  }
}

const tests = [
  [
    'tag, id, multiple classes',
    h('b#some-id.and.classes'),
    '<b id="some-id" class="and classes"></b>',
  ],
  [
    'class, misc attrs',
    h('.foo', { style: 'font-weight: bold' }),
    '<div style="font-weight: bold" class="foo"></div>',
  ],
  [
    'id, className attr',
    h('#bar', { className: 'yadda' }),
    '<div class="yadda" id="bar"></div>',
  ],
  [
    'id, multiple classes, class attribute',
    h('.foo.bar#baz', { class: 'garply quux' }),
    '<div class="garply quux foo bar" id="baz"></div>',
  ],
  ['tag, string kids', h('div', 'kittens'), '<div>kittens</div>'],
  [
    'tag, multiple string kids',
    h('div', 'kittens', 'puppies'),
    '<div>kittenspuppies</div>',
  ],
  ['tag, array kids', h('b', ['kittens']), '<b>kittens</b>'],
  ['tag, element kids', h('b', h('b')), '<b><b></b></b>'],
  ['tag, null attrs, string kids', h('b', null, 'kittens'), '<b>kittens</b>'],
  [
    'tag, attrs, string kids',
    h('b', { alt: 'meow' }, 'kittens'),
    '<b alt="meow">kittens</b>',
  ],
  [
    'tag, attrs, multi-array kids',
    h('b', {}, ['kittens'], ['puppies']),
    '<b>kittenspuppies</b>',
  ],
  ['tag, attrs, element kids', h('b', {}, h('b')), '<b><b></b></b>'],
  ['component', h(Comp), '<span></span>'],
  ['component, attrs', h(Comp, { alt: 'meow' }), '<span alt="meow"></span>'],
  ['component, string kids', h(Comp, 'kittens'), '<span>kittens</span>'],
  ['component, array kids', h(Comp, ['kittens']), '<span>kittens</span>'],
  ['component, element kids', h(Comp, h('b')), '<span><b></b></span>'],
  [
    'component, null attrs, string kids',
    h(Comp, null, 'kittens'),
    '<span>kittens</span>',
  ],
  [
    'component, attrs, string kids',
    h(Comp, { alt: 'meow' }, 'kittens'),
    '<span alt="meow">kittens</span>',
  ],
  [
    'component, attrs, array kids',
    h(Comp, { alt: 'meow' }, ['kittens']),
    '<span alt="meow">kittens</span>',
  ],
  [
    'component, attrs, element kids',
    h(Comp, { alt: 'meow' }, h('b')),
    '<span alt="meow"><b></b></span>',
  ],
  ['Component passthru', h2(Comp2), '<span>hooray</span>'],
  ['Fragment basic usage', h(Fragment, 'kitten'), 'kitten'],
  [
    'Fragment complex usage',
    h('litter-box', {}, [h(Fragment, {}, ['kitten', h('toy', 'mouse')])]),
    '<litter-box>kitten<toy>mouse</toy></litter-box>',
  ],
];

describe('phy', () => {
  tests.forEach(test => {
    it(test[0], () => {
      assert.equal(test[2], render(test[1]));
    });
  });
});
