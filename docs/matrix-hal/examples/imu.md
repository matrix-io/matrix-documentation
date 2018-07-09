<h2 style="padding-top:0">Inertial Measurement Unit (IMU)</h2>
<h4 style="padding-top:0">HAL Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The IMU sensor reports values for:

* Yaw, Pitch, and Roll
* Acceleration for **x**, **y**, **z** axes
* Gyroscope for **x**, **y**, **z** axes
* Magnetometer for **x**, **y**, **z** axes

## Code Example

Below is an example of how to interface with the IMU sensor in MATRIX HAL.

IMU sensor function references can be found [here](/matrix-hal/reference/imu).

The following section shows how to receive data from the IMU sensor. You can download this example <a href="https://raw.githubusercontent.com/matrix-io/matrix-hal-examples/master/sensors/imu_sensor.cpp" target="_blank">here</a>.

The command below will compile the example. Be sure to pass in your C++ file and desired output file.

```language-cpp
g++ -o YOUR_OUTPUT_FILE YOUR_CPP_FILE -std=c++11 -lmatrix_creator_hal
```

<details open>
<summary style="font-size: 1.5rem; font-weight: 300;">Include Statements</summary>
To begin working with the IMU sensor you need to include these header files.

```language-cpp
// System calls
#include <unistd.h>
// Input/output streams and functions
#include <iostream>

// Interfaces with IMU sensor
#include "matrix_hal/imu_sensor.h"
// Holds data from IMU sensor
#include "matrix_hal/imu_data.h"
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
Now we will create our `IMUData` and `IMUSensor` object and use it to receive data from the IMU sensor.

```language-cpp
  // The following code is part of main()
  
  // Create IMUData object
  matrix_hal::IMUData imu_data;
  // Create IMUSensor object
  matrix_hal::IMUSensor imu_sensor;
  // Set imu_sensor to use MatrixIOBus bus
  imu_sensor.Setup(&bus);

  // Endless loop
  while (true) {
    // Overwrites imu_data with new data from IMU sensor
    imu_sensor.Read(&imu_data);
    // Accelerometer Output
    float accel_X = imu_data.accel_x;
    float accel_Y = imu_data.accel_y;
    float accel_Z = imu_data.accel_z;
    // Gyroscope Output
    float gyro_X = imu_data.gyro_x;
    float gyro_Y = imu_data.gyro_y;
    float gyro_Z = imu_data.gyro_z;
    // Yaw, Pitch, Roll Output
    float yaw = imu_data.yaw;
    float pitch = imu_data.pitch;
    float roll = imu_data.roll;
    // Magnetometer Output
    float mag_X = imu_data.mag_x;
    float mag_Y = imu_data.mag_y;
    float mag_Z = imu_data.mag_z;  // Z-axis points upward
    // Clear console
    std::system("clear");
    // Output sensor data to console
    std::cout << " [ IMU Sensor Output ]" << std::endl;
    std::cout << " [ Acceleration In X : " << accel_X
              << " ] [ Acceleration In Y : " << accel_Y
              << " ] [ Acceleration In Z : " << accel_Z << " ]" << std::endl;
    std::cout << " [ Gyroscope In X : " << gyro_X
              << " ] [ Gyroscope In Y : " << gyro_X
              << " ] [ Gyroscope In Z : " << gyro_Z << " ]" << std::endl;
    std::cout << " [ Yaw : " << yaw << " ] [ Pitch : " << pitch
              << " ] [ Roll : " << roll << " ]" << std::endl;
    std::cout << " [ Magnetometer in X : " << mag_X
              << " ] [ Magnetometer in Y : " << mag_Y
              << " ] [ Magnetometer in Z : " << mag_Z << " ]" << std::endl;

    // Sleep for 20000 microseconds
    usleep(20000);
  }

  return 0;
}
```

</details>