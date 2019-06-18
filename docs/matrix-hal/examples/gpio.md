<h2 style="padding-top:0">General Purpose Input Output (GPIO)</h2>
<h4 style="padding-top:0">HAL Example</h4>

### Device Compatibility

<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The GPIO interface supports:

- Pin I/O input
- Pin I/O output
- Pin PWM output

**Device Pinouts**:

- [MATRIX Creator](/matrix-creator/resources/pinout.md)
- [MATRIX Voice](/matrix-voice/resources/pinout.md)

## Code Examples

Below are examples of how to interface with the GPIO in MATRIX HAL.

GPIO function references can be found [here](/matrix-hal/reference/gpio).

The command below will compile each example. Be sure to pass in your C++ file and desired output file.

```c++
g++ -o YOUR_OUTPUT_FILE YOUR_CPP_FILE -std=c++11 -lmatrix_creator_hal
```

??? example "GPIO I/O"
    The following section shows how to use GPIO in digital I/O mode for output and input. You can download this example <a href="https://github.com/matrix-io/matrix-hal-examples/blob/master/gpio/gpio_io.cpp" target="_blank">here</a>.

    ???+ summary "Include Statements"
        To begin working with the GPIO you need to include these header files.

        ```c++
        // System calls
        #include <unistd.h>
        // Input/output streams and functions
        #include <iostream>

        // Interfaces with GPIO
        #include "matrix_hal/gpio_control.h"
        // Communicates with MATRIX device
        #include "matrix_hal/matrixio_bus.h"
        ```

    ???+ summary "Initial Variables"
        These initial variables are used in the example.

        ```c++
        // GPIOOutputMode is 1
        const uint16_t GPIOOutputMode = 1;
        // GPIOInputMode is 0
        const uint16_t GPIOInputMode = 0;

        // Holds desired GPIO pin for output [0-15]
        uint16_t pin_out;
        // Holds desired output state
        uint16_t pin_out_state;
        // Holds desired GPIO pin for input [0-15]
        uint16_t pin_in;
        ```

    ???+ summary "Initial Setup"
        You'll then need to setup `MatrixIOBus` in order to communicate with the hardware on your MATRIX device.

        ```c++
        int main() {
        // Create MatrixIOBus object for hardware communication
        matrix_hal::MatrixIOBus bus;
        // Initialize bus and exit program if error occurs
        if (!bus.Init()) return false;
        ```

    ???+ summary "Main Setup"
        Now we will create our `GPIOControl` object and use it to output and input a digital GPIO signal.

        ```c++
        // The following code is part of main()

        // Create GPIOControl object
        matrix_hal::GPIOControl gpio;
        // Set gpio to use MatrixIOBus bus
        gpio.Setup(&bus);

        // Prompt user for GPIO pin
        std::cout << "Select Pin [0-15] For Output: ";
        // Log user input
        std::cin >> pin_out;
        // Prompt user for GPIO state
        std::cout << "Pin Output State [0-1] : ";
        // Log user input
        std::cin >> pin_out_state;
        // Prompt user for GPIO pin
        std::cout << "Select Pin [0-15] For Input: ";
        // Log user input
        std::cin >> pin_in;

        // Set pin_out mode to output
        gpio.SetMode(pin_out, GPIOOutputMode);

        // Set pin_in mode to input
        gpio.SetMode(pin_in, GPIOInputMode);

        // Set pin_out to output pin_out_state
        gpio.SetGPIOValue(pin_out, pin_out_state);

        // Endless loop
        while (true) {
            // Get state of pin_in
            uint16_t pin_in_state = gpio.GetGPIOValue(pin_in);
            // Clear console
            std::system("clear");
            // Output pin_out info to console
            std::cout << "[ Output Pin : " << pin_out << " ]"
                    << " [ Output State : " << pin_out_state << " ]" << std::endl;
            // Output pin_in info to console
            std::cout << "[ Input Pin : " << pin_in << " ]"
                    << " [ Input State : " << pin_in_state << " ]" << std::endl;
            // Sleep for 10000 microseconds
            usleep(10000);
        }

        return 0;
        }
        ```

