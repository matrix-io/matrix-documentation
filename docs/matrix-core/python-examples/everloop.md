<h2 style="padding-top:0">Everloop</h2>
<h4 style="padding-top:0">Python Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

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
The following sections show how to implement a connection to each of the Everloop driver's ports. You can download this example <a href="https://github.com/matrix-io/matrix-core-examples/blob/master/python/everloop.py" target="_blank">here</a>.

<!-- Initial Variables -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Python. We also define a few helpful variables for easy references.
```python
import os # Miscellaneous operating system interface
import zmq # Asynchronous messaging framework
import time # Time access and conversions
from random import randint # Random numbers
import sys # System-specific parameters and functions
from matrix_io.proto.malos.v1 import driver_pb2 # MATRIX Protocol Buffer driver library
from matrix_io.proto.malos.v1 import io_pb2 # MATRIX Protocol Buffer sensor library
from multiprocessing import Process, Manager, Value # Allow for multiple processes at once
from zmq.eventloop import ioloop, zmqstream# Asynchronous events through ZMQ
matrix_ip = '127.0.0.1' # Local device ip
everloop_port = 20021 # Driver Base port
led_count = 0 # Amount of LEDs on MATRIX device
# Handy function for connecting to the Error port 
from utils import register_error_callback
```
</details>

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our Everloop example goes. Once we connect to the **Base Port**, we will pass a configuration to the Everloop driver. With this we can set the LED configuration. The `while True` loop is used to show how you can rapidly push different LED colors.
```python
def config_socket(ledCount):  
    # Define zmq socket
    context = zmq.Context()
    # Create a Pusher socket
    socket = context.socket(zmq.PUSH)
    # Connect Pusher to configuration socket
    socket.connect('tcp://{0}:{1}'.format(matrix_ip, everloop_port))

    # Loop forever
    while True:
        # Create a new driver config
        driver_config_proto = driver_pb2.DriverConfig()
        # Create an empty Everloop image
        image = []
        # For each device LED
        for led in range(ledCount):
            # Set individual LED value
            ledValue = io_pb2.LedValue()
            ledValue.blue = randint(0, 50)
            ledValue.red = randint(0, 200)
            ledValue.green = randint(0, 255)
            ledValue.white = 0
            image.append(ledValue)
        # Store the Everloop image in driver configuration
        driver_config_proto.image.led.extend(image)

        # Send driver configuration through ZMQ socket
        socket.send(driver_config_proto.SerializeToString())
        # Wait before restarting loop
        time.sleep(0.05)
```
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
The next step is to connect and send a message to the **Keep-alive Port**. That message will grant us a response from the **Data Update Port** for the current LED count of your MATRIX device. The code below will give only send one ping because LED count will not change.
```python
def ping_socket():
    # Define zmq socket
    context = zmq.Context()
    # Create a Pusher socket
    ping_socket = context.socket(zmq.PUSH)
    # Connect to the socket
    ping_socket.connect('tcp://{0}:{1}'.format(matrix_ip, everloop_port+1))
    # Send one ping
    ping_socket.send_string('')
```
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
The **Error Port** connection is taken care of by the `utils import`. Below we define a function to be called and given any error messages that occur within MATRIX CORE.
```python
def everloop_error_callback(error):
    # Log error
    print('{0}'.format(error))
```
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** will allow us to receive the current LED count on your MATRIX device. Once we connect to the port, the `updateLedCount` function will pass the LED count to a global variable and then close the connection the **Data-update Port**.

```python
def update_socket():
    # Define zmq socket
    context = zmq.Context()
    # Create a Subscriber socket
    socket = context.socket(zmq.SUB)
    # Connect to the Data Update port
    socket.connect('tcp://{0}:{1}'.format(matrix_ip, everloop_port+3))
    # Connect Subscriber to Error port
    socket.setsockopt(zmq.SUBSCRIBE, b'')
    # Create the stream to listen to data from port
    stream = zmqstream.ZMQStream(socket)

    # Function to update LED count and close connection to the Data Update Port
    def updateLedCount(data):
        # Extract data and pass into led_count global variable
        global led_count
        led_count = io_pb2.LedValue().FromString(data[0]).green
        # Log LEDs
        print('{0} LEDs counted'.format(led_count))
        # If LED count obtained
        if led_count > 0:
            # Close Data Update Port connection
            ioloop.IOLoop.instance().stop()
            print('LED count obtained. Disconnecting from data publisher {0}'.format(everloop_port+3))
    # Call updateLedCount() once data is received
    stream.on_recv(updateLedCount)

    # Log and begin event loop for ZMQ connection to Data Update Port
    print('Connected to data publisher with port {0}'.format(everloop_port+3))
    ioloop.IOLoop.instance().start()
```
<h4>Data Output</h4>
The Python object below is an example output you'll receive from the **Data Update Port**.
> The output name will be changed in a following update
```python
green: 18
```
</details>

<!-- Start Process -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Start Processes</summary>
This is where we begin the asynchronous events for each of the driver ports and where we define the functions we want to use for each port. This example is only using the **Error Port** connection asynchronously because the **Keep-alive Port** and **Data-update Port** are only used once.

```python
if __name__ == '__main__':
    # Initiate asynchronous events
    ioloop.install()
    # Start Error Port connection
    Process(target=register_error_callback, args=(everloop_error_callback, matrix_ip, everloop_port)).start()    
    # Ping the Keep-alive Port once
    ping_socket()
    # Start Data Update Port connection & close after response
    update_socket()
    # Send Base Port configuration
    try:
        config_socket(led_count)
    # Avoid logging Everloop errors on user quiting
    except KeyboardInterrupt:
        print(' quit')
```
</details>