'use strict';

var Promise = require('es6-promise').Promise;
var loading = false;
var resolvers = [];

var debug = require('debug')('Amplitude:AmplitudePlugin');

var DEFAULT_VERSION = '2.2.0';

function getSdk(options) {
  var options = {
    apiKey: options.appKey,
    version: options.version || DEFAULT_VERSION
  };

  debug('Amplitude SDK asked');

  if (typeof window === 'undefined') {
    debug('server side, aborting');
    return Promise.reject(new Error('Amplitude: cannot get SDK in server side'));
  }

  if (window.amplitude) {
    return Promise.resolve(window.amplitude);
  }

  return new Promise(function(resolve, reject) {
    debug('appending resolver');
    resolvers.push(resolve);
    loadIfNecessary(options);
  });
}

module.exports = getSdk;

function loadIfNecessary(options) {
  if (!loading) {
    loading = true;
    load(options);
  }
}

function load(options) {
  debug('loading Amplitude SDK');

  (function(e, t, options) {
    var r = e.amplitude || {};
    var n = t.createElement("script");
    n.type = "text/javascript";
    n.async = true;
    n.src = "https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-" + options.version + "-min.gz.js";
    var s = t.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(n, s);
    r._q = [];

    function a(e) {
      r[e] = function() {
        r._q.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      }
    }
    var i = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "setGlobalUserProperties"];
    for (var o = 0; o < i.length; o++) {
      a(i[o])
    }
    e.amplitude = r
  })(window, document, options);

  amplitude.init(options.apiKey);

  debug('finished loading Amplitude SDK, resolving all promises');
  resolvers.map(function(resolve) {
    resolve(window.amplitude)
  });
  resolvers = [];
}
