<h2 style="padding-top:0">ALSA</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
> Requires you to have the <a href="https://github.com/matrix-io/matrixio-kernel-modules#option-1-package-installation" target="_blank">MATRIX Kernel Modules</a> installed.

The following sections below will go over how to retrieve microphone input through ALSA.

## Import Statement
```js
const matrix = require("@matrix-io/matrix-lite");
```
<br/>

### .mic
This function will allow you to configure your MATRIX microphone settings. Default values will be used if no configuration was given. 

* **config: `object`**
    * **rate**: Any number from 0 to 15.
    * **debug**: true or false.
    * **exitOnSilence**: number of seconds.
    * **channels**: Any number from 1 to 8.

```js
var mic = matrix.alsa.mic();
// or
var mic = matrix.alsa.mic({
  rate: '16000',
  debug: true,
  exitOnSilence: 6,
  channels: '1'
});
```

Once the microphone is setup, visit [npm mic page](https://www.npmjs.com/package/mic) to see what functions & event listeners are available. This package is included in MATRIX Lite.