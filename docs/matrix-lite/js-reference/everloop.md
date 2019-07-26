<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to control the LED array on your MATRIX Device.

## Import Statement
```js
const matrix = require("@matrix-io/matrix-lite");
```

### .length
Returns the size of the LED array on your MATRIX device.
```
matrix.led.length;
```

### .set()
Allows you to set the colors of each LED. A `string`, `object`, `array`, or an `undefined` value can be given to this function.

**String input**
```js
// Valid ways to turn LEDs blue
matrix.led.set("blue"); // color name
matrix.led.set("rgb(0,0,255)"); // RGB values
matrix.led.set("#0000ff"); // Hex values

// Valid ways to turn off LEDs
matrix.led.set("black"); // color name
matrix.led.set("rgb(0,0,0)"); // RGB values
matrix.led.set("#000000"); // Hex values
```

**Object input**
```js
// Turn LEDs blue
matrix.led.set({
  r:0,
  g:0,
  b:255,
  w:0
});

// Turn off LEDs 
matrix.led.set({}) // unspecified values are set to 0
```

**Array Input**

Passing in an array allows you to set each individual LED color. However, passing an array that's larger than `led.length` will result in an error.
```js
// Basic array example
matrix.led.set(['red', 'gold', 'purple', {}, , '#6F41C1', 'rgb(0,0,255)', {g:255}]);
```