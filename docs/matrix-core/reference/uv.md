# UV

The UV driver reports values for:

* UV Index scale used in the United States conforms with international guidelines for UVI reporting established by the World Health Organization.  From <a href="https://www.epa.gov/sunsafety/uv-index-scale-0" target="_blank">UV Index Scale</a>
* UV Risk scale established by World Health Organization. From <a href="https://www.epa.gov/sunsafety/uv-index-scale-0" target="_blank">UV Index Scale</a>

The driver follows the [CORE protocol](../index.md#protocol).

### 0MQ Port
```
20029
```

### Protocol buffers

```language-protobuf
message UV{
  float uv_index = 1;
  string oms_risk = 2;
}
```

The message is defined in <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/sense.proto" target="_blank">driver.proto</a>

### Keep-alives

This driver needs keep-alive messages <a href="https:////github.com/matrix-io/matrix-creator-malos/blob/master/README.md#keep-alive-port" target="_blank">as specified in the CORE protocol</a>.
If you start sending keep-alive messages it will start returning data every second so you can omit the configuration for this device.


### Errors

This driver report errors when an invalid configuration is sent.

### Read

The driver will send a serialized message of type`UV`.

```language-protobuf
message UV{
  float uv_index = 1;
  string oms_risk = 2;
}
```

This is a sample output given by the example described below.

```language-bash
$ node test_uv.js 
Sending pings every 5 seconds
{ uv_index: 0, oms_risk: 'Low' }
{ uv_index: 0, oms_risk: 'Low' }
{ uv_index: 0, oms_risk: 'Low' }
{ uv_index: 0, oms_risk: 'Low' }
```

### JavaScript example

Enhanced description of the <a href="https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_uv.js" target="_blank">sample source code</a>.

First, define the address of the MATRIX Creator. In this case we make it be `127.0.0.1`
because we are connecting from the local host but it needs to be different if we
connect from another computer. There is also the base port reserved by CORE for
the UV driver.

```language-javascript
var creator_ip = '127.0.0.1'
var creator_uv_base_port = 20013 + (4 * 4) 
```

Load the protocol buffers used in the example.

```language-javascript
var protoBuf = require("protobufjs")

// Parse proto file
var protoBuilder = protoBuf.loadProtoFile('../../protocol-buffers/malos/driver.proto')
// Parse matrix_malos package (namespace).
var matrixMalosBuilder = protoBuilder.build("matrix_malos")
```

Subscribe to the errors reported by the driver. 

```language-javascript
var zmq = require('zmq')

var errorSocket = zmq.socket('sub')
errorSocket.connect('tcp://' + creator_ip + ':' + (creator_uv_base_port + 2))
errorSocket.subscribe('')
errorSocket.on('message', function(error_message) {
  process.stdout.write('Message received: UV error: ' + error_message.toString('utf8') + "\n")
});
```
All the drivers are configured using the message `DriverConfig` (see <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/sense.proto" target="_blank">driver.proto</a>).
This is what the message looks like if we omit the fields that are not used in this example.

```language-protobuf
message DriverConfig {
  float delay_between_updates = 1;
  float timeout_after_last_ping = 2;
}
```

The following snippet is telling the driver to send an update each 2 seconds
and stop sending updates if it doesn't receive a keep-alive message for 6 seconds.

```language-javascript
var configSocket = zmq.socket('push')
configSocket.connect('tcp://' + creator_ip + ':' + creator_uv_base_port)

var driverConfigProto = new matrixMalosBuilder.DriverConfig

driverConfigProto.delay_between_updates = 2.0
driverConfigProto.timeout_after_last_ping = 6.0

configSocket.send(driverConfigProto.encode().toBuffer())
```

Where is where the updates are received by subscribing to the `data update port` of the driver.
The subscription is initiated by the line `updateSocket.subscribe('')`.

```language-javascript
var updateSocket = zmq.socket('sub')
updateSocket.connect('tcp://' + creator_ip + ':' + (creator_uv_base_port + 3))
updateSocket.subscribe('')
updateSocket.on('message', function(buffer) {
  var data = new matrixMalosBuilder.UV.decode(buffer)
  console.log(data)
});
```
An empty keep-alive message is sent to the driver every 5 seconds to make sure it keeps
sending data updates.

```language-javascript
var pingSocket = zmq.socket('push')
pingSocket.connect('tcp://' + creator_ip + ':' + (creator_uv_base_port + 1))
process.stdout.write("Sending pings every 5 seconds");
pingSocket.send(''); // Ping the first time.
setInterval(function(){
  pingSocket.send('');
}, 5000);
```
