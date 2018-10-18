import { computed } from '@ember/object';
import { keys } from '@ember/polyfills';
import canUseNewSyntax from './utils/can-use-new-syntax';

export default function newComputed() {
  var polyfillArguments = [];
  var config = arguments[arguments.length - 1];

  if (typeof config === 'function' || canUseNewSyntax) {
    return computed(...arguments);
  }

  for (var i = 0, l = arguments.length - 1; i < l; i++) {
    polyfillArguments.push(arguments[i]);
  }

  var func;
  if (config.set) {
    func = function(key, value) {
      if (arguments.length > 1) {
        return config.set.call(this, key, value);
      } else {
        return config.get.call(this, key);
      }
    };
  } else {
    func = function(key) {
      return config.get.call(this, key);
    };
  }

  polyfillArguments.push(func);

  return computed(...polyfillArguments);
}

const getKeys = Object.keys || keys;
const computedKeys = getKeys(computed);

for (let i = 0, l = computedKeys.length; i < l; i++) {
  newComputed[computedKeys[i]] = computed[computedKeys[i]];
}
