<h2 style="padding-top:0">General Purpose Input Output (GPIO)</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">
> MATRIX Voice compatibility in development.

## Overview

The GPIO driver on current version supports:<a 

* GPIO pin input
* GPIO pin output
* GPIO updates (state from all pins)

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
This port accepts 2 configurations for communicating with the Servo driver. 

* `pin` - Selects the pin you want to use on your MATRIX device. 

* `angle` - Sets the angle

```language-protobuf
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
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Applications can subscribe to this port to receive driver related errors.
</details>