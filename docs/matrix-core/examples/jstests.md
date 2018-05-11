## Javascript Example
> You need [NodeJS, and the Node Package Manager (npm)](https://nodejs.org/en/download/) installed on the Raspberry Pi.

CORE is the program that sits between the low level hardware layer and MATRIX OS. This program allows MATRIX OS to access the board hardware via ZeroMQ sockets. You can also use it directly, as it is done with the examples below. The IPs are hardcoded in the examples to 127.0.0.1. Remember to edit them if you're accessing the Creator from another host and not from the Raspberry itself.

For an in-depth discussion of these tests, please examine the [Reference](../reference/) sections for JavaScript details.

### On the Raspberry Pi

```language-bash
# Install npm (doesn't really matter what version, apt-get node is v0.10...)
sudo apt-get install npm

# n is a node version manager
sudo npm install -g n

# node 6.5 is the latest target node version, also installs new npm
n 6.5

# check version
node -v
```

## Download and Prepare CORE
```language-bash
git clone https://github.com/matrix-io/matrix-creator-malos;
cd matrix-creator-malos;
git submodule update --init;
cd src/js_test;
npm install;
```

# Using CORE
### CORE Examples
##### Connecting to CORE with NodeJS
**Note:** You'll need `protobufjs` and `zmq` npm packages, and protobuf as a submodule. See the [Everloop Example](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_everloop.js) for the full implementation of the code below.
```language-javascript
// This is how we connect to the creator. IP and port.
// The IP is the IP I'm using and you need to edit it.
// By default, CORE has its 0MQ ports open to the world.

// Every device is identified by a base port. Then the mapping works
// as follows:
// BasePort     => Configuration port. Used to config the device.
// BasePort + 1 => Keepalive port. Send pings to this port.
// BasePort + 2 => Error port. Receive errros from device.
// BasePort + 3 => Data port. Receive data from device.

var protoBuf = require("protobufjs");
var zmq = require('zmq');
var configSocket = zmq.socket('push')

var creator_ip = '127.0.0.1'
var creator_everloop_base_port = 20013 + 8 // port for Everloop driver.

// relative to where you have the protobufs
var protoBuilder = protoBuf.loadProtoFile('../../protocol-buffers/malos/driver.proto')

// malos interface
var matrixMalosBuilder = protoBuilder.build("matrix_malos")
configSocket.connect('tcp://' + creator_ip + ':' + creator_everloop_base_port /* config */)

...
```
##### Passing Commands to CORE
Below is an example of Node interfacing with the Everloop via CORE. See the [Everloop Example](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_everloop.js) for the full implementation of the code below.
```language-javascript
...

var max_intensity = 50
var intensity_value = max_intensity

function setEverloop() {
    var config = new matrixMalosBuilder.DriverConfig
    config.image = new matrixMalosBuilder.EverloopImage
    
    // Iteration over all 35 Everloop LEDs to turn them green.
    for (var j = 0; j < 35; ++j) {
      var ledValue = new matrixMalosBuilder.LedValue;

      // set brightness/intensity of the color for each rgb LED.
      ledValue.setRed(0);
      ledValue.setGreen(intensity_value);
      ledValue.setBlue(0);
      ledValue.setWhite(0);
      config.image.led.push(ledValue);
    }
    configSocket.send(config.encode().toBuffer());
}

setEverloop(intensity_value)
setInterval(function() {
  intensity_value -= 1
  if (intensity_value < 0)
    intensity_value = max_intensity
  setEverloop()
}, 10);
```

##### Reading from CORE

Below is a simple implementation via NodeJS to read a `humidity` from CORE via 0MQ. See [Humidity Example](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_humidity.js) for the full example.

```language-javascript
// Start configuration for refresh rate, and heartbeat timeouts
var configSocket = zmq.socket('push')
configSocket.connect('tcp://' + creator_ip + ':' + creator_humidity_base_port)
// Send driver configuration.
var driverConfigProto = new matrixMalosBuilder.DriverConfig
// 2 seconds between updates.
driverConfigProto.delay_between_updates = 2.0
// Stop sending updates 6 seconds after pings.
driverConfigProto.timeout_after_last_ping = 6.0
configSocket.send(driverConfigProto.encode().toBuffer())
// ********** End configuration.

// ********** Start updates - Here is where they are received.
var updateSocket = zmq.socket('sub')
updateSocket.connect('tcp://' + creator_ip + ':' + (creator_humidity_base_port + 3))
updateSocket.subscribe('')
updateSocket.on('message', function(buffer) {
  // read Humidity (or Pressure, Imu, UV, etc...) 
  var data = new matrixMalosBuilder.Humidity.decode(buffer)
  console.log(data)
});
// ********** End updates
```



### Drivers

```language-bash
node test_driver_info.js
```
### Everloop

```language-bash
node test_everloop.js
```
### Humidity

```language-bash
node test_humidity.js
```
### IMU

```language-bash
node test_imu.js
```
### IR Remote

```language-bash
node test_ir_remote.js
```
### Pressure

```language-bash
node test_pressure.js
```
### UV

```language-bash
node test_uv.js
```
### Zigbee Bulb On/Off

```language-bash
node test_zigbee_bulb.js
```
### Zigbee Bulb Color

```language-bash
node test_zigbee_color.js
```
### Zigbee Bulb Brightness

```language-bash
node test_zigbee_level.js
```
