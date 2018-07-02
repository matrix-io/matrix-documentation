<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

GPIO can be used to communicate or receive input from analog and digital components.

* [MATRIX Creator Pinout](/matrix-creator/resources/pinout.md)
* [MATRIX Voice Pinout](/matrix-voice/resources/pinout.md)

<br/>


<!-- Seperate Examples and References -->
<!-- GPIO Setup, GPIO I/O, GPIO PWM, GPIO Servo -->
<!-- More imperative tone -->

## GPIO Setup

To begin working with the GPIO you need to include these header files.

```language-cpp
// Interfaces with GPIO
#include "matrix_hal/gpio_control.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

You'll then need to setup `MatrixIOBus` in order to communicate with the hardware on your MATRIX device.

```language-cpp
// Create a bus object for hardware communication
matrix_hal::MatrixIOBus bus;
// Initialize bus and exit program if error
if (!bus.Init()) return false;
```

Now we will create our `GPIOControl` object.

* `GPIOControl` - **Object** that contains functions to interface with GPIO.

    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.

```language-cpp
// Create GPIOControl object
matrix_hal::GPIOControl gpio; 
// Specify the MatrixIOBus object that GPIO will use
gpio.Setup(&bus); 
```

<br/>

## GPIO Functions

Each GPIO pin can either function as a digital I/0 pin or as a PWM pin.

### GPIO I/O Input

To get input from a GPIO pin first set the mode.

```language-cpp
// Set GPIO pin 0 to input
gpio.SetMode(0, 0); // (uint16_t pin, uint16_t mode)

// Alternatively you can set the mode for multiple GPIO pins at once.

// Sets pins in inputPinList to input
unsigned char inputPinList[8] = {0, 2, 4, 6, 8, 10, 12, 14};
gpio.SetMode(inputPinList, sizeof(inputPinList), 0); // (unsigned char *pinList, int length, uint16_t mode)
```

The code below reads GPIO pins.

```language-cpp
// Read GPIO pin 0
uint16_t GPIO_pin_0_output = gpio.GetGPIOValue(0);

// Alternatively you can read from all GPIO pins at once.

// Read from all pins at once
// Each bit of the 16-bit integer represents a GPIO pin
uint16_t GPIO_ALL_output = gpio.GetGPIOValues();
```

<br/>

### GPIO PWM Input
>Under Maintenance


### GPIO I/O Output

To output from a GPIO pin first set the mode.

```language-cpp
// Set GPIO pin 0 to output
gpio.SetMode(0, 1); // (uint16_t pin, uint16_t mode)

// Alternatively you can set the mode for multiple GPIO pins at once.

// Sets pins in outputPinList to output
unsigned char outputPinList[8] = {1, 3, 5, 7, 9, 11, 13, 15};
gpio.SetMode(outputPinList, sizeof(outputPinList), 1); // (unsigned char *pinList, int length, uint16_t mode)
```

The code below sets GPIO pin state.

```language-cpp
// Set GPIO pin 0 to ON
gpio.SetGPIOValue(0, 1); // (uint16_t pin, uint16_t value)

// Alternatively you can set multiple GPIO pins at once.

unsigned char onPinList[4] = {1, 3, 5, 7};
unsigned char offPinList[4] = {9, 11, 13, 15};

// Sets pins in onPinList to on
gpio.SetGPIOValues(onPinList, sizeof(onPinList), 1); // (unsigned char *pinList, int length, uint16_t value)
// Sets pins in offPinList to off
gpio.SetGPIOValues(offPinList, sizeof(offPinList), 0); // (unsigned char *pinList, int length, uint16_t value)
```

<br/>

### GPIO PWM Output

>PWM Frequency is set by bank, and a bank can have only one frequency set at a time. A bank is a set of 4 pins, starting from pin 0 and going in order. Bank 0 is pin 0-3, Bank 1 is pin 4-7 etc.

To output PWM from a GPIO pin first set the mode and the function.

```language-cpp
// Set GPIO pin 0 to output
gpio.SetMode(0, 1); // (uint16_t pin, uint16_t mode)

