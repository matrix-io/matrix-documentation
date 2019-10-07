<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to utilize the GPIO on your MATRIX Device. These functions affect `pins: 0-15`.

## Import Statement
```py
from matrix_lite import gpio
```

### gpio

??? summary ".setFunction()"

    ```py
    # Valid ways of setting a pin as a digital pin
    gpio.setFunction(0, 'DIGITAL')
    gpio.setFunction(0, 0)

    # Valid ways of setting a pin as a PWM pin
    gpio.setFunction(0, 'PWM')
    gpio.setFunction(0, 1)
    ```

??? summary ".setMode()"

    ```py
    # Valid ways of setting a pin to receive input
    gpio.setMode(0, "input")
    gpio.setMode(0, 0)

    # Valid ways of setting a pin to allow output
    gpio.setMode(0, "output")
    gpio.setMode(0, 1)
    ```

??? summary ".getDigital()"

    ```py
    # Returns a 1 or 0 representing the ON/OFF state of a pin
    gpio.getDigital(0)
    ```

??? summary ".setDigital()"

    ```py
    # Controls the digital output of a pin

    # Valid ways of setting a pin to OFF
    gpio.setDigital(0,"OFF")
    gpio.setDigital(0,0)

    # Valid ways of setting a pin to ON
    gpio.setDigital(0,"ON")
    gpio.setDigital(0,1)
    ```

??? summary ".setPWM()"

    ```py
    # Controls the PWM output of a pin
    gpio.setPWM({
        "pin": 0,
        "percentage": 25,
        "frequency": 50,
    })
    ```

??? summary ".setServoAngle()"

    ```py
    # This function requires the pin to be set to "PWM" mode.
    gpio.setServoAngle({
        "pin": 0,
        "angle": 90,
        # min_pulse_ms (minimum pulse width for a PWM wave in milliseconds)
        "min_pulse_ms": 0.8,
    })
    ```

???+ example "GPIO examples"
  
    ```py tab="Read Pin"
    from matrix_lite import gpio

    # Configure pin 0
    gpio.setFunction(0, 'DIGITAL')
    gpio.setMode(0, 'input')

    # Read pin 0
    print(gpio.getDigital(0))
    ```

    ```py tab="Digital Output"
    from matrix_lite import gpio

    # Set pin 1 to be ON
    gpio.setFunction(1, 'DIGITAL')
    gpio.setMode(1, 'output')
    gpio.setDigital(1, 'ON')

    # Set pin 10 to be OFF
    gpio.setFunction(10, 'DIGITAL')
    gpio.setMode(10, 'output')
    gpio.setDigital(10, 'OFF')
    ```

    ```py tab="PWM Output"
    from matrix_lite import gpio

    # Set pin 2 to be output a PWM signal
    gpio.setFunction(2, 'PWM')
    gpio.setMode(2, 'output')
    gpio.setPWM({
        "pin": 2,
        "percentage": 25,
        "frequency": 50, # min 36
    })
    ```

    ```py tab="Set Servo"
    from matrix_lite import gpio

    # Tell pin 3 to set servo to 90 degrees
    gpio.setFunction(3, 'PWM')
    gpio.setMode(3, 'output')
    gpio.setServoAngle({
        "pin": 3,
        "angle": 90,
        # min_pulse_ms (minimum pulse width for a PWM wave in milliseconds)
        "min_pulse_ms": 0.8,
    })
    ```