> Ensure you have [MATRIX CORE](core-installation.md) installed, before moving on.

## Installing Node.js
<img src="/matrix-core/img/nodejs-logo.png" width=400 />

This setup will go through how to install <a href="https://nodejs.org/en/" target="_blank">Node.js</a> and the dependencies needed to create a Node application that can communicate with MATRIX CORE.

Run the following commands on your MATRIX device(Raspberry Pi) to install <a href="https://github.com/creationix/nvm" target="_blank">Node Version Manager</a> which will then be used to install version `8.6` of Node.js.
> It is **strongly** recommended to use version `8.6` of Node.js
```language-bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install 8.6
```

<br/>
## Creating A Node.js Application
<h3 style="padding-top: 0">Making Your Project Directory</h3>
Use the following commands to initialize a Node project folder, in the home directory `~/` of your MATRIX device.
```language-bash
cd ~/
mkdir js-matrix-core-app
cd js-matrix-core-app
npm init
```

<h3 style="padding-top: 0">Installing npm Packages for ZMQ and Protocol Buffers</h3>
While staying inside your app folder, use the commands below to install the ZMQ and MATRIX Protocol Buffers npm packages. This allows you to interact with MATRIX Core through Node.js.
```language-bash
npm install zeromq --save
npm install matrix-protos --save
```

<br/>
## Check If Everything Works
<h3 style="padding-top: 0">Creating app.js</h3>
To ensure your installation has succeeded, create a file named app.js and paste the code below.

```language-javascript
// Set Initial Variables \\
var zmq = require('zeromq');// Asynchronous Messaging Framework
var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
var matrix_ip = '127.0.0.1';// Local IP
var matrix_everloop_base_port = 20021// Port for Everloop driver
var matrix_device_leds = 0;// Holds amount of LEDs on MATRIX device

// ERROR PORT \\
var errorSocket = zmq.socket('sub');// Create a Subscriber socket
errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_everloop_base_port + 2));// Connect Subscriber to Error port
errorSocket.subscribe('');// Subscribe to messages
// On Message
errorSocket.on('message', (error_message) => {
	console.log('Error received: ' + error_message.toString('utf8'));// Log error
});

// DATA UPDATE PORT \\
var updateSocket = zmq.socket('sub');// Create a Subscriber socket
updateSocket.connect('tcp://' + matrix_ip + ':' + (matrix_everloop_base_port + 3));// Connect Subscriber to Data Update port
updateSocket.subscribe('');// Subscribe to messages
// On Message
updateSocket.on('message', (buffer) => {
	var data = matrix_io.malos.v1.io.EverloopImage.decode(buffer);// Extract message
	matrix_device_leds = data.everloopLength;// Save MATRIX device LED count
});

// KEEP-ALIVE PORT \\
var pingSocket = zmq.socket('push');// Create a Pusher socket
pingSocket.connect('tcp://' + matrix_ip + ':' + (matrix_everloop_base_port + 1));// Connect Pusher to Keep-alive port
pingSocket.send('');// Send a single ping

// BASE PORT \\
var configSocket = zmq.socket('push');// Create a Pusher socket
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_everloop_base_port);// Connect Pusher to Base port

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

<h3 style="padding-top: 0">Running app.js</h3>
Once you have the app.js code copied, use the following command to run a simple hello world app.
```language-bash
node app.js
```
<h3 style="padding-top: 0">Result</h3>
![](/matrix-core/img/install-setup-test.gif)

## Next Steps
Now that everything is properly installed, learn more about the Everloop and other [Driver Protocols](../protocols) MATRIX Core has to offer, or view the available [Javascript examples](../javascript-examples).