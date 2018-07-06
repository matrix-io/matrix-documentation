<h2 style="padding-top:0">Humidity</h2>
<h4 style="padding-top:0">HAL Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The humidity sensor reports values for:

* Humidity
* Temperature

## Code Example

Function references can be found [here](/matrix-hal/reference/humidity).

The following section shows how to receive data from the humidity sensor. You can download this example <a href="https://raw.githubusercontent.com/matrix-io/matrix-hal-examples/master/sensors/humidity_sensor.cpp" target="_blank">here</a>.

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Include Statements</summary>
To begin working with the humidity sensor you need to include these header files.

```language-cpp
// System calls
#include <unistd.h>
// Input/output streams and functions
#include <iostream>

// Interfaces with humidity sensor
#include "matrix_hal/humidity_sensor.h"
// Holds data from humidity sensor
#include "matrix_hal/humidity_data.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

</details>

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Initial Setup</summary>
You'll then need to setup `MatrixIOBus` in order to communicate with the hardware on your MATRIX device.

```language-cpp
int main() {
  // Create MatrixIOBus object for hardware communication
  matrix_hal::MatrixIOBus bus;
  // Initialize bus and exit program if error occurs
  if (!bus.Init()) return false;
```

</details>

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Main Setup</summary>
Now we will create our `HumidityData` and `HumiditySensor` object and use it to receive data from the humidity sensor.

```language-cpp
  // The following code is part of main()
  
  // Create HumidityData object
  matrix_hal::HumidityData humidity_data;
  // Create HumiditySensor object
  matrix_hal::HumiditySensor humidity_sensor;
  // Set humidity_sensor to use MatrixIOBus bus
  humidity_sensor.Setup(&bus);
  
  // Endless loop
  while (true) {
    // Overwrites humidity_data with new data from humidity sensor
    humidity_sensor.Read(&humidity_data);
    // Humidity output is represented in %
    float humidity = humidity_data.humidity;
    // Temperature output is represented in °C
    float temperature = humidity_data.temperature;
    // Clear console
    std::system("clear");
    // Output sensor data to console
    std::cout << " [ Humidity Sensor Output ]" << std::endl;
    std::cout << " [ Humidity (%) : " << humidity
              << " ] [ Temperature (°C) : " << temperature << "]" << std::endl;

    // Sleep for 20000 microseconds
    usleep(20000);
  }

  return 0;
}
```

</details>