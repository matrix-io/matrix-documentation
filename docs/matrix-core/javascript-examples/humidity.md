<h2 style="padding-top:0">Humidity</h2>
<h4 style="padding-top:0">Javascript Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The Humidity driver allows for:

* Reading relative humidity on the board
* Obtaining temperature in Celsius and raw values
* Calibrating temperature

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 20017
* `Keep-alive port`: 20018
* `Error port`: 20019
* `Data update port`: 20020

## Code Example
The following sections show how to implement a connection to each of the Humidity driver's ports. You can download this example <a href="https://github.com/matrix-io/matrix-core-examples/blob/master/javascript/humidity.js" target="_blank">here</a>.

<!-- Initial Variables -->
???+ info "Initial Variables"
    Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Javascript. We also define a few helpful variables for easy references.
    ```javascript
    var zmq = require('zeromq');// Asynchronous Messaging Framework
    var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
    var matrix_ip = '127.0.0.1';// Local IP
    var matrix_humidity_base_port = 20017;// Port for Humidity driver
    ```

<!-- Base PORT -->
???+ info "Base Port"
    Here is where the configuration for our Humidity example goes. Once we connect to the **Base Port**, we will pass a configuration to the humidity driver. With this we can set the update rate, timeout, and temperature configuration.
    ```javascript
    // Create a Pusher socket
    var configSocket = zmq.socket('push');
    // Connect Pusher to Base port
    configSocket.connect('tcp://' + matrix_ip + ':' + matrix_humidity_base_port);
    // Create driver configuration
    var config = matrix_io.malos.v1.driver.DriverConfig.create({
        // Update rate configuration
        delayBetweenUpdates: 2.0,// 2 seconds between updates
        timeoutAfterLastPing: 6.0,// Stop sending updates 6 seconds after pings.
        // Humidity configuration
        humidity: matrix_io.malos.v1.sense.HumidityParams.create({
        currentTemperature: 23// Real current temperature [Celsius] for calibration 
        })
    });
    // Send driver configuration
    configSocket.send(matrix_io.malos.v1.driver.DriverConfig.encode(config).finish());
    ```

<!-- Keep-alive PORT -->
???+ info "Keep-alive Port"
    The next step is to connect and send a message to the **Keep-alive Port**. That message, an empty string, will grant us a response from the **Data Update Port** for the current humidity value. An interval for pinging is then set to continuously obtain that data.
    ```javascript
    // Create a Pusher socket
    var pingSocket = zmq.socket('push');
    // Connect Pusher to Keep-alive port
    pingSocket.connect('tcp://' + matrix_ip + ':' + (matrix_humidity_base_port + 1));
    // Send initial ping
    pingSocket.send('');
    // Send ping every 5 seconds
    setInterval(function(){
        pingSocket.send('');
    }, 5000);
    ```

<!-- Error PORT -->
???+ info "Error Port"
    Connecting to the **Error Port** is optional, but highly recommended if you want to log any errors that occur within MATRIX CORE.
    ```javascript
    // Create a Subscriber socket
    var errorSocket = zmq.socket('sub');
    // Connect Subscriber to Error port
    errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_humidity_base_port + 2));
    // Connect Subscriber to Error port
    errorSocket.subscribe('');
    // On Message
    errorSocket.on('message', function(error_message){
    console.log('Error received: ' + error_message.toString('utf8'));// Log error
    });
    ```

<!-- Data Update PORT -->
???+ info "Data Update Port"
    A connection to the **Data Update Port** will allow us to receive the current humidity data we want.

    ```javascript
    // Create a Subscriber socket
    var updateSocket = zmq.socket('sub');
    // Connect Subscriber to Data Update port
    updateSocket.connect('tcp://' + matrix_ip + ':' + (matrix_humidity_base_port + 3));
    // Subscribe to messages
    updateSocket.subscribe('');
    // On Message
    updateSocket.on('message', function(buffer){
    var data = matrix_io.malos.v1.sense.Humidity.decode(buffer);// Extract message
        console.log(data);// Log new humidity data
    });
    ```
    <h4>Data Output</h4>
    The javascript object below is an example output you'll receive from the **Data Update Port**.
    ```javascript
    {
    humidity: 29.003999710083008,
    temperature: 22.998397827148438,
    temperatureRaw: 33.124000549316406,
    temperatureIsCalibrated: true 
    }
    ```