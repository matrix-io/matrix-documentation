<h2 style="padding-top:0">Pressure</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The Pressure driver reports values for:

* Pressure
* Altitude
* Temperature

>Based on component location, the temperature values from the [Humidity driver](./humidity) are recommended over the Pressure driver

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20025
* `Keep-alive port`: 20026
* `Error port`: 20027
* `Data Update port`: 20028


## Protocol

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts 2 configurations for communicating with the Pressure driver. 

* `delay_between_updates` - controls the output speed of messages from the **Data Update port**. 

* `timeout_after_last_ping` - stops sending messages from the **Data Update port** if nothing has been sent to the **Keep-alive port** after the specified amount of seconds.

```protobuf
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
Applications can subscribe to this port for pressure data. The output will be a serialized message of type `Pressure` with the following information.
```protobuf
message Pressure {
  // Pressure
  float pressure = 1;

  // Altimeter
  float altitude = 2;

  // Temperature
  float temperature = 3;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/sense.proto" target="_blank">here</a>.
</details>
