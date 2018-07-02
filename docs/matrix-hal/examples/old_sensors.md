<h2 style="padding-top:0">Sensors</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

### Available Sensors
`temperature`, `humidity`, `pressure`, `uv`, `gyroscope`, `accelerometer` , `magnetometer`

>Temperature can be obtained from the Pressure or Humidity sensor.
### Reading Sensors

<!-- Accelerometer/Gyroscope/Magnetometer -->
<details>
<summary style="font-weight:300;font-size:1.5rem;">Accelerometer/Gyroscope/Magnetometer</summary>

To begin working with the Accelerometer/Gyroscope/Magnetometer sensors you need to include these header files.

```language-cpp
#include "matrix_hal/imu_data.h"
#include "matrix_hal/imu_sensor.h"
#include "matrix_hal/matrixio_bus.h"
```

You'll also need to setup the `MatrixIOBus` for hardware communication.

```language-cpp
matrix_hal::MatrixIOBus bus; // Create a bus object for hardware communication
if (!bus.Init()) return false; // Initializes bus
```

Now we will create a `IMUSensor` object and a `IMUData` object. 

* `IMUSensor` - An object that reads data from the IMU (inertial measurement unit).
* `IMUData` - A data structure that contains all parameters of the IMU.

```language-cpp
matrix_hal::IMUData imu_data; // Make IMUData object
matrix_hal::IMUSensor imu_sensor; // Make IMUSensor object
imu_sensor.Setup(&bus); // Specify the MatrixIOBus object that the IMUSensor object will use
```

The following code updates `IMUData` with the data from `IMUSensor`.

```language-cpp
imu_sensor.Read(&imu_data); // Overwrites IMUData object with new data
```

The following code accesses the stored data from the sensor.

```language-cpp
// Accelerometer
float accel_X = imu_data.accel_x;
float accel_Y = imu_data.accel_y;
float accel_Z = imu_data.accel_z;
// Gyroscope
float gyro_X = imu_data.gyro_x;
float gyro_Y = imu_data.gyro_y;
float gyro_Z = imu_data.gyro_z;
float yaw = imu_data.yaw;
float pitch = imu_data.pitch;
float roll = imu_data.roll;
// Magnetometer
float mag_X = imu_data.mag_x;
float mag_Y = imu_data.mag_y;
float mag_Z = imu_data.mag_z; // Z-axis points upward
```
</details>

<!-- Altitude/Pressure/Temperature -->
<details>
<summary style="font-weight:300;font-size:1.5rem;">Altitude/Pressure/Temperature</summary>

To begin working with the Altitude/Pressure/Temperature sensors you need to include these header files.

```language-cpp
#include "matrix_hal/pressure_data.h"
#include "matrix_hal/pressure_sensor.h"
#include "matrix_hal/matrixio_bus.h"
```

You'll also need to setup the `MatrixIOBus` for hardware communication.

```language-cpp
matrix_hal::MatrixIOBus bus; // Create a bus object for hardware communication
if (!bus.Init()) return false; // Initializes bus
```

Now we will create a `PressureSensor` object and a `PressureData` object. 

* `PressureSensor` - An object that reads data from the pressure sensor.
* `PressureData` - A data structure that contains all parameters of the pressure sensor.

```language-cpp
matrix_hal::PressureData pressure_data; // Make PressureData object
matrix_hal::PressureSensor pressure_sensor; // Make PressureSensor object
pressure_sensor.Setup(&bus); // Specify the MatrixIOBus object that the PressureSensor object will use
```

The following code updates `PressureData` with the data from `PressureSensor`.

```language-cpp
pressure_sensor.Read(&pressure_data); // Overwrites PressureData object with new data
```

The following code accesses the stored data from the sensor.

```language-cpp
// Altitude
float altitude = pressure_data.altitude; // In meters
// Pressure
float pressure = pressure_data.pressure; // In kPa
// Temperature
float temperature = pressure_data.temperature; // In °C
```
</details>

<!-- Humidity/Temperature -->
<details>
<summary style="font-weight:300;font-size:1.5rem;">Humidity/Temperature</summary>

To begin working with the Humidity/Temperature sensors you need to include these header files.

```language-cpp
#include "matrix_hal/humidity_data.h"
#include "matrix_hal/humidity_sensor.h"
#include "matrix_hal/matrixio_bus.h"
```

You'll also need to setup the `MatrixIOBus` for hardware communication.

```language-cpp
matrix_hal::MatrixIOBus bus; // Create a bus object for hardware communication
if (!bus.Init()) return false; // Initializes bus
```

Now we will create a `HumiditySensor` object and a `HumidityData` object. 

* `HumiditySensor` - An object that reads data from the humidity sensor
* `HumidityData` - A data structure that contains all parameters of the humidity sensor

```language-cpp
matrix_hal::HumidityData humidity_data; // Make HumidityData object
matrix_hal::HumiditySensor humidity_sensor; // Make HumiditySensor object
humidity_sensor.Setup(&bus); // Specify the MatrixIOBus object that the HumiditySensor object will use
```

The following code updates `HumidityData` with the data from `HumiditySensor`.

```language-cpp
humidity_sensor.Read(&humidity_data); // Overwrites HumidityData object with new data
```

The following code accesses the stored data from the sensor.

```language-cpp
// Humidity
float humidity = humidity_data.humidity; // In %
// Temperature
float temperature = humidity_data.temperature; // In °C
```
</details>

<!-- UV -->
<details>
<summary style="font-weight:300;font-size:1.5rem;">UV</summary>

To begin working with the UV sensor you need to include these header files.

```language-cpp
#include "matrix_hal/uv_data.h"
#include "matrix_hal/uv_sensor.h"
#include "matrix_hal/matrixio_bus.h"
```

You'll also need to setup the `MatrixIOBus` for hardware communication.

```language-cpp
matrix_hal::MatrixIOBus bus; // Create a bus object for hardware communication
if (!bus.Init()) return false; // Initializes bus
```

Now we will create a `UVSensor` object and a `UVData` object. 

* `UVSensor` - An object that reads data from the uv sensor.
* `UVData` - A data structure that contains all parameters of the uv sensor.

```language-cpp
matrix_hal::UVData uv_data; // Make UVData object
matrix_hal::UVSensor uv_sensor; // Make UVSensor object
uv_sensor.Setup(&bus); // Specify the MatrixIOBus object that the UVSensor object will use
```

The following code updates `UVData` with the data from `UVSensor`.

```language-cpp
uv_sensor.Read(&uv_data); // Overwrites UVData object with new data
```

The following code accesses the stored data from the sensor.

```language-cpp
// UV
float uv = uv_data.uv;
```
</details>