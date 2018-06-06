<h2 style="padding-top:0">Servo</h2>
<h4 style="padding-top:0">Javascript Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">
> MATRIX Voice compatibility in development.

## Overview

The Servo driver can set the angle of your servos through the pins of your MATRIX device.

**Device Pinouts**:

* [MATRIX Creator](/matrix-creator/resources/pinout.md)
* [MATRIX Voice](/matrix-voice/resources/pinout.md)

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20045
* `Error port`: 20047

## Code Example
The following sections show how to implement a connection to each of the Servo driver's ports.

<!-- Initial Variables -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Javascript. We also define a few helpful variables for easy references.
```language-javascript
var zmq = require('zeromq');// Asynchronous Messaging Framework
var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
var matrix_ip = '127.0.0.1';// Local IP
var matrix_servo_base_port = 20045;// Port for Servo driver
```
</details>

<!-- Base PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our servo example goes. Once we connect to the **Base Port**, We will pass a configuration to the servo driver. With this we can choose the pin we want to edit and the angle to set for it. This example will send random numbers to any servo attached to pin 0.

```language-javascript
// Create a Pusher socket
var configSocket = zmq.socket('push');
// Connect Pusher to Base port
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_servo_base_port);
// Create driver configuration
var config = matrix_io.malos.v1.driver.DriverConfig.create({
  // Create servo configuration
  servo: matrix_io.malos.v1.io.ServoParams.create({
    pin: 0,// Use pin 0
    angle: 0// Set angle 0
  })
});
// Loop every second
setInterval(function(){
  // Pick number from 1-180
  var angle = Math.floor(Math.random() * 200)+1;
  // Set number as new random angle
  config.servo.angle = angle;
  // Log angle
  console.log(angle);
  // Send driver configuration
  configSocket.send(matrix_io.malos.v1.driver.DriverConfig.encode(config).finish());
}, 1000);
```
</details>

<!-- Error PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Connecting to the **Error Port** is optional, but highly recommended if you want to log any errors that occur within MATRIX CORE.
```language-javascript
// Create a Subscriber socket
var errorSocket = zmq.socket('sub');
// Connect Subscriber to Error port
errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_servo_base_port + 2));
// Connect Subscriber to Error port
errorSocket.subscribe('');
// On Message
errorSocket.on('message', function(error_message){
  console.log('Error received: ' + error_message.toString('utf8'));// Log error
});
```
</details>