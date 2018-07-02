<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

The Everloop is a powerful tool for visually communicating through LEDs.
 
 <br/>

## Everloop Setup

To begin working with the Everloop you need to include these header files.

```language-cpp
// Interfaces with Everloop
#include "matrix_hal/everloop.h"
// Holds data for Everloop
#include "matrix_hal/everloop_image.h"
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

Now we will create our `Everloop` and `EverloopImage` objects.

* `EverloopImage` - **Object** that contains the everloop `leds`.

    * `leds` - **Array** that Holds the colors for each LED on your MATRIX device.
        
        * `LedValue` **Object** that holds the color of each LED.

            * `red` - **Int** set from 0 through 255.
            
            * `blue` - **Int** set from 0 through 255.
           
            * `green` - **Int** set from 0 through 255.
           
            * `white` - **Int** set from 0 through 255.

            <div class="inline-bullet-fix" style="margin-top:15.6px;"/>
           
* `Everloop` - **Object** that contains the functions for manipulating your MATRIX Everloop.
  
    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.
    
    * `.Write(EverloopImage)` **Function** that takes `EverloopImage` object as a parameter and sends to your MATRIX device. 

```language-cpp
// Holds the number of LEDs on MATRIX device
int ledCount = bus.MatrixLeds();
// Create EverloopImage object, with size of ledCount
matrix_hal::EverloopImage everloop_image(ledCount);
// Create Everloop object
matrix_hal::Everloop everloop;
// Specify the MatrixIOBus object that Everloop object will use
everloop.Setup(&bus);
```

<br/>

## Setting The Everloop

In order to edit the LEDs of your MATRIX device, you must define the values for each LED you want to use.

The code below will turn every LED to green.

```language-cpp
// For each led in everloop_image.leds, set led value
for (hal::LedValue &led : everloop_image.leds) {
  led.red = 0;
  led.green = 255;
  led.blue = 0;
  led.white = 0;
}

// Updates the Everloop
everloop.Write(&everloop_image); 
```

<br/>

## Advanced Examples

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">All Off</summary>
The code below will turn off every led.

```language-cpp
// For each led in everloop_image.leds, set led value
for (hal::LedValue &led : everloop_image.leds) {
  led.red = 0;
  led.green = 0;
  led.blue = 0;
  led.white = 0;
}
// Updates the LEDs
everloop.Write(&everloop_image); 
```

</details>

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Mixed Colors</summary>
The code below will make odd LEDs yellow and even LEDs purple.

```language-cpp
// For each led in everloop_image.leds, set led value
for (int i = 0; i < everloop_image.leds.size(); i++) {
  // When remainder is zero set led to purple
  if (i % 2 == 0) { 
    //Blending blue and red to make purple
    everloop_image.leds[i].blue = 40; 
    everloop_image.leds[i].red = 40;
  }
  // Else set led to yellow
  else {
    //Blending green and red to make yellow
    everloop_image.leds[i].green = 40; 
    everloop_image.leds[i].red = 60;
  }
}
// Updates the LEDs
everloop.Write(&everloop_image);
```

![](/matrix-hal/reference/img/purple_yellow_led.jpg)
</details>

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Mixed Colors</summary>
The code below uses sine waves to make a spinning rainbow effect.

```language-cpp
// Included for usleep() function
#include <unistd.h>
// Included for sin() function.
#include <cmath> 

// Variables used for sine wave rainbow logic
float counter = 0;
const float freq = 0.375;

// Endless loop for rainbow effect
while(true) {
  //Logic for sine wave rainbow.
  // For each led in everloop_image.leds, set led value
  for (hal::LedValue &led : everloop_image.leds) { 
    led.red = (std::sin(freq * counter + 0) * 155 + 100) / 10;
    led.green = (std::sin(freq * counter + M_PI / 2) * 155 + 100) / 10;
    led.blue = (std::sin(freq * counter + M_PI) * 155 + 100) / 10;
    counter = counter + 0.51;
  }
  // Updates the LEDs
  everloop.Write(&everloop_image);

  // Sleep for 20000 microseconds
  usleep(20000);
}
```

![](/matrix-hal/reference/img/rainbow_led.gif)
</details>

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Moving Effect</summary>
The code below varies the array index to make multiple moving dots of light.

```language-cpp
// Included for usleep() function
#include <unistd.h>

long counter = 0;
// Endless loop for moving led effect
while(true) {

  // For each led in everloop_image.leds, set led value to 0
  for (hal::LedValue &led : everloop_image.leds) {
    led.red = 0;
    led.green = 0;
    led.blue = 0;
    led.white = 0;
  }

  // Set led color per led
  everloop_image.leds[(counter / 2) % everloop_image.leds.size()].red = 40;
  everloop_image.leds[(counter / 2) % everloop_image.leds.size()].blue = 40;
  everloop_image.leds[(counter / 7) % everloop_image.leds.size()].green = 60;
  everloop_image.leds[(counter / 11) % everloop_image.leds.size()].blue = 60;
  everloop_image.leds[everloop_image.leds.size() - 1 - (counter % everloop_image.leds.size())].white = 20;

  // Updates the LEDs
  everloop.Write(&everloop_image); 
  counter++;
  
  // Sleep for 20000 microseconds
  usleep(20000);
}
```

![](/matrix-hal/reference/img/particles_led.gif)
</details>

## References

<details>
<summary style="font-size: 1.75rem; font-weight: 300;">EverloopImage</summary>
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




* `EverloopImage` - **Object** that contains the everloop `leds`.

    * `leds` - **Array** that Holds the colors for each LED on your MATRIX device.
        
        * `LedValue` **Object** that holds the color of each LED.

            * `red` - **Int** set from 0 through 255.
            
            * `blue` - **Int** set from 0 through 255.
           
            * `green` - **Int** set from 0 through 255.
           
            * `white` - **Int** set from 0 through 255.

            <div class="inline-bullet-fix" style="margin-top:15.6px;"/>
           
* `Everloop` - **Object** that contains the functions for manipulating your MATRIX Everloop.
  
    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.
    
    * `.Write(EverloopImage)` **Function** that takes `EverloopImage` object as a parameter and sends to your MATRIX device. 
