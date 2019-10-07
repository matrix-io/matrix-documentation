<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to utilize the GPIO on your MATRIX Device. These functions affect `pins: 0-15`.

## Import Statement
```js
const matrix = require("@matrix-io/matrix-lite");
```

### gpio

??? summary ".setFunction()"

    ```js
    // Valid ways of setting a pin as a digital pin
    matrix.gpio.setFunction(0, "DIGITAL");
    matrix.gpio.setFunction(0, 0);

    // Valid ways of setting a pin as a PWM pin
    matrix.gpio.setFunction(0, "PWM");
    matrix.gpio.setFunction(0, 1);
    ```

??? summary ".setMode()"

    ```js
    // Valid ways of setting a pin to receive input
    matrix.gpio.setMode(0, "input");
    matrix.gpio.setMode(0, 0);

    // Valid ways of setting a pin to allow output
    matrix.gpio.setMode(0, "output");
    matrix.gpio.setMode(0, 1);
    ```

??? summary ".getDigital()"

    ```js
    // Returns a 1 or 0 representing the ON/OFF state of a pin
    matrix.gpio.getDigital(0);
    ```

??? summary ".setDigital()"

    ```js
    // Controls the digital output of a pin

    // Valid ways of setting a pin to OFF
    matrix.gpio.setDigital(0,"OFF");
    matrix.gpio.setDigital(0,0);

    // Valid ways of setting a pin to ON
    matrix.gpio.setDigital(0,"ON");
    matrix.gpio.setDigital(0,1);
    ```

??? summary ".setPWM()"

    ```js
    // Controls the PWM output of a pin
    matrix.gpio.setPWM({
      pin: 0,
      percentage: 25,
      frequency: 50
    });
    ```

??? summary ".setServoAngle()"

    ```js
    // This function requires the pin to be set to "PWM" mode.
    matrix.gpio.setServoAngle({
      pin: 0,
      angle: 90,
      // minimum pulse width for a PWM wave (in milliseconds)
      min_pulse_ms: 0.8
    });
    ```

???+ example "GPIO examples"
  
    ```js tab="Read Pin"
    const matrix = require('@matrix-io/matrix-lite');

    // Configure pin 0
    matrix.gpio.setFunction(0, 'DIGITAL');
    matrix.gpio.setMode(0, 'input');

    // Read pin 0
    console.log(matrix.gpio.getDigital(0));
    ```

    ```js tab="Digital Output"
    const matrix = require('@matrix-io/matrix-lite');

    // Set pin 1 to be ON
    matrix.gpio.setFunction(1, 'DIGITAL');
    matrix.gpio.setMode(1, 'output');
    matrix.gpio.setDigital(1, 'ON')

    // Set pin 10 to be OFF
    matrix.gpio.setFunction(10, 'DIGITAL');
    matrix.gpio.setMode(10, 'output');
    matrix.gpio.setDigital(10, 'OFF')
    ```

    ```js tab="PWM Output"
    const matrix = require('@matrix-io/matrix-lite');

    // Set pin 2 to be output a PWM signal
    matrix.gpio.setFunction(2, 'PWM');
    matrix.gpio.setMode(2, 'output');
    matrix.gpio.setPWM({
      pin: 2,
      percentage: 25,
      frequency: 50 // min 36
    });
    ```

    ```js tab="Set Servo"
    const matrix = require('@matrix-io/matrix-lite');

    // Tell pin 3 to set servo to 90 degrees
    matrix.gpio.setFunction(3, 'PWM');
    matrix.gpio.setMode(3, 'output');
    matrix.gpio.setServoAngle({
      pin: 3,
      angle: 90,
      // minimum pulse width for a PWM wave (in milliseconds)
      min_pulse_ms: 0.8
    });
    ```