# Pressure

The Pressure driver reports values for:

* Pressure
* Altitude
* Temperature

The driver follows the [MATRIX CORE protocol](../index.md#protocol).

### 0MQ Port
```
20025
```

### Protocol buffers

```
message Pressure {
  float pressure = 1;
  float altitude = 2;
  float temperature = 3;
}
```

The message is defined in [driver.proto](https://github.com/matrix-io/protocol-buffers/blob/master/malos/driver.proto).

### Keep-alives

This driver needs keep-alive messages [as specified in the MATRIX CORE protocol](https://github.com/matrix-io/matrix-creator-malos/blob/master/README.md#keep-alive-port).
If you start sending keep-alive messages it will start returning data every second so you can omit the configuration for this device.


### Errors

This driver report errors when an invalid configuration is sent.

### Read

The driver will send a serialized message of type `Pressure`.

```
message Pressure {
  float pressure = 1;
  float altitude = 2;
  float temperature = 3;
}
```

This is a sample output given by the example described below.

```
$ node test_pressure.js 
Sending pings every 5 seconds
{ pressure: 74773.5, altitude: 2490.375, temperature: 35.9375 }
{ pressure: 74776, altitude: 2490.3125, temperature: 35.9375 }
```

### JavaScript example

Enhanced description of the [sample source code](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_pressure.js).

First, define the address of the MATRIX Creator. In this case we make it be `127.0.0.1`
because we are connecting from the local host but it needs to be different if we
connect from another computer. There is also the base port reserved by MATRIX CORE for
the Pressure driver.

```
var creator_ip = '127.0.0.1'
var creator_pressure_base_port = 20013 + (4 * 3)
```

Load the protocol buffers used in the example.

```
var protoBuf = require("protobufjs")

// Parse proto file
var protoBuilder = protoBuf.loadProtoFile('../../protocol-buffers/malos/driver.proto')
// Parse MATRIX matrix_CORE package (namespace).
var matrixMalosBuilder = protoBuilder.build("matrix_malos")
```

Subscribe to the errors reported by the driver. 

```
var zmq = require('zmq')

var errorSocket = zmq.socket('sub')
errorSocket.connect('tcp://' + creator_ip + ':' + (creator_pressure_base_port + 2))
errorSocket.subscribe('')
errorSocket.on('message', function(error_message) {
  process.stdout.write('Message received: Pressure error: ' + error_message.toString('utf8') + "\n")
});
```
All the drivers are configured using the message `DriverConfig` (see [driver.proto](https://github.com/matrix-io/protocol-buffers/blob/master/malos/driver.proto)).
This is what the message looks like if we omit the fields that are not used in this example.

    message DriverConfig {
      float delay_between_updates = 1;
      float timeout_after_last_ping = 2;
    }

The following snippet is telling the driver to send an update each 2 seconds
and stop sending updates if it doesn't receive a keep-alive message for 6 seconds.

```
var configSocket = zmq.socket('push')
configSocket.connect('tcp://' + creator_ip + ':' + creator_pressure_base_port)

var driverConfigProto = new matrixMalosBuilder.DriverConfig

driverConfigProto.delay_between_updates = 2.0
driverConfigProto.timeout_after_last_ping = 6.0

configSocket.send(driverConfigProto.encode().toBuffer())
```

Where is where the updates are received by subscribing to the `data update port` of the driver.
The subscription is initiated by the line `updateSocket.subscribe('')`.

```
var updateSocket = zmq.socket('sub')
updateSocket.connect('tcp://' + creator_ip + ':' + (creator_pressure_base_port + 3))
updateSocket.subscribe('')
updateSocket.on('message', function(buffer) {
  var data = new matrixMalosBuilder.Pressure.decode(buffer)
  console.log(data)
});
```
An empty keep-alive message is sent to the driver every 5 seconds to make sure it keeps
sending data updates.

```
var pingSocket = zmq.socket('push')
pingSocket.connect('tcp://' + creator_ip + ':' + (creator_pressure_base_port + 1))
process.stdout.write("Sending pings every 5 seconds");
pingSocket.send(''); // Ping the first time.
setInterval(function(){
  pingSocket.send('');
}, 5000);
```
