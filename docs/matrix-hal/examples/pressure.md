<h2 style="padding-top:0">Pressure</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

<br/>

## Overview

The Pressure sensor reports values for:

* Pressure
* Altitude
* Temperature

>Based on component location, the temperature values from the [Humidity sensor](./humidity) are recommended over the Pressure sensor

## Pressure Sensor Setup

To begin working with the pressure sensor you need to include these header files.

```language-cpp
// Interfaces with pressure sensor
#include "matrix_hal/pressure_sensor.h"
// Holds data from pressure sensor
#include "matrix_hal/pressure_data.h"
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

Now we will create our `PressureSensor` and `PressureData` objects.

* `PressureData` - **Object** that contains all parameters of the uv sensor.

    * `altitude` - **Float** that holds altitude data.

    * `pressure` - **Float** that holds pressure data.

    * `temperature` - **Float** that holds temperature data.

    <div class="inline-bullet-fix" style="margin-top:15.6px;"/>

* `PressureSensor` - **Object** that contains the functions for getting data from the pressure sensor.
  
    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.
    
    * `.Read(PressureData)` **Function** that takes `PressureData` object as a parameter and writes pressure sensor data to `PressureData` object.


```language-cpp
// Make PressureData object
matrix_hal::PressureData pressure_data;
// Make PressureSensor object
matrix_hal::PressureSensor pressure_sensor;
// Specify the MatrixIOBus object that the PressureSensor object will use
pressure_sensor.Setup(&bus);
```

The following code updates `PressureData` with the data from `PressureSensor`.

```language-cpp
// Overwrites PressureData object with new data
pressure_sensor.Read(&pressure_data);
```

The following code accesses the stored data from the sensor.

```language-cpp
// In meters
float altitude = pressure_data.altitude;
// In kPa
float pressure = pressure_data.pressure;
// In °C
float temperature = pressure_data.temperature;
```