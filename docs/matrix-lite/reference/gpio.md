<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to utilize the GPIO on your MATRIX Device.

## Import Statement
```language-js
const matrix = require("@matrix-io/matrix-lite");
```
<br/>

### .setFunction()
Specify if a GPIO pin is being used for **DIGITAL** or **PWM**.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **mode**: Can be `0`,`1` or `"DIGITAL"`, `"PWM"` respectively.

```language-js
// Valid ways of setting pin 0 as a digital pin
matrix.gpio.setFunction(0, "DIGITAL");
matrix.gpio.setFunction(0, 0);

// Valid ways of setting pin 1 as a PWM pin
matrix.gpio.setMode(1, "PWM");
matrix.gpio.setMode(1, 1);
```

### .setMode()
Specify if a GPIO pin is being used for **input** or **output**.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **mode**: Can be `0`,`1` or `"output"`, `"input"` respectively.
- **value**: Can `0`,`1` or `"ON"`, `"OFF"` respectively
```language-js
// Valid ways of setting pin 0 to receive input
matrix.gpio.setMode(0, "input");
matrix.gpio.setMode(0, 0);

// Valid ways of setting pin 1 to allow output
matrix.gpio.setMode(1, "output");
matrix.gpio.setMode(1, 1);
```

### .getDigital()
Retrieve the current digital signal of a GPIO pin.

**Parameters:**

- **pin**: Any number from 0 to 15.

**Return Value:**

- **value**: `0` or `1` representing ON/OFF respectively

```language-js
// Return the current ON/OFF state of pin 0
matrix.gpio.getDigital(0);
```

### .setDigital()
Set the current digital signal of a GPIO pin.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **value**: Can be `0`,`1` or `"ON"`, `"OFF"` respectively

```language-js
// Valid ways of setting pin 0 to OFF
matrix.gpio.setDigital(0,"OFF");
matrix.gpio.setDigital(0,0);

// Valid ways of setting pin 1 to ON
matrix.gpio.setDigital(1,"ON");
matrix.gpio.setDigital(1,1);
```

### .setPWM()
Set the current PWM signal of a GPIO pin.

**Parameters:**

* **config: `object`**
    * **pin**: Any number from 0 to 15.
    * **percentage**: Any number from 0 to 100.
    * **frequency**: Any number from 36 to **max value not tested**.
```language-js
// Set PWM for pin 0
matrix.gpio.setPWM({
  pin: 0,
  percentage: 25,
  frequency: 50
});
```

### .setServoAngle()
Use a GPIO pin to control a servo. This function requires the pin to be set to `"PWM"` mode.

**Parameters:**

* **config: `object`**
    * **pin**: Any number from 0 to 15.
    * **angle**: Positive number of degrees.
    * **min_pulse_ms**: Generally numbers between 0 and 2.
```language-js
// Sets Servo to 90 Degrees with pin 0
matrix.gpio.setServoAngle({
  pin: 0,
  angle: 90,
  min_pulse_ms: 0.8
});
```