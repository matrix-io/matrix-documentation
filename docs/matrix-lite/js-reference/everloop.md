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

### led

???+ summary ".length"
    Returns the number of LEDs on a MATRIX device.
    ```js
    matrix.led.length;
    ```

???+ summary ".set()"
    Allows you to set the colors of each LED. A `string`, `object`, `array`, or an `undefined` value can be given to this function.

    ```js
    // Valid ways to set each LED
    matrix.led.set("blue"); // color name
    matrix.led.set("rgb(0,0,255)"); // RGB values
    matrix.led.set("#0000ff"); // hex values
    matrix.led.set({r:0,g:0,b:255,w:0}); // objects
    ```

    Passing in an array allows you to set each individual LED color. However, passing an array that's larger than `led.length` will result in an error.
    ```js
    matrix.led.set(['red', 'gold', 'purple', {}, , '#6F41C1', 'rgb(0,0,255)', {g:255}]);
    ```
  
???+ example "Everloop Examples"

    ```js tab="LEDs blue"
    const matrix = require("@matrix-io/matrix-lite");
    // A single string or object sets all LEDs
    // Below are different ways of expressing the color blue (number values are from 0-255)
    matrix.led.set('blue');
    matrix.led.set('rgb(0,0,255)');
    matrix.led.set('#0000ff');
    matrix.led.set({r:0, g:0, b:255, w:0}); // objects can set white
    ```

    ```js tab="LEDs off"
    const matrix = require("@matrix-io/matrix-lite");
    // Each line below is a valid way of turning the LEDs off
    matrix.led.set('black');
    matrix.led.set([]);
    matrix.led.set();
    matrix.led.set({});
    ```

    ```js tab="Moving blue LED"
    const matrix = require("@matrix-io/matrix-lite");

    let everloop = new Array(matrix.led.length).fill({});// Array of black LEDs
    everloop[0] = {b:100};

    setInterval(()=>{
      let lastColor = everloop.shift();
      everloop.push(lastColor);
      matrix.led.set(everloop);
    },50);
    ```

    ```js tab="Rainbow"
    const matrix = require("@matrix-io/matrix-lite");

    let everloop = new Array(matrix.led.length);

    let ledAdjust = 0.0;
    if (everloop.length == 35) {
        ledAdjust = 0.51; // MATRIX Creator
    } else {
        ledAdjust = 1.01; // MATRIX Voice
    }

    let frequency = 0.375;
    let counter = 0.0;
    let tick = everloop.length - 1;

    setInterval(()=>{
        // Create rainbow
        for(i = 0; i < everloop.length; i++) {
            let led = {};
            led.r = Math.round(Math.max(0, (Math.sin(frequency*counter+(Math.PI/180*240))*155+100)/10));
            led.g = Math.round(Math.max(0, (Math.sin(frequency*counter+(Math.PI/180*120))*155+100)/10));
            led.b = Math.round(Math.max(0, (Math.sin(frequency*counter)*155+100)/10));

            counter += ledAdjust;

            everloop[i] = led;
        };

        // Slowly show rainbow
        if (tick != 0) {
            for (i = tick; i > 0; i--) {
                everloop[i] = {};
            }
            tick--;
        }

        matrix.led.set(everloop);

    },35);
    ```