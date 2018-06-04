<h2 style="padding-top:0">Everloop</h2>
<h4 style="padding-top:0">Javascript Example</h4>


### Device Compatibility
<img class="creator-compatibility-icon" src="/img/creator-icon.svg">
<img class="voice-compatibility-icon" src="/img/voice-icon.svg">

## Overview

The Everloop driver allows for:

* Reading amount of LEDs your MATRIX device has.
* Setting the RGBW colors for each individual LED.

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 20021
* `Keep-alive port`: 20022
* `Error port`: 20023
* `Data update port`: 20024

## Code Example
The following sections show how to implement a connection to each of the Everloop driver's ports.

<!-- Initial Variables -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Javascript. We also define a few helpful variables for easy references.
```language-javascript
var zmq = require('zeromq');// Asynchronous Messaging Framework
var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
var matrix_ip = '127.0.0.1';// Local IP
var matrix_everloop_base_port = 20021;// Port for Everloop driver
var matrix_device_leds = 0;// Holds amount of LEDs on MATRIX device
```
</details>

<!-- Base PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the main logic for our Everloop example goes. Once we connect to the **Base Port**, the program will start an endless loop to create and send LED configurations with randomly generated RGBW values. However, before sending the LED configuration to you MATRIX device, it will wait until the amount of `matrix_device_leds` is defined.
```language-javascript
// Create a Pusher socket
var configSocket = zmq.socket('push');
// Connect Pusher to Base Port
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_everloop_base_port);

// Create an empty Everloop image
var image = matrix_io.malos.v1.io.EverloopImage.create();

// Loop every 50 milliseconds
setInterval(function(){
    // For each device LED
    for (var i = 0; i < matrix_device_leds; ++i) {
        // Set individual LED value
        image.led[i] = {
            red: Math.floor(Math.random() * 200)+1,
            green: Math.floor(Math.random() * 255)+1,
            blue: Math.floor(Math.random() * 50)+1,
            white: 0
        };
    }

    // Store the Everloop image in MATRIX configuration
    var config = matrix_io.malos.v1.driver.DriverConfig.create({
        'image': image
	});
	
    // Send MATRIX configuration to MATRIX device
    if(matrix_device_leds > 0)
        configSocket.send(matrix_io.malos.v1.driver.DriverConfig.encode(config).finish());
},50);
```
</details>

<!-- Keep-alive PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
The next step is to connect and send a message to the **Keep-alive Port**. That message, an empty string, will grant us a response from the **Data Update Port** with the value we need for `matrix_device_leds`.
```language-javascript
// Create a Pusher socket
var pingSocket = zmq.socket('push')
// Connect Pusher to Keep-alive port
pingSocket.connect('tcp://' + matrix_ip + ':' + (matrix_everloop_base_port + 1));
// Send a single ping
pingSocket.send('');
```
</details>

<!-- Error PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Connecting to the **Error Port** is optional, but highly recommended if you want to log any errors that occur with MATRIX CORE.
```language-javascript
// Create a Subscriber socket
var errorSocket = zmq.socket('sub');
// Connect Subscriber to Error port
errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_everloop_base_port + 2));
// Connect Subscriber to Error port
errorSocket.subscribe('');
// On Message
errorSocket.on('message', (error_message) => {
	console.log('Error received: ' + error_message.toString('utf8'));// Log error
});
```
</details>

<!-- Data Update PORT -->
<details>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** will allow us to receive the LED count we want for the `matrix_device_leds` variable. Once that variable is set, the MATRIX device will begin reading the Everloop images being sent to the base port.

```language-javascript
// Create a Subscriber socket
var updateSocket = zmq.socket('sub');
// Connect Subscriber to Data Update port
updateSocket.connect('tcp://' + matrix_ip + ':' + (matrix_everloop_base_port + 3));
// Subscribe to messages
updateSocket.subscribe('');
// On Message
updateSocket.on('message', (buffer) => {
	var data = matrix_io.malos.v1.io.EverloopImage.decode(buffer);// Extract message
	matrix_device_leds = data.everloopLength;// Save MATRIX device LED count
});
```
<h2>Data Output</h2>
The javascript object below is an example output you'll receive from the **Data Update Port**.
```language-javascript
{
  led: [],
  everloopLength: 35
}
```
</details>