??? example "GPIO PWM"
    The following section shows how to use GPIO in PWM mode for PWM output. You can download this example <a href="https://github.com/matrix-io/matrix-hal-examples/blob/master/gpio/gpio_pwm.cpp" target="_blank">here</a>.

    ???+ summary "Include Statements"
        To begin working with the GPIO you need to include these header files.

        ```c++
        // Input/output streams and functions
        #include <iostream>

        // Interfaces with GPIO
        #include "matrix_hal/gpio_control.h"
        // Communicates with MATRIX device
        #include "matrix_hal/matrixio_bus.h"
        ```

    ???+ summary "Initial Variables"
        These initial variables are used in the example.

        ```c++
        // GPIOOutputMode is 1
        const uint16_t GPIOOutputMode = 1;
        // GPIOInputMode is 0
        const uint16_t GPIOInputMode = 0;
        // PWMFunction is 1
        const uint16_t PWMFunction = 1;

        // Holds desired PWM frequency
        float frequency;
        // Holds desired PWM duty percentage
        float percentage;
        // Holds desired GPIO pin [0-15]
        uint16_t pin;
        ```

    ???+ summary "Initial Setup"
        You'll then need to setup `MatrixIOBus` in order to communicate with the hardware on your MATRIX device.

        ```c++
        int main() {
        // Create MatrixIOBus object for hardware communication
        matrix_hal::MatrixIOBus bus;
        // Initialize bus and exit program if error occurs
        if (!bus.Init()) return false;
        ```

    ???+ summary "Main Setup"
        Now we will create our `GPIOControl` object and use it to output and input a digital GPIO signal.

        ```c++
        // The following code is part of main()

        // Create GPIOControl object
        matrix_hal::GPIOControl gpio;
        // Set gpio to use MatrixIOBus bus
        gpio.Setup(&bus);

        // Prompt user for GPIO pin
        std::cout << "Select Pin [0-15] : ";
        // Log user input
        std::cin >> pin;
        // Prompt user for PWM frequency
        std::cout << "Select Frequency (in Hz) : ";
        // Log user input
        std::cin >> frequency;
        // Prompt user for PWM duty percentage
        std::cout << "Select Duty Percentage : ";
        // Log user input
        std::cin >> percentage;

        // Set pin mode to output
        gpio.SetMode(pin, GPIOOutputMode);
        // Set pin function to PWM
        gpio.SetFunction(pin, PWMFunction);

        // If setting PWM returns an error, log it
        // SetPWM function carries out PWM logic and outputs PWM signal
        if (!gpio.SetPWM(frequency, percentage, pin))
            // Output error to console
            std::cerr << "ERROR: invalid input" << std::endl;
        else
            // Else output GPIO PWM info to console
            std::cout << "[ Pin : " << pin << " ] [ Frequency : " << frequency
                    << " ] [ Duty Percentage : " << percentage << " ]" << std::endl;

        return 0;
        }
        ```

??? example "GPIO Servo"
    The following section shows how to use GPIO in PWM mode for controlling a servo. You can download this example <a href="https://github.com/matrix-io/matrix-hal-examples/blob/master/gpio/gpio_servo.cpp" target="_blank">here</a>.

    ???+ summary "Include Statements"
        To begin working with the GPIO you need to include these header files.

        ```c++
        // Input/output streams and functions
        #include <iostream>

        // Interfaces with GPIO
        #include "matrix_hal/gpio_control.h"
        // Communicates with MATRIX device
        #include "matrix_hal/matrixio_bus.h"
        ```

    ???+ summary "Initial Variables"
        These initial variables are used in the example.

        ```c++
        // GPIOOutputMode is 1
        const uint16_t GPIOOutputMode = 1;
        // GPIOInputMode is 0
        const uint16_t GPIOInputMode = 0;

        // PWMFunction is 1
        const uint16_t PWMFunction = 1;

        // Holds desired PWM frequency
        float frequency;
        // Holds desired PWM duty percentage
        float percentage;
        // Holds desired GPIO pin [0-15]
        uint16_t pin;
        // Holds desired servo angle
        float angle;
        // Holds servo minimum pulse length (for calibration)
        float min_pulse_ms;
        ```

    ???+ summary "Initial Setup"
        You'll then need to setup `MatrixIOBus` in order to communicate with the hardware on your MATRIX device.

        ```c++
        int main() {
        // Create MatrixIOBus object for hardware communication
        matrix_hal::MatrixIOBus bus;
        // Initialize bus and exit program if error occurs
        if (!bus.Init()) return false;
        ```

    ???+ summary "Main Setup"
        Now we will create our `GPIOControl` object and use it to output and input a digital GPIO signal.

        Servo neutral position is achieved with a 1.5 milliseconds pulse, so by taking the minimum servo pulse (in milliseconds) the SetServoAngle function calibrates servo angle.
        If unsure of min_pulse_ms enter `0.8`.

        ```c++
        // The following code is part of main()

        // Create GPIOControl object
        matrix_hal::GPIOControl gpio;
        // Set gpio to use MatrixIOBus bus
        gpio.Setup(&bus);

        // Prompt user for GPIO pin
        std::cout << "Select Pin [0-15] : ";
        // Log user input
        std::cin >> pin;
        // Prompt user for servo angle
        std::cout << "Servo Angle : ";
        // Log user input
        std::cin >> angle;
        // Prompt user for servo minimum pulse length in ms (for calibration)
        std::cout << "Servo Min Pulse (ms) : ";
        // Log user input
        std::cin >> min_pulse_ms;

        // Set pin mode to output
        gpio.SetMode(pin, GPIOOutputMode);
        // Set pin function to PWM
        gpio.SetFunction(pin, PWMFunction);

        // If setting servo angle returns an error, log it
        // SetServoAngle function sets a servo angle based on the min_pulse_ms
        if (!gpio.SetServoAngle(angle, min_pulse_ms, pin))
            // Output error to console
            std::cerr << "ERROR: invalid input" << std::endl;
        else
            // Else output servo control info to console
            std::cout << "[ Pin : " << pin << " ]"
                    << " [ Servo Angle : " << angle
                    << " ] [ Servo Min Pulse (ms) : " << min_pulse_ms << " ] "
                    << std::endl;

        return 0;
        }
        ```