// Set GPIO pin 0 to PWM mode
gpio.SetFunction(0, 1); // (uint16_t pin, uint16_t function)
```

The code below sets GPIO pin 0 to output PWM.

```language-cpp
// Set PWM output to 50Hz, with a 60% duty cycle on pin 0
gpio.SetPWM(50, 60, 0); // (float frequency, float percentage, uint16_t pin)
```

<br/>

### GPIO Servo Output

>PWM Frequency is set by bank, and a bank can have only one frequency set at a time. A bank is a set of 4 pins, starting from pin 0 and going in order. Bank 0 is pin 0-3, Bank 1 is pin 4-7 etc.
To output PWM from a GPIO pin first set the mode and the function.

```language-cpp
// Set GPIO pin 0 to output
gpio.SetMode(0, 1); // (uint16_t pin, uint16_t mode)

// Set GPIO pin 0 to PWM mode
gpio.SetFunction(0, 1); // (uint16_t pin, uint16_t function)
```

The code below sets GPIO pin 0 to output a PWM signal which sets a 180 degree servo to 60 degrees according to SG90 servo calibration.

```language-cpp
// Set an SG90 servo to 60 degrees on GPIO pin 0
gpio.Set9GServoAngle(60, 0); // (float angle, uint16_t pin)
```

Alternatively the SetServoAngle function considers the minimum pulse required by servo. 

The code below sets GPIO pin 0 to output a PWM signal which sets a 180 degree servo to 60 degrees according to a minimum pulse of 0.8ms.

```language-cpp
// Set a servo to 60 degrees on GPIO pin 0
// Minimum pulse for servo is 0.8ms
gpio.SetServoAngle(60, 0.8, 0); // (float angle, float min_pulse_ms, uint16_t pin)
```

## References

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">GPIOControl</summary>
`GPIOControl` is an **object** that contains functions to interface with GPIO.

```language-cpp
matrix_hal::GPIOControl gpio;
```

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">Setup(MatrixIOBus)</summary>
`Setup(MatrixIOBus)` is a **function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.

```language-cpp
// Function declaration
void Setup(MatrixIOBus *bus);

// Set gpio to use MatrixIOBus bus
gpio.Setup(&bus);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">Banks()</summary>
`Banks` is a **function** that returns `banks_` array of `GPIOBank` objects.

```language-cpp
// Function declaration
GPIOBank &Bank(uint16_t bank) { return banks_[bank]; }

// Returns banks_[index]
gpio.Banks(index);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetMode(uint16_t pin, uint16_t mode)</summary>
`SetMode(uint16_t pin, uint16_t mode)` is a **function** that sets a single or multiple GPIO pin(s) to output or input.

```language-cpp
// Function declaration
bool SetMode(uint16_t pin, uint16_t mode);

// Sets pin 0 to output
gpio.SetMode(0, 1)
// Sets pin 0 to input
gpio.SetMode(0, 0)
```

`SetMode` is overloaded to set multiple GPIO pins to output or input.

```language-cpp
// Function declaration
bool SetMode(unsigned char *pinList, int length, uint16_t mode);

unsigned char inputPinList[8] = {0, 2, 4, 6, 8, 10, 12, 14};
unsigned char outputPinList[8] = {1, 3, 5, 7, 9, 11, 13, 15};

// Sets pins in inputPinList to input
gpio.SetMode(inputPinList, sizeof(inputPinList), 0);
// Sets pins in outputPinList to output
gpio.SetMode(outputPinList, sizeof(outputPinList), 1);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetFunction</summary>
`SetFunction` is a **function** that sets a single GPIO pin to I/O or PWM mode.

```language-cpp
// Function declaration
bool SetFunction(uint16_t pin, uint16_t function);

// Sets pin 0 to I/O mode
gpio.SetFunction(0, 0);
// Sets pin 0 to PWM mode
gpio.SetFunction(0, 1);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">GetGPIOValue</summary>
`GetGPIOValue` is a **function** that returns a GPIO value.

```language-cpp
// Function declaration
uint16_t GetGPIOValue(uint16_t pin);

