> Ensure you have [MATRIX CORE](core-installation.md) installed, before moving on.

## Installing Golang
This setup will go through how to install <a href="https://golang.org/" target="_blank">Golang</a> and the dependencies needed to create a Go application that can communicate with MATRIX CORE. Run the following on your Raspberry Pi.

Before downloading Go, you'll need to make sure you have `git` installed.
```language-bash
sudo apt-get install git
```

With `wget` now installed, you can downlaod <a href="https://golang.org/dl/" target="_blank">Go v1.11.1</a>.
```language-bash
wget https://dl.google.com/go/go1.11.linux-armv6l.tar.gz
sudo tar -C /usr/local -xvzf go1.11.linux-armv6l.tar.gz
rm go1.11.linux-armv6l.tar.gz
```

Next, the `GOPATH` folder and Go environment variables need to be setup.
```language-bash
mkdir -p ~/go/{bin,src,pkg}
echo -e "\n##Golang Environment Variables##" | sudo tee -a /etc/profile
echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee -a /etc/profile
echo 'export GOBIN="$GOPATH/bin"' | sudo tee -a /etc/profile
echo 'export GOPATH=$HOME/go' | sudo tee -a /etc/profile
source /etc/profile
```

Go should now be properly installed on your Raspberry Pi! Run the command below to make sure it's properly installed. The output you should receive is `go version go1.11 linux/arm`.
```language-bash
go version
```


<br/>
## Installing ZMQ Dependency
Although ZMQ has already been installed, Go needs an extra dependency in order to utilize it.
```language-bash
sudo apt-get install libsodium-dev;
```


<br/>
## Creating A Go Application
<h3 style="padding-top: 0">Making Your Project Directory</h3>
Use the following commands to initialize a Go project folder, in the home directory `~/` of your MATRIX device.
```language-bash
cd ~/
mkdir go-matrix-core-app
cd go-matrix-core-app
go mod init go-matrix-core-app
```

<h3 style="padding-top: 0">Installing Go Packages for ZMQ and Protocol Buffers</h3>
While staying inside your app folder, use the commands below to install the ZMQ and MATRIX Protocol Buffers npm packages. This allows you to interact with MATRIX Core through Node.js.
```language-bash
go get github.com/pebbe/zmq4
go get github.com/matrix-io/matrix-protos-go
```

<br/>
## Check If Everything Works
<h3 style="padding-top: 0">Creating main.go</h3>
To ensure your installation has succeeded, create a file named main.go and paste the code below.

```language-go
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

<h3 style="padding-top: 0">Running main.go</h3>
Once you have the main.go code copied, use the following command to run a simple hello world app.
```language-bash
go run main.go
```
<h3 style="padding-top: 0">Result</h3>
![](/matrix-core/img/install-setup-test.gif)

## Next Steps
Now that everything is properly installed, learn more about the Everloop and other [Driver Protocols](../protocols) MATRIX Core has to offer, or view the available [Go examples](../go-examples).
