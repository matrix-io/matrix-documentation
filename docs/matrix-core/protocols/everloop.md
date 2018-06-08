<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">
<img class="voice-compatibility-icon" src="/img/voice-icon.svg">

## Overview

The Everloop driver allows for:

* Reading amount of LEDs your MATRIX device has.
* Setting the RGBW colors for each individual LED.

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 20021
* `Keep-alive port`: 20022
* `Error port`: 20023
* `Data update port`: 20024

## Protocol

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts a single configuration for communicating with the Everloop driver. 

* `image` - the everloop configuration that's created from an `EverloopImage` message.

```language-protobuf
message DriverConfig {
  matrix_io.malos.v1.io.EverloopImage image = 3;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto" target="_blank">here</a>.

`EverloopImage` 

* `led` - Must hold the value for each LED on your MATRIX device. Each LED is defined as one `LedValue`.

```language-protobuf
// Value for an led that ranges from 0 to 255 for each color
message LedValue {
  uint32 red = 1;
  uint32 green = 2;
  uint32 blue = 3;
  uint32 white = 4;
}

// The led array.
message EverloopImage {
  repeated LedValue led = 1;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
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
Applications can subscribe to this port for Everloop data. The output will be a serialized message of type `EverloopImage` with the following information.

```language-protobuf
// The led array.
message EverloopImage {
  repeated LedValue led = 1;

  // Number of leds in the Everloop
  int32 everloop_length = 2;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
</details>