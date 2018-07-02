<h2 style="padding-top: 0">Introduction</h2>

Programs created with HAL allow you to directly access sensors and components on the MATRIX device through C++. This guide will show you how to create and run an LED demo in HAL. The final result being a rainbow LED sequence.

## Creating A Program

Create a file called demo.cpp in your home folder on the Pi.

You'll need to copy all the code below into the new file.

```language-cpp
// Included for usleep() function
#include <unistd.h>
// Included for console output
#include <iostream>
// Included for sin() function
#include <cmath>

// Interfaces with Everloop
#include "matrix_hal/everloop.h"
// Holds data for Everloop
#include "matrix_hal/everloop_image.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"

int main() {
  // Create a bus object for hardware communication
  matrix_hal::MatrixIOBus bus;
  // Initialize bus and exit program if error
  if (!bus.Init()) return false;
  // Holds the number of LEDs on MATRIX device
  int ledCount = bus.MatrixLeds();
  // Create EverloopImage object, with size of ledCount
  matrix_hal::EverloopImage image1d(ledCount);
  // Create Everloop object
  matrix_hal::Everloop everloop;
  // Specify the MatrixIOBus object that Everloop object will use
  everloop.Setup(&bus);

  // Variables used for sine wave rainbow logic
  float counter = 0;
  const float freq = 0.375;

  // Endless loop for rainbow effect
  while (true) {
    //Logic for sine wave rainbow.
    // For each led in image1d.leds, set led value
    for (matrix_hal::LedValue &led : image1d.leds) { 
      led.red = (std::sin(freq * counter + 0) * 155 + 100) / 10;
      led.green = (std::sin(freq * counter + M_PI / 2) * 155 + 100) / 10;
      led.blue = (std::sin(freq * counter + M_PI) * 155 + 100) / 10;
      // Increment counter for rainbow effect
      counter = counter + 0.51;
    }

    // Updates the LEDs
    everloop.Write(&image1d);

    // Sleep for 20000 microseconds
    usleep(20000);
  }

  return 0;
}
```

<br/>

## Compiling your Program
When compiling your program you must link the libmatrix_creator_hal.so file. With g++ the `-l` flag links a library and so `-lmatrix_creator_hal` links the libmatrix_creator_hal.so file.

```language-bash
g++ -o demo.out demo.cpp -std=c++11 -lmatrix_creator_hal
```

<br/>

## Running your Program
Run the following command to start the demo program.

```language-bash
./demo.out
```

<br/>

## Next Steps
View our [reference page](../reference) to see what you can do with MATRIX HAL.