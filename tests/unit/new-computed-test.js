import Ember from 'ember';
import { module, test } from 'qunit';
import computed from 'ember-new-computed';

const { get, set } = Ember;

module('new-computed-syntax');

test('allows usage of function for simple getter semantics', function(assert) {
  var object = {
    first: 'max',
    last: 'jackson',
    name: computed(function() {
      return get(this, 'first') + ' ' + get(this, 'last');
    })
  };

  assert.equal(get(object, 'name'), 'max jackson');
});

test('can specify a getter', function(assert) {
  var object = {
    first: 'james',
    last: 'jackson',
    name: computed({
      get: function() {
        return get(this, 'first') + ' ' + get(this, 'last');
      }
    })
  };

  assert.equal(get(object, 'name'), 'james jackson');
});

test('can specify a setter', function(assert) {
  var object = {
    first: null,
    last: null,
    name: computed({
      set: function(key, value) {
        var [ first, last ] = value.split(' ');

        set(this, 'first', first);
        set(this, 'last', last);
      }
    })
  };

  set(object, 'name', 'jacquie jackson');

  assert.equal(get(object, 'first'), 'jacquie');
  assert.equal(get(object, 'last'), 'jackson');
});