// Gets value of pin 0
bool value = gpio.GetGPIOValue(0);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">GetGPIOValues</summary>
`GetGPIOValues` is a **function** that returns all GPIO values, each bit of the returned 16bit integer represents a pin.

```language-cpp
// Function declaration
uint16_t GetGPIOValues();

// Gets all pin values
uint16_t values = gpio.GetGPIOValues();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetGPIOValue</summary>
`SetGPIOValue` is a **function** that sets a GPIO value.

```language-cpp
// Function declaration
bool SetGPIOValue(uint16_t pin, uint16_t value);

// Sets pin 0 to on
gpio.SetGPIOValue(0, 1);
// Sets pin 0 to off
gpio.SetGPIOValue(0, 0);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetGPIOValues</summary>
`SetGPIOValues` is a **function** that sets multiple GPIO value.

```language-cpp
// Function declaration
bool SetGPIOValues(unsigned char *pinList, int length, uint16_t value);

unsigned char onPinList[8] = {0, 2, 4, 6, 8, 10, 12, 14};
unsigned char offPinList[8] = {1, 3, 5, 7, 9, 11, 13, 15};

// Sets pins in onPinList to on
gpio.SetGPIOValues(onPinList, sizeof(onPinList), 1);
// Sets pins in offPinList to off
gpio.SetGPIOValues(offPinList, sizeof(offPinList), 0);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetPrescaler</summary>
`SetPrescaler` is a **function** that sets the prescaler for FPGA clock.

```language-cpp
// Function declaration
bool SetPrescaler(uint16_t bank, uint16_t prescaler);

// Set prescaler for bank 0 to 32
// 2^5 = 32
gpio.SetPrescaler(0, 5)
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">Set9GServoAngle</summary>
`Set9GServoAngle` is a **function** that sets a servo angle. It is based on SG90 servo calibration.

```language-cpp
// Function declaration
bool Set9GServoAngle(float angle, uint16_t pin);

// Set servo angle to 70° on pin 0
gpio.SetPrescaler(70, 0)
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetServoAngle</summary>
`SetServoAngle` is a **function** that sets a servo angle. It it based on the min_pulse_ms entered.

```language-cpp
// Function declaration
bool SetServoAngle(float angle, float min_pulse_ms, uint16_t pin);

// Set servo angle to 70° on pin 0
// For a servo that accepts a minimum pulse of 0.8ms
gpio.SetServoAngle(70, 0.8, 0)
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetPWM</summary>
`SetPWM` is a **function** that sets a PWM output.

```language-cpp
// Function declaration
bool SetPWM(float frequency, float percentage, uint16_t pin);

// Set PWM output to 50Hz, with a 25% duty cycle on pin 0
gpio.SetPWM(50, 25, 0)
```
</details>
</details>

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">GPIOBank</summary>
`GPIOBank` is an **object** that contains functions to interface with GPIO PWM.

PWM Frequency is set by bank. A bank is a set of 4 pins, starting from pin 0 and going in order. Bank 0 is pin 0-3, Bank 1 is pin 4-7 etc.

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetPeriod</summary>
`SetPeriod` is an **function** that sets the PWM period.

```language-cpp
// Function declaration
bool SetPeriod(uint16_t period);

// Set PWM period for bank 0 to 50000 FPGA clock ticks
gpio.Banks(0).SetPeriod(50000);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetDuty</summary>
`SetDuty` is an **function** that sets the PWM duty.

```language-cpp
// Function declaration
bool SetDuty(uint16_t channel, uint16_t duty);

// Set PWM duty for channel 0 of bank 0 to 10000 FPGA clock ticks
gpio.Banks(0).SetDuty(0, 10000);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">SetupTimer</summary>
>Under Maintenance

`SetupTimer` is an **function** that sets up the timer.

```language-cpp
// Function declaration
bool SetupTimer(uint16_t channel, uint16_t init_event, uint16_t final_event);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">GetTimerCounter</summary>
>Under Maintenance

`GetTimerCounter` is an **function** that returns the timer counter.

```language-cpp
// Function declaration
uint16_t GetTimerCounter(uint16_t channel);
```
</details>
</details>