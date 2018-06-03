<h2 style="padding-top:0">General Purpose Input Output (GPIO)</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">
> MATRIX Voice compatibility in development.

## Overview

The GPIO driver on current version supports:<a 

* Pin input.
* Pin output.
* Updates for the current state of all GPIO pins.

**Device Pinouts**:

* [MATRIX Creator](/matrix-creator/resources/pinout.md)
* [MATRIX Voice](/matrix-voice/resources/pinout.md)

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20049
* `Keep-alive port`: 20050
* `Error port`: 20051
* `Data Update port`: 20052

## Protocol

<!-- Base PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts a single configuration for communicating with the Servo driver.

* `gpio` - the gpio configuration that's created from a `GpioParams` message.

```language-protobuf
message DriverConfig {
  // Gpio service configuration
  matrix_io.malos.v1.io.GpioParams gpio = 8;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto" target="_blank">here</a>.

`GpioParams`

* `pin` - Selects the pin you want to use on your MATRIX device. 

* `EnumMode` - Determines input or output mode for GPIO pins.

* `value` - Set as 1 or 0 to signify on/off.

```language-protobuf
// GPIO handler params
message GpioParams {
  // GPIO to config
  uint32 pin = 1;

  // GPIO mode input/output
  enum EnumMode {
    INPUT = 0;
    OUTPUT = 1;
  }
  EnumMode mode = 2;

  // GPIO value
  uint32 value = 3;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
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
Applications can subscribe to this port for GPIO data. The output will be a serialized message of type `GpioParams` with the following information.
```language-protobuf
// GPIO handler params
message GpioParams {
  // GPIO vector value
  uint32 values = 4;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
</details>