<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

The Everloop is a powerful tool for visually communicating through LEDs.

### Initial Setup

To begin working with the Everloop you need to include these header files.

```language-cpp
#include "matrix_hal/everloop.h"
#include "matrix_hal/everloop_image.h"
#include "matrix_hal/matrixio_bus.h"
```

You'll also need to setup the `MatrixIOBus` for hardware communication.

```language-cpp
matrix_hal::MatrixIOBus bus; // Create a bus object for hardware communication
if (!bus.Init()) return false; // Initializes bus
```

Now we will create our `Everloop` and `EverloopImage` objects.

* `EverloopImage` - A data structure that holds the values that will later be sent to the LEDs.
* `Everloop` - Object that will push a `EverloopImage` object to the LED's with the `.Write(EverloopImage)` function.

```language-cpp
matrix_hal::EverloopImage image1d(bus.MatrixLeds()); // Create EverloopImage object, bus.MatrixLeds() returns number of LEDs on MATRIX device
matrix_hal::Everloop everloop; // Create Everloop object
everloop.Setup(&bus); // Specify the MatrixIOBus object that Everloop will use
```
### LED Rendering
The MATRIX Creator has 35 LEDs, while the MATRIX Voice has 18 LEDs.
`EverloopImage` has a `leds` field which is an array of `LedValue` objects.
A `LedValue` object consists of a `red`, `green`, `blue`, and `white` field that accept a value from 0-255.

<h4 style="padding-top: 0">Examples</h4>

The code below will turn off every led.

```language-cpp
for (hal::LedValue &led : image1d.leds) {
  led.red = 0;
  led.green = 0;
  led.blue = 0;
  led.white = 0;
}
everloop.Write(&image1d); // This updates the LEDs
```

The code below will make odd LEDs yellow and even LEDs purple.

```language-cpp
for (int i = 0; i < image1d.leds.size(); i++) {
  if (i % 2 == 0) {
    //Blending blue and red to make purple
    image1d.leds[i].blue = 40; 
    image1d.leds[i].red = 40;
  }
  else {
    //Blending green and red to make yellow
    image1d.leds[i].green = 40; 
    image1d.leds[i].red = 60;
  }
}
everloop.Write(&image1d); // This updates the LEDs
```

![](/matrix-hal/reference/img/purple_yellow_led.jpg)

The code below uses sine waves to make a spinning rainbow effect.

```language-cpp
#include <cmath> //Needed for sin() function.
float counter = 0;
const float freq = 0.375;
while(true) {
  for (hal::LedValue &led : image1d.leds) { //  Logic for sine wave rainbow.
    led.red = (std::sin(freq*counter + 0)*155+100)/10;
    led.green = (std::sin(freq*counter + M_PI/2)*155+100)/10;
    led.blue = (std::sin(freq*counter + M_PI)*155+100)/10;
    counter = counter + 0.51;
  }
  everloop.Write(&image1d); // This updates the LEDs
  usleep(20000);
}
```

![](/matrix-hal/reference/img/rainbow_led.gif)

The code below varies the array index to make multiple moving dots of light.

```language-cpp
long counter = 0;
while(true) {
  for (hal::LedValue &led : image1d.leds) {
    led.red = 0;
    led.green = 0;
    led.blue = 0;
    led.white = 0;
  }
  image1d.leds[(counter / 2) % image1d.leds.size()].red = 40;
  image1d.leds[(counter / 2) % image1d.leds.size()].blue = 40;
  image1d.leds[(counter / 7) % image1d.leds.size()].green = 60;
  image1d.leds[(counter / 11) % image1d.leds.size()].blue = 60;
  image1d.leds[image1d.leds.size() - 1 - (counter % image1d.leds.size())].white = 20;

  everloop.Write(&image1d); // This updates the LEDs
  counter++;
  usleep(20000);
}
```
![](/matrix-hal/reference/img/particles_led.gif)
