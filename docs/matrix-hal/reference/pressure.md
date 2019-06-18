<h2 style="padding-top:0">Pressure</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The pressure sensor reports values for:

* Pressure
* Altitude
* Temperature

>Based on component location, the temperature values from the [humidity sensor](./humidity) are recommended over the pressure sensor.

## References

Below is the overview of the pressure sensor implementation. Code example can be found [here](/matrix-hal/examples/pressure).

These header files are required to use the pressure sensor.

```c++
// Interfaces with pressure sensor
#include "matrix_hal/pressure_sensor.h"
// Holds data from pressure sensor
#include "matrix_hal/pressure_data.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

???+ info "PressureData"
    `PressureData` is a required **object** that contains the pressure sensor's supported data parameters.

    ```c++
    // Create PressureData object
    matrix_hal::PressureData pressure_data;
    ```

    The following code accesses the parameters of `PressureData`.

    ```c++
    // Output is represented in meters
    float altitude = pressure_data.altitude;
    // Output is represented in Pa
    float pressure = pressure_data.pressure;
    // Output is represented in Celsius
    float temperature = pressure_data.temperature;
    ```

???+ info "PressureSensor"
    `PressureSensor` is a required **object** that contains functions to interface with the pressure sensor.

    ```c++
    // Create PressureSensor object
    matrix_hal::PressureSensor pressure_sensor;
    ```
    The functions below are part of `PressureSensor`.

    ??? summary ".Setup"
        `Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device.

        ```c++
        // Function declaration in header file
        void Setup(MatrixIOBus *bus);
        ```

        ```c++
        // Set pressure_sensor to use MatrixIOBus bus
        pressure_sensor.Setup(&bus);
        ```

    ??? summary ".Read"
        `Read` is a **function** that takes a `PressureData` object as a parameter and writes the current pressure sensor data into the `PressureData` object.

        ```c++
        // Function declaration in header file
        bool Read(PressureData *data);
        ```

        ```c++
        // Overwrites pressure_data with new data from pressure sensor
        pressure_sensor.Read(&pressure_data);
        ```