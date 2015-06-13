Amplitude SDK with Fluxible
==========================

Plug & play amplitude SDK for your fluxible application!

Shamelessly adapted from [fluxible-facebook-plugin](https://github.com/Hairfie/fluxible-plugin-facebook), thanks for the template [Hairfie](https://github.com/Hairfie)!

Features
--------

 * Works with webpack / browserify
 * Loads amplitude SDK asynchronously (thanks to es6 Promises)
 * Shares configuration between server / client (means you can use environment variables)
 * Comes with a "do whatever you want" (MIT) license
 * Doesn't load SDK on server side

Install
-------

Add the module to your fluxible project :

    npm install --save fluxible-plugin-amplitude

Add it to your fluxible context :

```javascript

import amplitudePlugin from 'fluxible-plugin-amplitude';

app.plug(amplitudeplugin({
    apiKey: 'xxx',
    version: '2.2.0' // this is default
}));

```

Usage
-----

Add `getAmplitudeSdk` to the react's context :

```

Application = provideContext(Application, {

    // ...
    
    getAmplitudeSdk: React.PropTypes.func
    
});

```

From a component :

```javascript

class FooComponent {

    static contextTypes = {
        getAmplitudeSdk: React.PropTypes.func
    };

    // ...

    plop() {
        this.context.getAmplitudeSdk().then(sdk => /* do whatever */);
    }

}

```
