import Ember from 'ember';
import { module, test } from 'qunit';
import computed from 'ember-new-computed';

const { get, set } = Ember;

module('new-computed-syntax');

test('allows usage of function for simple getter semantics', function(assert) {
  var object = Ember.Object.extend({
    first: 'max',
    last: 'jackson',
    name: computed(function() {
      return get(this, 'first') + ' ' + get(this, 'last');
    })
  }).create();

  assert.equal(get(object, 'name'), 'max jackson');
});

test('can specify a getter', function(assert) {
  var object = Ember.Object.extend({
    first: 'james',
    last: 'jackson',
    name: computed({
      get: function() {
        return get(this, 'first') + ' ' + get(this, 'last');
      }
    })
  }).create();

  assert.equal(get(object, 'name'), 'james jackson');
});

test('can specify dependent keys', function(assert) {
  var object = Ember.Object.extend({
    first: 'james',
    last: 'jackson',
    name: computed('first', 'last', {
      get: function() {
        return get(this, 'first') + ' ' + get(this, 'last');
      }
    })
  }).create();

  assert.equal(get(object, 'name'), 'james jackson');

  set(object, 'first', 'robert');

  assert.equal(get(object, 'name'), 'robert jackson');
});

test('can specify a setter', function(assert) {
  var object = Ember.Object.extend({
    first: null,
    last: null,
    name: computed({
      set: function(key, value) {
        var [ first, last ] = value.split(' ');

        set(this, 'first', first);
        set(this, 'last', last);
      }
    })
  }).create();

  set(object, 'name', 'jacquie jackson');

  assert.equal(get(object, 'first'), 'jacquie');
  assert.equal(get(object, 'last'), 'jackson');
});

test('receives the old value', function(assert) {
  var object = Ember.Object.extend({
    first: null,
    last: null,
    old: null,
    name: computed({
      set: function(key, value, oldValue) {
        set(this, 'old', oldValue);
        return value;
      }
    })
  }).create();

  set(object, 'name', 'elaine jackson');
  assert.equal(get(object, 'old'), null);

  set(object, 'name', 'jacquie jackson');
  assert.equal(get(object, 'old'), 'elaine jackson');

});

test('has a copy of all the cp helpers on the Ember.computed namespace', function(assert) {
  for (let key in Ember.computed) {
    assert.equal(computed[key], Ember.computed[key], `${key} exists on both`);
  }
});
