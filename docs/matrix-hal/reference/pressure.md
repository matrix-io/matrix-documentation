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

```language-cpp
// Interfaces with pressure sensor
#include "matrix_hal/pressure_sensor.h"
// Holds data from pressure sensor
#include "matrix_hal/pressure_data.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">PressureData</summary>
`PressureData` is a required **object** that contains the pressure sensor's supported data parameters.

```language-cpp
// Create PressureData object
matrix_hal::PressureData pressure_data;
```

The following code accesses the parameters of `PressureData`.

```language-cpp
// Output is represented in meters
float altitude = pressure_data.altitude;
// Output is represented in kPa
float pressure = pressure_data.pressure;
// Output is represented in Celsius
float temperature = pressure_data.temperature;
```
</details>

<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">PressureSensor</summary>
`PressureSensor` is a required **object** that contains functions to interface with the pressure sensor.

```language-cpp
// Create PressureSensor object
matrix_hal::PressureSensor pressure_sensor;
```
The functions below are part of `PressureSensor`.

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Setup</summary>
`Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device.

```language-cpp
// Function declaration in header file
void Setup(MatrixIOBus *bus);
```

```language-cpp
// Set pressure_sensor to use MatrixIOBus bus
pressure_sensor.Setup(&bus);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Read</summary>
`Read` is a **function** that takes a `PressureData` object as a parameter and writes the current pressure sensor data into the `PressureData` object.

```language-cpp
// Function declaration in header file
bool Read(PressureData *data);
```

```language-cpp
// Overwrites pressure_data with new data from pressure sensor
pressure_sensor.Read(&pressure_data);
```
</details>
</details>