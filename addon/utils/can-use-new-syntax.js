import { computed } from '@ember/object';

var supportsSetterGetter;

try {
  computed({
    set: function() { },
    get: function() { }
  });
  supportsSetterGetter = true;
} catch(e) {
  supportsSetterGetter = false;
}

export default supportsSetterGetter;
