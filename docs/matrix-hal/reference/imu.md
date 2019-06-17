<h2 style="padding-top:0">Inertial Measurement Unit (IMU)</h2>

### Device Compatibility

<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The IMU sensor reports values for:

- Yaw, Pitch, and Roll
- Acceleration for **x**, **y**, **z** axes
- Gyroscope for **x**, **y**, **z** axes
- Magnetometer for **x**, **y**, **z** axes

## References

Below is the overview of the IMU sensor implementation. Code example can be found [here](/matrix-hal/examples/imu).

These header files are required to use the IMU sensor.

```c++
// Interfaces with IMU sensor
#include "matrix_hal/imu_sensor.h"
// Holds data from IMU sensor
#include "matrix_hal/imu_data.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

<details markdown="1" open>
<summary style="font-size: 1.75rem; font-weight: 300;">IMUData</summary>
`IMUData` is a required **object** that contains the IMU sensor's supported data parameters.

```c++
// Create IMUData object
matrix_hal::IMUData imu_data;
```

The following code accesses the parameters of `IMUData`.

```c++
// Accelerometer
float accel_X = imu_data.accel_x;
float accel_Y = imu_data.accel_y;
float accel_Z = imu_data.accel_z;
// Gyroscope
float gyro_X = imu_data.gyro_x;
float gyro_Y = imu_data.gyro_y;
float gyro_Z = imu_data.gyro_z;
// Yaw, Pitch, Roll Output
float yaw = imu_data.yaw;
float pitch = imu_data.pitch;
float roll = imu_data.roll;
// Magnetometer
float mag_X = imu_data.mag_x;
float mag_Y = imu_data.mag_y;
float mag_Z = imu_data.mag_z; // Z-axis points upward
```

</details>

<details markdown="1" open>
<summary style="font-size: 1.75rem; font-weight: 300;">IMUSensor</summary>
`IMUSensor` is a required **object** that contains functions to interface with the IMU sensor.

```c++
// Create IMUSensor object
matrix_hal::IMUSensor imu_sensor;
```

The functions below are part of `IMUSensor`.

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.Setup</summary>
`Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device.

```c++
// Function declaration in header file
void Setup(MatrixIOBus *bus);
```
<!--  -->
```c++
// Set imu_sensor to use MatrixIOBus bus
imu_sensor.Setup(&bus);
```

</details>

<details markdown="1">
<summary style="font-size: 1.5rem; font-weight: 300;">.Read</summary>
`Read` is a **function** that takes an `IMUData` object as a parameter and writes the current IMU sensor data into the `IMUData` object.

```c++
// Function declaration in header file
bool Read(IMUData *data);
```
<!--  -->
```c++
// Overwrites imu_data with new data from IMU sensor
imu_sensor.Read(&imu_data);
```

</details>
</details>
