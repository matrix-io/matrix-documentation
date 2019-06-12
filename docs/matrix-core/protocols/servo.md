<h2 style="padding-top:0">Servo</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The Servo driver can set the angle of your servos through the pins of your MATRIX device.

**Device Pinouts**:

* [MATRIX Creator](/matrix-creator/resources/pinout.md)
* [MATRIX Voice](/matrix-voice/resources/pinout.md)

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20045
* `Error port`: 20047

## Protocol

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts a single configuration for communicating with the Servo driver. 

* `servo` - the servo configuration that's created from a `ServoParams` message.

```protobuf
message DriverConfig {
  // ServoMotor service configuration
  matrix_io.malos.v1.io.ServoParams servo = 7;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto" target="_blank">here</a>.

`ServoParams`

* `pin` - Selects the pin you want to use on your MATRIX device. 

* `angle` - emits a signal input that represents the angle set.

```protobuf
// Servo handler params
message ServoParams {
  // Pin to configure
  uint32 pin = 1;

  // Servo angle
  uint32 angle = 2;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Applications can subscribe to this port to receive driver related errors.
</details>