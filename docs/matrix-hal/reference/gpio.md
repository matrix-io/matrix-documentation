<h2 style="padding-top:0">General Purpose Input Output (GPIO)</h2>

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

## References

Below is the overview of the GPIO implementation. Code examples can be found [here](/matrix-hal/examples/gpio).

These header files are required to use GPIO.

```c++
// Interfaces with GPIO
#include "matrix_hal/gpio_control.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

<details markdown="1" open>
<summary style="font-size: 1.75rem; font-weight: 300;">GPIOControl</summary>
`GPIOControl` is a required **object** that contains functions to interface with GPIO.

```c++
// Create GPIOControl object
matrix_hal::GPIOControl gpio;
```

The functions below are part of `GPIOControl`.

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.Setup</summary>
`Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device.

```c++
// Function declaration in header file
void Setup(MatrixIOBus *bus);
```
<!--  -->
```c++
// Set gpio to use MatrixIOBus bus
gpio.Setup(&bus);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.Banks</summary>
`Banks` is a **function** that returns a `banks_` array of `GPIOBank` objects.

```c++
// Function declaration in header file
GPIOBank &Bank(uint16_t bank) { return banks_[bank]; }
```
<!--  -->
```c++
// Returns banks_[index]
gpio.Banks(index);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetMode</summary>
`SetMode` is a **function** that sets GPIO pin(s) to output or input.
`SetMode` is overloaded, and there are two definitions for the function.

For setting single GPIO pin.

```c++
// Function declaration in header file
// For setting single GPIO pin
bool SetMode(uint16_t pin, uint16_t mode);
```
<!--  -->
```c++
// Sets pin 0 to output
gpio.SetMode(0, 1);
// Sets pin 0 to input
gpio.SetMode(0, 0);
```

For setting multiple GPIO pins.

```c++
// Function declaration in header file
// For setting multiple pins
bool SetMode(unsigned char *pinList, int length, uint16_t mode);
```
<!--  -->
```c++
unsigned char inputPinList[8] = {0, 2, 4, 6, 8, 10, 12, 14};
unsigned char outputPinList[8] = {1, 3, 5, 7, 9, 11, 13, 15};

// Sets pins in inputPinList to input
gpio.SetMode(inputPinList, sizeof(inputPinList), 0);
// Sets pins in outputPinList to output
gpio.SetMode(outputPinList, sizeof(outputPinList), 1);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetFunction</summary>
`SetFunction` is a **function** that sets a single GPIO pin to I/O or PWM mode.

```c++
// Function declaration in header file
bool SetFunction(uint16_t pin, uint16_t function);
```
<!--  -->
```c++
// Sets pin 0 to I/O mode
gpio.SetFunction(0, 0);
// Sets pin 0 to PWM mode
gpio.SetFunction(0, 1);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.GetGPIOValue</summary>
`GetGPIOValue` is a **function** that returns a GPIO value.

```c++
// Function declaration in header file
uint16_t GetGPIOValue(uint16_t pin);
```
<!--  -->
```c++
// Gets value of pin 0
bool value = gpio.GetGPIOValue(0);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.GetGPIOValues</summary>
`GetGPIOValues` is a **function** that returns all GPIO values, each bit of the returned 16bit integer represents a pin.

```c++
// Function declaration in header file
uint16_t GetGPIOValues();
```
<!--  -->
```c++
// Gets all pin values
uint16_t values = gpio.GetGPIOValues();
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetGPIOValue</summary>
`SetGPIOValue` is a **function** that sets a GPIO value.

```c++
// Function declaration in header file
bool SetGPIOValue(uint16_t pin, uint16_t value);
```
<!--  -->
```c++
// Sets pin 0 to on
gpio.SetGPIOValue(0, 1);
// Sets pin 0 to off
gpio.SetGPIOValue(0, 0);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetGPIOValues</summary>
`SetGPIOValues` is a **function** that sets multiple GPIO values.

```c++
// Function declaration in header file
bool SetGPIOValues(unsigned char *pinList, int length, uint16_t value);
```
<!--  -->
```c++
unsigned char onPinList[8] = {0, 2, 4, 6, 8, 10, 12, 14};
unsigned char offPinList[8] = {1, 3, 5, 7, 9, 11, 13, 15};

// Sets pins in onPinList to on
gpio.SetGPIOValues(onPinList, sizeof(onPinList), 1);
// Sets pins in offPinList to off
gpio.SetGPIOValues(offPinList, sizeof(offPinList), 0);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetPrescaler</summary>
`SetPrescaler` is a **function** that sets the prescaler for the FPGA clock.

```c++
// Function declaration in header file
bool SetPrescaler(uint16_t bank, uint16_t prescaler);
```
<!--  -->
```c++
// Set prescaler for bank 0 to 32
// 2^5 = 32
gpio.SetPrescaler(0, 5);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.Set9GServoAngle</summary>
`Set9GServoAngle` is a **function** that sets a servo angle. It is based on SG90 servo calibration.

```c++
// Function declaration in header file
bool Set9GServoAngle(float angle, uint16_t pin);
```
<!--  -->
```c++
// Set servo angle to 70 degrees on pin 0
gpio.SetPrescaler(70, 0);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetServoAngle</summary>
`SetServoAngle` is a **function** that sets a servo angle. It is based on the min_pulse_ms entered.

```c++
// Function declaration in header file
bool SetServoAngle(float angle, float min_pulse_ms, uint16_t pin);
```
<!--  -->
```c++
// Set servo angle to 70 degrees on pin 0
// For a servo that accepts a minimum pulse of 0.8ms
gpio.SetServoAngle(70, 0.8, 0);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetPWM</summary>
`SetPWM` is a **function** that sets a PWM output.

```c++
// Function declaration in header file
bool SetPWM(float frequency, float percentage, uint16_t pin);
```
<!--  -->
```c++
// Set PWM output to 50Hz, with a 25% duty cycle on pin 0
gpio.SetPWM(50, 25, 0);
```

</details>
</details>

<details markdown="1" open>
<summary style="font-size: 1.75rem; font-weight: 300;">GPIOBank</summary>
`GPIOBank` is an **object** that contains functions to interface with GPIO PWM. `GPIOControl` contains an array of `GPIOBank` objects, called `banks`_

PWM Frequency is set by bank. A bank is a set of 4 pins, starting from pin 0 and going in order. Bank 0 is pin 0-3, Bank 1 is pin 4-7 etc.

The functions below are part of `GPIOBank`.

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetPeriod</summary>
`SetPeriod` is a **function** that sets the PWM period.

```c++
// Function declaration in header file
bool SetPeriod(uint16_t period);
```
<!--  -->
```c++
// Set PWM period for bank 0 to 50000 FPGA clock ticks
gpio.Banks(0).SetPeriod(50000);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetDuty</summary>
`SetDuty` is a **function** that sets the PWM duty.

```c++
// Function declaration in header file
bool SetDuty(uint16_t channel, uint16_t duty);
```
<!--  -->
```c++
// Set PWM duty for channel 0 of bank 0 to 10000 FPGA clock ticks
gpio.Banks(0).SetDuty(0, 10000);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.SetupTimer</summary>
>Under Maintenance

`SetupTimer` is a **function** that sets up the timer.

```c++
// Function declaration in header file
bool SetupTimer(uint16_t channel, uint16_t init_event, uint16_t final_event);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.GetTimerCounter</summary>
>Under Maintenance

`GetTimerCounter` is a **function** that returns the timer counter.

```c++
// Function declaration in header file
uint16_t GetTimerCounter(uint16_t channel);
```

</details>
</details>
