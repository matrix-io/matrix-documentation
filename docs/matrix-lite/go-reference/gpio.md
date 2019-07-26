<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to utilize the GPIO on your MATRIX Device.

## Import Statement
```go
import ("github.com/matrix-io/matrix-lite-go")
```

!!! tip "MATRIX Initialization"
    `.Init` will contain a `Gpio` struct to call the functions below
    ```go
    m := matrix.Init()
    ```

### .SetFunction()
Specify if a GPIO pin is being used for **DIGITAL** or **PWM**.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **function**: `"DIGITAL"` or `"PWM"`

```go
// Set pin 0 as a Digital pin
m.Gpio.SetFunction(0, "DIGITAL")

// Set pin 1 as a PWM pin
m.Gpio.SetFunction(1, "PWM");
```

### .SetMode()
Specify if a GPIO pin is being used for **input** or **output**.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **mode**: `"input"` or `"output"`

```go
// Set pin 0 to receive input
m.Gpio.SetMode(0, "input")

// Set pin 1 to output
m.Gpio.SetMode(0, "output")
```

### .GetDigital()
Retrieve the current digital signal of a GPIO pin.

**Parameters:**

- **pin**: Any number from 0 to 15.

**Return Value:**

- **value**: `0` or `1` representing ON/OFF respectively

```go
// Return the current ON/OFF state of pin 0
m.Gpio.GetDigital(0)
```

### .SetDigital()
Set the current digital signal of a GPIO pin.

**Parameters:**

- **pin**: Any number from 0 to 15.
- **value**: `"ON"` or `"OFF"`

```go
// Set pin 0 to OFF
m.Gpio.SetDigital(0, "ON")

// Set pin 1 to ON
m.Gpio.SetDigital(1, "ON")
```

### .SetPWM()
Set the current PWM signal of a GPIO pin.

**Parameters:**

* **pin**: Any number from 0 to 15.
* **percentage**: Any number from 0 to 100.
* **frequency**: Any number from 36 to **max value not tested**.

```go
// Set PWM for pin 0
m.Gpio.SetPWM(0, 25, 50);
```

### .SetServoAngle()
Use a GPIO pin to control a servo. This function requires the pin to be set to `"PWM"` mode.

**Parameters:**

* **pin**: Any number from 0 to 15.
* **angle**: Positive number of degrees.
* **min_pulse_ms**: Generally numbers between 0 and 2.
    * minimum pulse width for a PWM wave in milliseconds

```go
// Sets Servo to 90 Degrees with pin 0
m.Gpio.SetServoAngle(0, 90, 0.8)
```
