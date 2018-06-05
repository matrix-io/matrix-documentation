<h2 style="padding-top:0">Pressure</h2>
<h4 style="padding-top:0">Javascript Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">

## Overview

The Pressure driver reports values for:

* Pressure
* Altitude
* Temperature

>Based on component location, the temperature values from the [Humidity driver](./humidity) are recommended over the Pressure driver

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20025
* `Keep-alive port`: 20026
* `Error port`: 20027
* `Data Update port`: 20028


## Code Example
The following sections show how to implement a connection to each of the Pressure driver's ports.

<!-- Initial Variables -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Javascript. We also define a few helpful variables for easy references.
```language-javascript
var zmq = require('zeromq');// Asynchronous Messaging Framework
var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
var matrix_ip = '127.0.0.1';// Local IP
var matrix_pressure_base_port = 20025;// Port for Pressure driver
```
</details>

<!-- Base PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our Pressure example goes. Once we connect to the **Base Port**, We will pass a configuration to the pressure driver. With this we can set the update rate and timeout configuration.
```language-javascript
// Create a Pusher socket
var configSocket = zmq.socket('push');
// Connect Pusher to Base port
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_pressure_base_port);
// Create driver configuration
var config = matrix_io.malos.v1.driver.DriverConfig.create({
  // Update rate configuration
  delayBetweenUpdates: 2.0,// 2 seconds between updates
  timeoutAfterLastPing: 6.0,// Stop sending updates 6 seconds after pings.
});
// Send driver configuration
configSocket.send(matrix_io.malos.v1.driver.DriverConfig.encode(config).finish());
```
</details>

<!-- Keep-alive PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
The next step is to connect and send a message to the **Keep-alive Port**. That message, an empty string, will grant us a response from the **Data Update Port** for the current pressure value. An interval for pinging is then set to continuously obtain that data.
```language-javascript
// Create a Pusher socket
var pingSocket = zmq.socket('push');
// Connect Pusher to Keep-alive port
pingSocket.connect('tcp://' + matrix_ip + ':' + (matrix_pressure_base_port + 1));
// Send initial ping
pingSocket.send('');
// Send ping every 5 seconds
setInterval(function(){
  pingSocket.send('');
}, 5000);
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
errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_pressure_base_port + 2));
// Connect Subscriber to Error port
errorSocket.subscribe('');
// On Message
errorSocket.on('message', function(error_message){
    console.log('Error received: ' + error_message.toString('utf8'));// Log error
});
```
</details>

<!-- Data Update PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** will allow us to receive the current pressure data we want.

```language-javascript
// Create a Subscriber socket
var updateSocket = zmq.socket('sub');
// Connect Subscriber to Data Update port
updateSocket.connect('tcp://' + matrix_ip + ':' + (matrix_pressure_base_port + 3));
// Subscribe to messages
updateSocket.subscribe('');
// On Message
updateSocket.on('message', function(buffer){
  var data = matrix_io.malos.v1.sense.Pressure.decode(buffer);// Extract message
	console.log(data);// Log new pressure data
});
```
<h2>Data Output</h2>
The javascript object below is an example output you'll receive from the **Data Update Port**.
```language-javascript
{
  pressure: 101173.75,
  altitude: 12.812000274658203,
  temperature: 37.3120002746582 
}
```
</details>