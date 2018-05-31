<h2 style="padding-top:0">Humidity</h2>
>**Humidity is currently under maintenance**

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">

## Overview

The Humidity driver reports values for:

* Relative Humidity on the Board 
* Temperature in Celsius
* Raw Values of temperature

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 20017
* `Keep-alive port`: 20017
* `Error port`: 20019
* `Data update port`: 20020

## Protocol

<!-- Base PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts a single configurations for communicating with the Humidity driver. 

* `current_temperature` - Selects the pin you want to use on your MATRIX device.

```language-protobuf
message HumidityParams{
  // Current temperature °C used for calibration.
  float current_temperature = 1;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/sense.proto" target="_blank">here</a>.
</details>

<!-- Keep-alive PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
This driver needs keep-alive messages in order to send data to your application. It's recommended to send an empty string `""` because the contents of a keep-alive message are never read.
</details>

<!-- Error PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Applications can subscribe to this port to receive driver related errors.
</details>

<!-- Data Update PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
Applications can subscribe to this port for humidity data. The output will be a serialized message of type `Humidity` with the following information.

```language-protobuf
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