<h2 style="padding-top:0">Inertial Measurement Unit (IMU)</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">

## Overview

The IMU driver reports values for:

* Yaw, Pitch, and Roll
* Acceleration for **x**, **y**, **z** axes
* Gyroscope for **x**, **y**, **z** axes
* Magnetometer for **x**, **y**, **z** axes

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20013
* `Keep-alive port`: 20014
* `Error port`: 20015
* `Data Update port`: 20016

## Protocol
<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts 2 configurations for communicating with the IMU driver. 

* `delay_between_updates` - controls the output speed of messages from the **Data Update port**. 

* `timeout_after_last_ping` - stops sending messages from the **Data Update port** if nothing has been sent to the **Keep-alive port** after the specified amount of seconds.

```language-protobuf
message DriverConfig {
  // Delay between updates in seconds
  float delay_between_updates = 1;
  // Timeout after last ping
  float timeout_after_last_ping = 2;
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto" target="_blank">here</a>.
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
This driver needs keep-alive messages in order to send data to your application. It's recommended to send an empty string `""` because the contents of a keep-alive message are never read.
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Applications can subscribe to this port to receive driver related errors.
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
Applications can subscribe to this port for IMU data. The output will be a serialized message of type `Imu` with the following information.
```language-protobuf
message Imu {
  //Vertical axis (yaw)
  float yaw = 1;

  //Lateral axis (pitch)
  float pitch = 2;

  //Longitudinal axis (roll)
  float roll = 3;

  // Acceleration
  float accel_x = 4;
  float accel_y = 5;
  float accel_z = 6;

  // Gyroscope
  float gyro_x = 7;
  float gyro_y = 8;
  float gyro_z = 9;

  // Magnetometer
  float mag_x = 10;
  float mag_y = 11;
  float mag_z = 12;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/sense.proto" target="_blank">here</a>.
</details>