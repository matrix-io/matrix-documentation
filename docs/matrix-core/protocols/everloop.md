<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">
<img class="voice-compatibility-icon" src="/img/voice-icon.svg">

## Overview
The Everloop driver controls the LED array of your MATRIX device. Each LED requires a value for Red, Green, Blue, and White (RGBW).

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20021

* `Error port`: 20023

## Usage
`LedValue` holds the RGBW color values for each LED. The values for each color must be in between the range of **0-255**.

`EveloopImage` holds each `LedValue` you defined. This message needs exactly 35 `LedValue` messages, in order to be accepted.
> The 35 LED message requirement will be changed in the future to better accommodate MATRIX Voice devices.

```language-protobuf
// RGBW values for a single LED
message LedValue {
  uint32 red = 1;
  uint32 green = 2;
  uint32 blue = 3;
  uint32 white = 4;
}

// Everloop image that will hold each LedValue
message EverloopImage {
  repeated LedValue led = 1;
}
```
The file for where this message is defined can be found <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/io.proto#L26" target="_blank">here</a>.