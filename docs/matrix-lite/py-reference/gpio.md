<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to utilize the GPIO on your MATRIX Device.

## Import Statement
```language-js
from matrix_lite import gpio
```

### .setFunction()
Specify if a GPIO pin is being used for **DIGITAL** or **PWM**.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **function**: Can be `0`,`1` or `"DIGITAL"`, `"PWM"` respectively.

```language-python
# Valid ways of setting pin 0 as a digital pin
gpio.setFunction(0, 'DIGITAL')
gpio.setFunction(0, 0)

# Valid ways of setting pin 1 as a PWM pin
gpio.setFunction(1, 'PWM')
gpio.setFunction(1, 1)
```

### .setMode()
Specify if a GPIO pin is being used for **input** or **output**.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **mode**: Can be `0`,`1` or `"output"`, `"input"` respectively.
```language-python
# Valid ways of setting pin 0 to receive input
gpio.setMode(0, "input")
gpio.setMode(0, 0)

# Valid ways of setting pin 1 to allow output
gpio.setMode(1, "output")
gpio.setMode(1, 1)
```

### .getDigital()
Retrieve the current digital signal of a GPIO pin.

**Parameters:**

- **pin**: Any number from 0 to 15.

**Return Value:**

- **value**: `0` or `1` representing ON/OFF respectively

```language-python
# Return the current ON/OFF state of pin 0
gpio.getDigital(0)
```

### .setDigital()
Set the current digital signal of a GPIO pin.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **value**: Can be `0`,`1` or `"ON"`, `"OFF"` respectively

```language-python
# Valid ways of setting pin 0 to OFF
gpio.setDigital(0,"OFF")
gpio.setDigital(0,0)

# Valid ways of setting pin 1 to ON
gpio.setDigital(1,"ON")
gpio.setDigital(1,1)
```

### .setPWM()
Set the current PWM signal of a GPIO pin.

**Parameters:**

* **config: `object`**
    * **pin**: Any number from 0 to 15.
    * **percentage**: Any number from 0 to 100.
    * **frequency**: Any number from 36 to **max value not tested**.
```language-python
# Set PWM for pin 0
gpio.setPWM({
  "pin": 2,
  "percentage": 25,
  "frequency": 50, # min 36
})
```

### .setServoAngle()
Use a GPIO pin to control a servo. This function requires the pin to be set to `"PWM"` mode.

**Parameters:**

* **config: `object`**
    * **pin**: Any number from 0 to 15.
    * **angle**: Positive number of degrees.
    * **min_pulse_ms**: Generally numbers between 0 and 2.
        * minimum pulse width for a PWM wave in milliseconds
```language-python
# Sets Servo to 90 Degrees with pin 0
gpio.setServoAngle({
    "pin": 3,
    "angle": 90,
    "min_pulse_ms": 0.8,
})
```
