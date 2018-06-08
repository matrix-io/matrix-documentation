<h2 style="padding-top:0">General Purpose Input Output (GPIO)</h2>
<h4 style="padding-top:0">Javascript Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The GPIO driver supports:

* Reading pin input
* Setting pin output

**Device Pinouts**:

* [MATRIX Creator](/matrix-creator/resources/pinout.md)
* [MATRIX Voice](/matrix-voice/resources/pinout.md)

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20049
* `Keep-alive port`: 20050
* `Error port`: 20051
* `Data Update port`: 20052

## Code Example
The following sections show how to implement a connection to each of the GPIO driver's ports.

<!-- Initial Variables -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Javascript. We also define a few helpful variables for easy references.
```language-javascript
var zmq = require('zeromq');// Asynchronous Messaging Framework
var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
var matrix_ip = '127.0.0.1';// Local IP
var matrix_gpio_base_port = 20049;// Port for GPIO driver
var counter = 1;// Counter for gpio value toggle 
```
</details>

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our GPIO example goes. Once we connect to the **Base Port**, We will pass a configuration to the GPIO driver. With this, we can set the update rate, timeout, and pin configuration. This example will use `pin: 0` and use a function toggle the pin state between on&off.

> Each `pin` will save its last set `value` until the next device boot.

```language-javascript
// Create a Pusher socket
var configSocket = zmq.socket('push');
// Connect Pusher to Base port
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_gpio_base_port);

//Create driver configuration
var outputConfig = matrix_io.malos.v1.driver.DriverConfig.create({
  // Update rate configuration
  delayBetweenUpdates: 2.0,// 2 seconds between updates
  timeoutAfterLastPing: 6.0,// Stop sending updates 6 seconds after pings.
  //GPIO Configuration
  gpio: matrix_io.malos.v1.io.GpioParams.create({
    pin: 0,// Use pin 0
    mode: matrix_io.malos.v1.io.GpioParams.EnumMode.OUTPUT,// Set as output mode
    value: 0// Set initial pin value as off
  })
});

//Function to toggle gpio value to 0 or 1
function toggle(){
  outputConfig.gpio.value = counter%2;// Set pin value as 1 or 0
  counter++;// increase counter
  // Send MATRIX configuration to MATRIX device
  configSocket.send(matrix_io.malos.v1.driver.DriverConfig.encode(outputConfig).finish());
}
```
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
The next step is to connect and send a message to the **Keep-alive Port**. That message, an empty string, will grant us a response from the **Data Update Port** for the current GPIO pin values. An interval for pinging is then set to continuously obtain that data. The, previously defined, toggle function is also called to swap the pin state after a ping.
```language-javascript
// Create a Pusher socket
var pingSocket = zmq.socket('push');
// Connect Pusher to Keep-alive port
pingSocket.connect('tcp://' + matrix_ip + ':' + (matrix_gpio_base_port + 1));
// Send initial ping
pingSocket.send('');
// Send ping & toggle pin value every 2 seconds
setInterval(function(){
  pingSocket.send('');// Send ping
  toggle();// Change pin value
}, 2000);
```
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Connecting to the **Error Port** is optional, but highly recommended if you want to log any errors that occur within MATRIX CORE.
```language-javascript
// Create a Subscriber socket
var errorSocket = zmq.socket('sub');
// Connect Subscriber to Error port
errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_gpio_base_port + 2));
// Connect Subscriber to Error port
errorSocket.subscribe('');
// On Message
errorSocket.on('message', function(error_message){
  console.log('Error received: ' + error_message.toString('utf8'));// Log error
});
```
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** is then made to allow us to receive the current IMU data we want. The message received from the GPIO driver is converted into a 16 bit array, named `gpioValues` that represents each pin on your MATRIX device.

```language-javascript
// Create a Subscriber socket
var updateSocket = zmq.socket('sub');
// Connect Subscriber to Data Update port
updateSocket.connect('tcp://' + matrix_ip + ':' + (matrix_gpio_base_port + 3));
// Subscribe to messages
updateSocket.subscribe('');
// On Message
updateSocket.on('message', function(buffer){
  // Extract message
  var data = matrix_io.malos.v1.io.GpioParams.decode(buffer);
  // String value to represent all GPIO pins as off
  var zeroPadding = '0000000000000000';
  // Remove padding to make room for GPIO values
  var gpioValues = zeroPadding.slice(0, zeroPadding.length - data.values.toString(2).length);
  // Convert GPIO values to 16-bit and add to string
  gpioValues = gpioValues.concat(data.values.toString(2));
  // Convert string to chronologically ordered array
  gpioValues = gpioValues.split("").reverse();
  // Log GPIO pin states from gpioValues[0-15]
  console.log('GPIO PINS-->[0-15]\n'+'['+gpioValues.toString()+']');
});
```
<h4>Data Output</h4>
The Javascript object below is an example output you'll receive from the **Data Update Port**. For readability, the code above has converted the output as a 16-bit value and turned it into an array.
```language-javascript
{
  values: 513
}
```
</details>