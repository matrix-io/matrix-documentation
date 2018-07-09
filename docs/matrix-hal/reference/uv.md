<h2 style="padding-top:0">UV</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The UV sensor reports values for:

* UV Index scale used in the United States, conforms with international guidelines for UVI reporting established by the World Health Organization.  From <a href="https://www.epa.gov/sunsafety/uv-index-scale-0" target="_blank">UV Index Scale</a>

## References

Below is the overview of the UV sensor implementation. Code example can be found [here](/matrix-hal/examples/uv).

These header files are required to use the UV sensor.

```language-cpp
// Interfaces with UV sensor
#include "matrix_hal/uv_sensor.h"
// Holds data from UV sensor
#include "matrix_hal/uv_data.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">UVData</summary>
`UVData` is a required **object** that contains the UV sensor's supported data parameters.

```language-cpp
// Create UVData object
matrix_hal::UVData uv_data;
```

The following code accesses the parameters of `UVData`.

```language-cpp
// Output is represented in UV Index
float UV = uv_data.uv;
```
</details>

<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">UVSensor</summary>
`UVSensor` is a required **object** that contains functions to interface with the UV sensor.

```language-cpp
// Create UVSensor object
matrix_hal::UVSensor uv_sensor;
```
The functions below are part of `UVSensor`.

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Setup</summary>
`Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device.

```language-cpp
// Function declaration
void Setup(MatrixIOBus *bus);
```

```language-cpp
// Set uv_sensor to use MatrixIOBus bus
uv_sensor.Setup(&bus);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Read</summary>
`Read` is a **function** that takes a `UVData` object as a parameter and writes the current humidity sensor data into the `UVData` object.

```language-cpp
// Function declaration
bool Read(UVData *data);
```

```language-cpp
// Overwrites uv_data with new data from UV sensor
uv_sensor.Read(&uv_data);
```
</details>
</details>