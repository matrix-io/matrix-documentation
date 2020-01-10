<h2 style="padding-top:0">Info</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to obtain information on your MATRIX device.

## Import Statement
```js
const matrix = require("@matrix-io/matrix-lite");
```

### Info

???+ summary ".deviceType"
    A `string` of the MATRIX device currently attached.
    ```js
    console.log("The " + matrix.info.deviceType + " is attached to the pi");
    ```

???+ summary ".isDirectBus"
    A `boolean` that's true, if the kernel modules are not installed.
    ```js
    console.log("Are the Kernel Modules installed? " + matrix.info.isDirectBus);
    ```