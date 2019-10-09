<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to utilize the GPIO on your MATRIX Device. These functions affect `pins: 0-15`.

## Import Statement
```go
import ("github.com/matrix-io/matrix-lite-go")
```

!!! tip "MATRIX Initialization"
    `.Init` will contain a `Gpio` struct to call the functions below
    ```go
    m := matrix.Init()
    ```
### gpio

??? summary ".SetFunction()"

    ```go
    // Set a pin as use a digital signal
    m.Gpio.SetFunction(0, "DIGITAL")

    // Set a pin as use a PWM signal
    m.Gpio.SetFunction(0, "PWM")
    ```

??? summary ".SetMode()"

    ```go
    // Valid ways of setting a pin to receive input
    m.Gpio.SetMode(0, "input")

    // Valid ways of setting a pin to allow output
    m.Gpio.SetMode(0, "output")
    ```

??? summary ".GetDigital()"

    ```go
    // Returns a 1 or 0 representing the ON/OFF state of a pin
    m.Gpio.GetDigital(0)
    ```

??? summary ".SetDigital()"

    ```go
    // Controls the digital output of a pin

    // Set a pin to OFF
    m.Gpio.SetDigital(0, "OFF")

    // Set a pin to ON
    m.Gpio.SetDigital(1, "ON")
    ```

??? summary ".SetPWM()"

    ```go
    // Controls the PWM output of a pin
    m.Gpio.SetPWM(0, 25, 50);// pin, percentage, frequency
    ```

??? summary ".SetServoAngle()"

    ```go
    // This function requires the pin to be set to "PWM" mode.
    m.Gpio.SetServoAngle(0, 90, 0.8)// pin, angle, minimum pulse width for a PWM wave (in milliseconds)
    ```

???+ example "GPIO examples"
  
    ```go tab="Read Pin"
    package main

    import (
        "fmt"
    
        "github.com/matrix-io/matrix-lite-go"
    )

    func main() {
        m := matrix.Init()
        
        // Configure pin 0
        m.Gpio.SetFunction(0, "DIGITAL")
	    m.Gpio.SetMode(0, "input")
        
        // Read pin 0
        fmt.Println(m.Gpio.GetDigital(0))
    }
    ```

    ```go tab="Digital Output"
    package main

    import "github.com/matrix-io/matrix-lite-go"

    func main() {
        m := matrix.Init()

        // Set pin 1 to be ON
        m.Gpio.SetFunction(1, "DIGITAL")
        m.Gpio.SetMode(1, "output")
        m.Gpio.SetDigital(1, "ON")

        // Set pin 10 to be OFF
        m.Gpio.SetFunction(10, "DIGITAL")
        m.Gpio.SetMode(10, "output")
        m.Gpio.SetDigital(10, "OFF")
    }
    ```

    ```go tab="PWM Output"
    package main

    import "github.com/matrix-io/matrix-lite-go"

    func main() {
        m := matrix.Init()

        // Set pin 2 to be output a PWM signal
        m.Gpio.SetFunction(2, "PWM");
        m.Gpio.SetMode(2, "output");
        m.Gpio.SetPWM(2, 25, 50);
    }
    ```

    ```go tab="Set Servo"
    package main

    import "github.com/matrix-io/matrix-lite-go"

    func main() {
        m := matrix.Init()

        // Tell pin 3 to set servo to 90 degrees
        m.Gpio.SetFunction(3, "PWM");
        m.Gpio.SetMode(3, "output");
        m.Gpio.SetServoAngle(3, 90, 0.8);// pin, angle, min_pulse_ms
    }
    ```