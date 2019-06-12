<h2 style="padding-top:0">UV</h2>
<h4 style="padding-top:0">HAL Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The UV sensor reports values for:

* UV Index scale used in the United States, conforms with international guidelines for UVI reporting established by the World Health Organization.  From <a href="https://www.epa.gov/sunsafety/uv-index-scale-0" target="_blank">UV Index Scale</a>

## Code Example

Below is an example of how to interface with the UV sensor in MATRIX HAL.

UV sensor function references can be found [here](/matrix-hal/reference/uv).

The following section shows how to receive data from the UV sensor. You can download this example <a href="https://github.com/matrix-io/matrix-hal-examples/blob/master/sensors/uv_sensor.cpp" target="_blank">here</a>.

The command below will compile the example. Be sure to pass in your C++ file and desired output file.

```cpp
g++ -o YOUR_OUTPUT_FILE YOUR_CPP_FILE -std=c++11 -lmatrix_creator_hal
```

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Include Statements</summary>
To begin working with the UV sensor you need to include these header files.

```cpp
// System calls
#include <unistd.h>
// Input/output streams and functions
#include <iostream>

// Interfaces with UV sensor
#include "matrix_hal/uv_sensor.h"
// Holds data from UV sensor
#include "matrix_hal/uv_data.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

</details>

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Initial Setup</summary>
You'll then need to setup `MatrixIOBus` in order to communicate with the hardware on your MATRIX device.

```cpp
int main() {
  // Create MatrixIOBus object for hardware communication
  matrix_hal::MatrixIOBus bus;
  // Initialize bus and exit program if error occurs
  if (!bus.Init()) return false;
```

</details>

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Main Setup</summary>
Now we will create our `UVData` and `UVSensor` object and use it to receive data from the UV sensor.

```cpp
  // The following code is part of main()

  // Create UVData object
  matrix_hal::UVData uv_data;
  // Create UVSensor object
  matrix_hal::UVSensor uv_sensor;
  // Set uv_sensor to use MatrixIOBus bus
  uv_sensor.Setup(&bus);
  
  // Endless loop
  while (true) {
    // Overwrites UVData object with new data
    uv_sensor.Read(&uv_data);
    // UV output is represented in UV Index
    float UV = uv_data.uv;
    // Clear console
    std::system("clear");
    // Output sensor data to console
    std::cout << " [ UV Sensor Output ]" << std::endl;
    std::cout << " [ UV : " << UV << " ]" << std::endl;

    // Sleep for 20000 microseconds
    usleep(20000);
  }

  return 0;
}
```

</details>