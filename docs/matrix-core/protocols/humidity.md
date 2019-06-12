<h2 style="padding-top:0">Humidity</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The Humidity driver allows for:

* Reading relative humidity on the board
* Obtaining temperature in Celsius and raw values
* Calibrating temperature

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 20017
* `Keep-alive port`: 20018
* `Error port`: 20019
* `Data update port`: 20020

## Protocol

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts three configurations for communicating with the Humidity driver. 

* `delay_between_updates` - controls the output speed of messages from the **Data Update port**. 

* `timeout_after_last_ping` - stops sending messages from the **Data Update port** if nothing has been sent to the **Keep-alive port** after the specified amount of seconds.

* `humidity` - the humidity configuration that's created from a `HumidityParams` message.

```protobuf
message DriverConfig {
  // Delay between updates in seconds
  float delay_between_updates = 1;
  // Timeout after last ping
  float timeout_after_last_ping = 2;
  // Humidity configuration
  matrix_io.malos.v1.sense.HumidityParams humidity = 9;
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto" target="_blank">here</a>.

`HumidityParams`

* `current_temperature` - a reference of the current temperature for calibration.

```protobuf
message HumidityParams{
  // Current temperature Celsius used for calibration.
  float current_temperature = 1;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/sense.proto" target="_blank">here</a>.
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
Applications can subscribe to this port for humidity data. The output will be a serialized message of type `Humidity` with the following information.

```protobuf
message Humidity {
  // Humidity
  float humidity = 1;

  // Temperature
  float temperature = 2;

  // Raw temperature value from the sensor
  float temperature_raw = 3;

  //  Flag that tells if the temperature is calibrated
  bool temperature_is_calibrated = 4;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/sense.proto" target="_blank">here</a>.
</details>