'use strict';

var getSdk = require('./getSdk');

function amplitudePlugin(options) {
  var options = options;

  return {
    name: 'Amplitude',
    plugContext: function() {
      return {
        plugComponentContext: function(componentContext) {
          componentContext.getAmplitudeSdk = getSdk.bind(null, options);
        },
        plugActionContext: function(componentContext) {
          componentContext.getAmplitudeSdk = getSdk.bind(null, options);
        }
      };
    },
    dehydrate: function() {
      return {
        options: options
      };
    },
    rehydrate: function(state) {
      options = state.options;
    }
  };
}

module.exports = amplitudePlugin;