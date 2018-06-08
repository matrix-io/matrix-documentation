# LIRC

The LIRC driver on current version supports:

* IR send commands type `SEND_ONCE` for example: `SONY_XX BTN_MUTING`
* Multiple LIRC remote configurations concatenated via proto message. 

The driver follows the [CORE protocol](../index.md#protocol).

### LIRC driver software:

Actual CORE software layer use oficial LIRC `raspbian` package (0.9.0~pre1-1.2). The oficial documentation is for next version
but LIRC config files structure is the same. Please see it for details:

* [http://www.lirc.org/html/configuration-guide.html](http://www.lirc.org/html/configuration-guide.html))

### 0MQ Port
```
20041
```
### Protocol buffers

``` javascript
message LircParams {
  // IR remote device name
  string device = 1;

  // IR command
  string command = 2;

  //For transport of LIRC remote devices configuration.
  string config = 3;
}
```
The message is defined in [driver.proto](https://github.com/matrix-io/protocol-buffers/blob/master/malos/driver.proto).

### Keep-alives

This driver NOT needs keep-alive messages [as specified in the CORE protocol](https:////github.com/matrix-io/matrix-creator-malos/blob/master/README.md#keep-alive-port).

### Errors

This driver reports errors when an invalid configuration is sent.

### Write

This driver need at last one LIRC remote configuration for send IR commands to any device. CORE LIRC driver support multiple remote controls in the same file and you can use a previous remote control recorded. You will can download this remotes config from MATRIX assets repository and then send it via `config` field of `LircParams` protobuf. For more details plese see JavaScript example described below.

**Example for SONY RM-AAU014**:
[http://assets.admobilize.com/lirc-remotes/sony/RM-AAU014.lircd.conf]("http://assets.admobilize.com/lirc-remotes/sony/RM-AAU014.lircd.conf")

### Read

This driver doesn't any data using CORE protocol. It only executes commands and sets configurations.

This is a sample output given by the example described below.

``` bash
$ node test_ir_remote.js 

downloading remote config..done.
set remote to config..done.
sending IR command: BTN_MUTING to SONY_RM device..done.
sending IR command: BTN_MUTING to SONY_RM device..done.
sending IR command: BTN_MUTING to SONY_RM device..done.
```
`test_ir_remote` code first downloading remote config example then set it in CORE layer and then send IR commands


### JavaScript example

Enhanced description of the [sample source code](../src/js_test/test_ir_remote.js).

First, define the address of the MATRIX Creator. In this case we make it be `127.0.0.1`
because we are connecting from the local host but it needs to be different if we
connect from another computer. There is also the base port reserved by CORE for
the Pressure driver.

``` javascript
var creator_ip = '127.0.0.1'
var creator_pressure_base_port = 20013 + 28
```

#### Load the protocol buffers used in the example.

``` javascript
var protoBuf = require("protobufjs");
// parse proto file
var protoBuilder = protoBuf.loadProtoFile('../../protocol-buffers/malos/driver.proto')
// Parse matrix_malos package (namespace).
var matrixMalosBuilder = protoBuilder.build("matrix_malos")
```

#### Subscribe to the errors reported by the driver (optional)

``` javascript
var zmq = require('zmq')

var errorSocket = zmq.socket('sub')
errorSocket.connect('tcp://' + creator_ip + ':' + (creator_lirc_base_port + 2))
errorSocket.subscribe('')
errorSocket.on('message', function(error_message) {
  process.stdout.write('Message received: Pressure error: ' + error_message.toString('utf8') + "\n")
});
```

#### Downloading some remote control
CORE Lirc driver support multiple remote controls in the same file. You can use a previous remote control recorded
and downloading it from MATRIX assets repository like this:

``` javascript
var http = require('http');
var fs = require('fs');

var remote_url="http://assets.admobilize.com/lirc-remotes/sony/RM-AAU014.lircd.conf"
var remote_output="RM-AAU014.lircd.conf"

function download (url, dest, cb) {
  process.stdout.write('downloading remote config..')
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      console.log('done.')
      file.close(cb(dest));
    });
  });
}
download(remote_url,remote_output,configRemote)
```

#### Config remote device on CORE layer
All the drivers are configured using the message `driverconfig` (see [driver.proto](https://github.com/matrix-io/protocol-buffers/blob/master/malos/driver.proto)).

``` javascript
function configRemote(config){
  process.stdout.write('set remote to config..')
  // read previous config file downloaded
  fs.readFile(config, 'utf8', function (err,data) {
      if (err) { return console.log(err); }
      // build proto message
      var ir_cfg_cmd = new matrixMalosBuilder.LircParams
      ir_cfg_cmd.set_config(data)
      // send message in config proto
      sendIRConfigProto(ir_cfg_cmd) 
      console.log('done.')
  });
}

// Generic config proto function
function sendIRConfigProto(ir_cfg){
  var config = new matrixMalosBuilder.DriverConfig
  config.set_lirc(ir_cfg)
  configSocket.send(config.encode().toBuffer());
}
```
#### Send remote commands to target device

You can use similar flow for sending commands via DriverConfig proto.
``` javascript
function sendIrCommand(device, command) {
  // build LircParams proto message
  var ir_cfg_cmd = new matrixMalosBuilder.LircParams
  // set device target like SONY device
  ir_cfg_cmd.set_device(device)
  // set device command like BTN_MUTING
  ir_cfg_cmd.set_command(command)
  sendIRConfigProto(ir_cfg_cmd) 
}

// Optional sending continous IR commands
function continousSendRemoteCommand(){
  setInterval(function() {
    process.stdout.write('sending IR command: BTN_MUTING to SONY_RM device..')
    sendIrCommand('SONY_RM-AAU014','BTN_MUTING') // check LED on MATRIX
    console.log('done.')
  }, 3000);
}
```

