<h2 style="padding-top:0">Humidity</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The Humidity driver supports:

* Reading relative humidity
* Reading temperature in Celsius

## Humidity Sensor Setup

To begin working with the humidity sensor you need to include these header files.

```language-cpp
// Interfaces with humidity sensor
#include "matrix_hal/humidity_sensor.h"
// Holds data from humidity sensor
#include "matrix_hal/humidity_data.h"
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

Now we will create our `HumiditySensor` and `HumidityData` objects.

* `HumidityData` - **Object** that contains all parameters of the humidity sensor.

    * `humidity` - **Float** that holds humidity data.

    * `temperature` - **Float** that holds temperature data.

    <div class="inline-bullet-fix" style="margin-top:15.6px;"/>

* `HumiditySensor` - **Object** that contains the functions for getting data from the humidity sensor.
  
    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.

    * `.Read(PressureData)` **Function** that takes `HumidityData` object as a parameter and writes humidity sensor data to `HumidityData` object.

```language-cpp
// Make HumidityData object
matrix_hal::HumidityData humidity_data;
// Make HumiditySensor object
matrix_hal::HumiditySensor humidity_sensor; 
// Specify the MatrixIOBus object that the HumiditySensor object will use
humidity_sensor.Setup(&bus);
```

The following code updates `HumidityData` with the data from `HumiditySensor`.

```language-cpp
// Overwrites HumidityData object with new data
humidity_sensor.Read(&humidity_data); 
```

The following code accesses the stored data from the sensor.

```language-cpp
// In %
float humidity = humidity_data.humidity; 
// In °C
float temperature = humidity_data.temperature; 
```