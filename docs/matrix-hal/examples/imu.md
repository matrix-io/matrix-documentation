<h2 style="padding-top:0">Inertial Measurement Unit (IMU)</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The IMU driver reports values for:

* Yaw, Pitch, and Roll
* Acceleration for **x**, **y**, **z** axes
* Gyroscope for **x**, **y**, **z** axes
* Magnetometer for **x**, **y**, **z** axes

## IMU Setup

To begin working with the IMU you need to include these header files.

```language-cpp
// Interfaces with IMU sensor
#include "matrix_hal/imu_sensor.h"
// Holds data from IMU sensor
#include "matrix_hal/imu_data.h"
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

Now we will create our `IMUSensor` and `IMUData` objects.

* `IMUData` - **Object** that contains all parameters of the IMU.

    * `accel_x` - **Float** that holds accelerometer data in X direction.

    * `accel_y` - **Float** that holds accelerometer data in Y direction.

    * `accel_z` - **Float** that holds accelerometer data in Z direction.

    * `gyro_x` - **Float** that holds gyroscope data in X direction.

    * `gyro_y` - **Float** that holds gyroscope data in Y direction.

    * `gyro_z` - **Float** that holds gyroscope data in Z direction.

    * `mag_x` - **Float** that holds magnetometer data in X direction.

    * `mag_y` - **Float** that holds magnetometer data in Y direction.

    * `mag_Z` - **Float** that holds magnetometer data in Z direction.

    * `yaw` - **Float** that holds rotation data in vertical axis.

    * `pitch` - **Float** that holds rotation data in lateral axis.

    * `roll` - **Float** that holds rotation data in longitudinal axis.

    <div class="inline-bullet-fix" style="margin-top:15.6px;"/>

* `IMUSensor` - **Object** that contains the functions for getting data from the IMU.
  
    * `.Setup(MatrixIOBus)` - **Function** that takes `MatrixIOBus` object as parameter and sets that object as the bus to use for communicating with MATRIX device.

    * `.Read(PressureData)` **Function** that takes `HumidityData` object as a parameter and writes humidity sensor data to `HumidityData` object.

```language-cpp
// Create IMUData object
matrix_hal::IMUData imu_data;
// Create IMUSensor object
matrix_hal::IMUSensor imu_sensor;
// Specify the MatrixIOBus object that the IMUSensor object will use
imu_sensor.Setup(&bus);
```

The following code updates `IMUData` with the data from `IMUSensor`.

```language-cpp
// Overwrites IMUData object with new data
imu_sensor.Read(&imu_data);
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