## Overview
MATRIX CORE functions by sending and receiving <a href="https://developers.google.com/protocol-buffers/" target="_blank">Protocol Buffers</a> over a <a href="http://zeromq.org/" target="_blank">ZeroMQ</a> connection. This can be used to query sensors and control any MATRIX device from any language that supports Protocol Buffers (version 3.X) and ZeroMQ. This is the basis for how the [MATRIX OS](/matrix-os/overview.md) layer can communicate with your MATRIX device. 

![](/matrix-core/img/core-flow.jpg)

## Ports & Protocol
MATRIX CORE contains drivers (components & sensors) that communicate with your MATRIX device. This occurs by having each driver send or receive Protocol Buffers over a ZeroMQ driver port. Depending on the driver port it may allow for **read-only**, **write-only** or **read-write**.

**Current Driver Base Ports:**

* `IMU` - **20013**
* `Humidity` - **20017**
* `Everloop` - **20021**
* `Pressure` - **20025**
* `UV` - **20029**
* `ZigbeeBulb` - **20033**
<!-- * `MicArray_Alsa` - **20037** -->
* `Servo` - **20045**
* `GPIO` - **20049**

Each driver reserves 4 ports beginning with their `base port` as shown above. The other 3 ports are in sequential order counting up from the `base port`. Below is an example of all IMU ports Note, not all drivers utilize every port.

**All IMU Ports**

* `IMU Base Port` - **20013**
* `IMU Keep-Alive Port` - **20014**
* `IMU Error Port` - **20015**
* `IMU Data Update Port` - **20016**

The following list contains the port types currently defined in MATRIX CORE.
<!-- BASE PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
The `base port` is used to configure a driver on your MATRIX device. This port is a `ZeroMQ PULL port` that accepts a configuration which is created as a protocol buffer.

To send a configuration you need to create a valid message for each driver. For example, the UV driver uses a configuration message to set the refresh rate and timeout for sending UV data.

Configuration messages are named `DriverConfig`. The file for where this is defined can be seen <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/io.proto" target="_blank">here</a>.

Below is an example for a UV configuration message:
```language-protobuf
message DriverConfig {
  // Delay between updates. In seconds.
  float delay_between_updates = 1;
  // Timeout after last ping.
  float timeout_after_last_ping = 2;
}
```

Once the `DriverConfig` message is filled out, it needs to be serialized as a string and sent to the ZeroMQ configuration port.
</details>
<!-- KEEP-ALIVE PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
`Port`: `base port` + 1

The Keep-alive port is a `ZeroMQ PULL port` that is required for certain drivers to keep their function alive. Drivers that are pushing data need this in place to let it know if data will continue to be requested. For example, the Everloop driver doesn't require Keep-alive messages, but the Humidity driver does. Any message that is sent to the Keep-alive port will be discarded, so an empty string `""` makes for a good Keep-alive message.

</details>
<!-- ERROR PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
`Port`: `base port` + 2

Programs can subscribe to this port to receive driver related errors. The Error port is a `ZeroMQ PUSH port` that will send you a string with any errors that it has encountered.
</details>
<!-- DATA UPDATE PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
`Port`: `base port` + 3

This `ZeroMQ PUSH port` is used by drivers that send data (Humidity, UV, etc.). Each driver uses a different message to report data to programs that subscribe for these updates.

To demonstrate, the UV driver will be used as an example. You can find the file <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/sense.proto">here</a>.
The message follows:

```language-protobuf
// Basic UV radiation lecture.
message UV{
  // UV index
  float uv_index = 1;
  // OMS risk
  string oms_risk = 2;
}
```

Applications that subscribe to UV driver updates will receive a string with serialized messages of type UV. Once received, the message needs to be deserialized by the application for the values can be used.

</details>

<br/>
## Next Steps

We currently provide libraries and examples for the following languages:

* [Javascript](javascript-installation.md)
* [Python](python-installation)

If you want to use another protocol buffer supported programming language then we suggest you view the <a href="https://developers.google.com/protocol-buffers/" target="_blank">Protocol Buffers Documentation</a> for the language you want to use in MATRIX CORE. Remember to use <a href="http://zeromq.org/" target="_blank">ZeroMQ</a> for sending these Protocol Buffers. You can view the protocols for each of our drivers [here](./../protocols).