<h2 style="padding-top:0">UV</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

<br/>

## UV Sensor Setup

To begin working with the UV sensor you need to include these header files.

```language-cpp
// Interfaces with UV sensor
#include "matrix_hal/uv_sensor.h"
// Holds data from UV sensor
#include "matrix_hal/uv_data.h"
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

Now we will create our `UVSensor` and `UVData` objects.

* `UVData` - **Object** that contains all parameters of the uv sensor.

    * `uv` - **Float** that holds UV data.

    <div class="inline-bullet-fix" style="margin-top:15.6px;"/>

* `UVSensor` - **Object** that contains the functions for getting data from the UV sensor.

    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.

    * `.Read(UVData)` - **Function** that takes `UVData` object as a parameter and writes UV sensor data to `UVData` object.


```language-cpp
// Make UVData object
matrix_hal::UVData uv_data;
// Make UVSensor object
matrix_hal::UVSensor uv_sensor;
// Specify the MatrixIOBus object that the UVSensor object will use
uv_sensor.Setup(&bus);
```

The following code updates `UVData` with the data from `UVSensor`.

```language-cpp
// Overwrites UVData object with new data
uv_sensor.Read(&uv_data); 
```

The following code accesses the stored data from the sensor.

```language-cpp
float uv = uv_data.uv;
```
</details>