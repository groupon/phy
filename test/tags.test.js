'use strict';

const assert = require('assertive');
const render = require('preact-render-to-string');

const cjsTags = require('../lib/tags');

const cjsH = cjsTags.h;
const p = cjsTags.p;

function Comp(props) {
  const attrs = Object.assign({}, props);
  delete attrs.children;
  return cjsH('span', attrs, props.children);
}

const tests = {
  cjs: [
    ['pass-thru h()', cjsH(Comp, { alt: 'meow' }), '<span alt="meow"></span>'],
    ['empty', p(), '<p></p>'],
    ['with selector', p('.foo'), '<p class="foo"></p>'],
    [
      'with selector and attrs',
      p('.foo', { alt: 'meow' }),
      '<p alt="meow" class="foo"></p>',
    ],
    [
      'with selector and array kids',
      p('.foo', ['kittens']),
      '<p class="foo">kittens</p>',
    ],
    ['with selector and element kids', p('#x', p()), '<p id="x"><p></p></p>'],
    [
      'with selector, null attrs, and element kids',
      p('#x', null, p()),
      '<p id="x"><p></p></p>',
    ],
    [
      'with selector, attrs, and array kids',
      p('#x', { alt: 'meow' }, ['kittens']),
      '<p alt="meow" id="x">kittens</p>',
    ],
    ['with attrs', p({ alt: 'meow' }), '<p alt="meow"></p>'],
    ['with array kids', p(['kittens']), '<p>kittens</p>'],
    ['with element kids', p(p()), '<p><p></p></p>'],
    [
      'with attrs and array kids',
      p({ alt: 'meow' }, ['kittens']),
      '<p alt="meow">kittens</p>',
    ],
  ],
};

describe('tags helper', () => {
  Object.keys(tests).forEach(type => {
    describe(type, () => {
      tests[type].forEach(test => {
        it(test[0], () => {
          assert.equal(test[2], render(test[1]));
        });
      });
    });
  });

  describe('validation', () => {
    it("tries to make sure you aren't passing bare string kids", () => {
      const err = assert.throws(() => {
        p('kittens');
      });
      assert.include('string children', err.message);
    });
  });
});
