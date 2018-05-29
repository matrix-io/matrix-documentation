## Overview
MATRIX CORE functions by sending and receiving <a href="https://developers.google.com/protocol-buffers/" target="_blank">Protocol Buffers</a> over a <a href="http://zeromq.org/" target="_blank">ZeroMQ</a> connection. This can be used to query sensors and control any MATRIX Device from any language that supports Protocol Buffers(version 3.X) and ZeroMQ. This is the basis for how the [MATRIX Open System](/matrix-os/overview.md) layer can communicate with your MATRIX device. 

<br/>
## Protocol

![](/matrix-core/img/core-flow.png)

CORE contains drivers(components & sensors) that communicate with your MATRIX device. This occurs by having each driver sending or receiving Protocol Buffers over a ZeroMQ port. Driver ports allow for **read-only**, **write-only** or **read-write modes**.

**Current Drivers:**

* `IMU` - **20013**
* `Humidity` - **20017**
* `Everloop` - **20021**
* `Pressure` - **20025**
* `UV` - **20029**
* `ZigbeeBulb` - **20033**
* `MicArray_Alsa` - **20037**
* `Lirc` - **20041**

Above is a list of each driver's `base port`. Each driver reserves 3 extra ports, counting up from their `base port`.

<br/>
## Ports
The following list contains the port types in CORE that are currently defined.
<!-- BASE PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base port</summary>
The `base port` is used to configure a driver on your MATRIX device. This port is a `ZeroMQ PULL port` that accepts a configuration which is created as a protocol buffer.

To send a configuration you need to send a valid message for the given driver. For example, the Everloop driver (LED array) uses a configuration message to set the LEDs for your MATRIX device.
That configuration message is named `EverloopImage` and it requires 35 instances of the `LEDValue` message added to it. The file for where this is defined can be seen <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/io.proto#L26" target="_blank">here</a>.
The message follows:

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

Once `EverloopImage` message is filled out, it needs to be serialized as a string and sent to the 0MQ configuration port. The LEDs will then be configured to the colors that were defined in `EverloopImage`.
</details>
<!-- KEEP-ALIVE PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive port</summary>
`Port`: `base port` + 1

The Keep-alive port is a `ZeroMQ PUSH port` that is required for certain drivers to keep their function alive. Drivers that are pushing data need this in place to let it know if data will continue to be requested. For example, the Everloop driver doesn't require Keep-alive messages, but the Humidity driver does.

Drivers that need Keep-alive messages can be configured using the message that is used for all the configurations. All that's needed is to set the relevant field along with any other driver specific configurations needed. The file can be seen <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto#L33" target="_blank">here</a>.
The message follows:

```language-protobuf
message DriverConfig {
  // Delay between updates. In seconds.
  float delay_between_updates = 1;
  // Timeout after last ping.
  float timeout_after_last_ping = 2;

  // Other fields Omitted For Readability...
}
```
Keep in mind, the field `timeout_after_last_ping` defaults to 5 seconds if no value is set. If a driver doesn't receive a Keep-alive message after the specified seconds, it will stop sending updates.

Also, any message that is sent to the Keep-alive port will be discarded, so an empty string `""` makes for a good keep-alive message.

</details>
<!-- ERROR PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Error port</summary>
`Port`: `base port` + 2

Programs can subscribe to this port to receive driver related errors. The Error port is a `ZeroMQ PUSH port` that will send you a string of any errors that it has encountered.
</details>
<!-- DATA UPDATE PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Data update port</summary>
`Port`: `base port` + 3

This `ZeroMQ PUSH port` is used by drivers that send data (Humidity, UV, etc..). Each driver uses a different message to report data to programs that subscribe for these updates.

To demonstrate, the UV driver will be used as an example. You can find the file <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/sense.proto#L52">here</a>.
The message follows:

```language-protobuf
// Basic UV radiation lecture.
message UV{
  // UV index
  float uv_index = 1;
  // 
  string oms_risk = 2;
}
```

Applications that subscribe to UV driver updates will receive a string with serialized messages of type UV. Once received, the message needs to be deserialized by the application for the values can be used.

</details>

<br/>
## Next Steps
Learn to setup a programming language for communicating with CORE. Currently we have tutorials for the following languages:

* [Javascript](javascript-installation.md)
* [Python](python-installation)