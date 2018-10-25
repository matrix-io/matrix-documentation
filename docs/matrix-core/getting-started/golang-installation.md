> Ensure you have [MATRIX CORE](core-installation.md) installed, before moving on.

## Installing Golang
This setup will go through how to install <a href="https://golang.org/" target="_blank">Golang</a> and the dependencies needed to create a Go application that can communicate with MATRIX CORE. Run the following on your Raspberry Pi.

Before downloading Go, you'll need to make sure you have `git` installed.
```language-bash
sudo apt-get install git
```

With `git` now installed, you can downlaod <a href="https://golang.org/dl/" target="_blank">Go v1.11.1</a>.
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
package main

// 20021
import (
	"fmt"
	"math/rand"
	"time"

	"github.com/golang/protobuf/proto"
	matrix "github.com/matrix-io/matrix-protos-go/matrix_io/malos/v1"
	zmq "github.com/pebbe/zmq4"
)

// Global Channel
var portStatus = make(chan string, 4)

// Global Vars
var everloop = matrix.EverloopImage{}

func main() {
	fmt.Println("Starting GO")

	// Asynchronously Call MATRIX CORE Ports
	go keepAlivePort()
	go errorPort()
	go dataUpdatePort()

	// Wait For Each Port Connection
	for portStatus := range portStatus {
		fmt.Println("received", portStatus)
	}
}

// BASE PORT \\
func basePort() {
	// Connect ZMQ Socket To MATRIX CORE
	pusher, _ := zmq.NewSocket(zmq.PUSH)    // Create A Pusher Socket
	pusher.Connect("tcp://127.0.0.1:20021") // Connect Pusher To Data Update Port

	// Notify That Port Is Ready
	portStatus <- "Base Port: CONNECTED"

	// Keep Sending Everloop Image
	for {
		// Reset Array
		everloop.Led = []*matrix.LedValue{}
		// Create x Amount Of Randomly Colored LEDs
		for i := int32(0); i < everloop.EverloopLength; i++ {
			led := matrix.LedValue{
				Red:   (uint32)(rand.Int31n(200) + 1),
				Green: (uint32)(rand.Int31n(255) + 1),
				Blue:  (uint32)(rand.Int31n(50) + 1),
				White: 0,
			}
			// Add New LED to Everloop LED Array
			everloop.Led = append(everloop.Led, &led)
		}

		// Create Everloop Driver Configuration Protocol
		configuration := matrix.DriverConfig{
			Image:                &everloop,
			TimeoutAfterLastPing: 6.0,
			DelayBetweenUpdates:  6.0,
		}
		//Encode Protocol Buffer
		var encodedConfiguration, _ = proto.Marshal(&configuration)
		// Send Protocol Buffer
		pusher.Send(string((encodedConfiguration)), 1)

		time.Sleep(50 * time.Millisecond) // Wait 2 Seconds
	}
}

// KEEP-ALIVE PORT \\
func keepAlivePort() {
	// Connect ZMQ Socket To MATRIX CORE
	pusher, _ := zmq.NewSocket(zmq.PUSH)    // Create A Pusher Socket
	pusher.Connect("tcp://127.0.0.1:20022") // Connect Pusher To Data Update Port

	// Notify That Port Is Ready
	portStatus <- "Keep-Alive Port: CONNECTED"

	// Keep Sending Keep Alive Message
	for everloop.EverloopLength <= 0 {
		fmt.Println("Sending Ping")
		pusher.Send("", 1)                  // Send Empty String
		time.Sleep(2000 * time.Millisecond) // Wait 2 Seconds
	}

	go basePort() // Send Configuration Message

}

// ERROR PORT \\
func errorPort() {
	// Connect ZMQ Socket To MATRIX CORE
	subscriber, _ := zmq.NewSocket(zmq.SUB)     // Create A Subscriber Socket
	subscriber.Connect("tcp://127.0.0.1:20023") // Connect Subscriber To Data Update Port
	subscriber.SetSubscribe("")                 // Subscribe To Data Update Port Messages

	// Notify That Port Is Ready
	portStatus <- "Error Port: CONNECTED"

	// Wait For Error
	for {
		// On Error
		message, _ := subscriber.Recv(2)
		// Print Error
		fmt.Println("ERROR:", message)
	}
}

// DATA UPDATE PORT \\
func dataUpdatePort() {
	// Connect ZMQ Socket To MATRIX CORE
	subscriber, _ := zmq.NewSocket(zmq.SUB)     // Create A Subscriber Socket
	subscriber.Connect("tcp://127.0.0.1:20024") // Connect Subscriber To Data Update Port
	subscriber.SetSubscribe("")                 // Subscribe To Data Update Port Messages

	// Notify That Port Is Ready
	portStatus <- "Data Update Port: CONNECTED"

	// Wait For Data
	for {
		// On Data
		message, _ := subscriber.Recv(2)
		// Decode Protocol Buffer
		proto.Unmarshal([]byte(message), &everloop)
		// Print Data
		fmt.Print("\nEverloop Length:", everloop.EverloopLength, "\n\n")
		// Close Data Update Port
		return
	}
}
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
