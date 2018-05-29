## Installing Node.js
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
npm install zmq --save
npm install matrix-protos --save
```

<br/>
## Check If Everything Works
<h3 style="padding-top: 0">Creating app.js</h3>
To ensure your installation has succeeded, create a file named app.js and paste the code below.

```language-javascript
// Set Initial Variables \\
var zmq = require('zmq');// Asynchronous Messaging Framework
var matrix_io = require('matrix-protos').matrix_io;// Protocol Buffers for MATRIX function
var matrix_ip = '127.0.0.1';// Local IP
var matrix_everloop_base_port = 2021// Port for Everloop driver

// Interact With Everloop ZMQ Socket \\
var configSocket = zmq.socket('push');// Create a Pusher socket (to later send LED values)
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_everloop_base_port);// Connect Pusher to configuration socket (where LED values are sent)

// Create an empty Everloop image array
var image = matrix_io.malos.v1.io.EverloopImage.create();

// Loop every 50 milliseconds
setInterval(function(){
    // For each LED (currently required to send exactly 35)
    for (var i = 0; i < 35; ++i) {
        // Set individual LED value
        image.led[i] = {
            red: Math.floor(Math.random() * 200)+1,
            green: Math.floor(Math.random() * 255)+1,
            blue: Math.floor(Math.random() * 50)+1,
            white:0
        };
    }
  
    // Store the Everloop image in MATRIX configuration
    var config = matrix_io.malos.v1.driver.DriverConfig.create({
        'image': image
    });

    // Send MATRIX configuration to MATRIX device
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
Now that everything is properly installed, learn more about the Everloop and other Protocols MATRIX Core has to offer, or view more Javascript examples.

* [Javascript Examples](../Javascript-examples)
* [MATRIX CORE Protocols](../protocols)