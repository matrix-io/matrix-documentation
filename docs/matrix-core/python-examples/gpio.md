<h2 style="padding-top:0">General Purpose Input Output (GPIO)</h2>
<h4 style="padding-top:0">Python Example</h4>

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
The following sections show how to implement a connection to each of the GPIO driver's ports. You can download this example <a href="https://github.com/matrix-io/matrix-core-examples/blob/master/python/gpio.py" target="_blank">here</a>.

<!-- Initial Variables -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Python. We also define a few helpful variables for easy references.
```python
import os # Miscellaneous operating system interface
import zmq # Asynchronous messaging framework
import time # Time access and conversions
import sys # System-specific parameters and functions
from matrix_io.proto.malos.v1 import driver_pb2 # MATRIX Protocol Buffer driver library
from matrix_io.proto.malos.v1 import io_pb2 # MATRIX Protocol Buffer sensor library
from multiprocessing import Process # Allow for multiple processes at once
from zmq.eventloop import ioloop # Asynchronous events through ZMQ
matrix_ip = '127.0.0.1' # Local device ip
gpio_port = 20049 # Driver Base port
# Handy functions for connecting to the keep-Alive, Data Update, & Error port 
from utils import driver_keep_alive, register_data_callback, register_error_callback
```
</details>

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our GPIO example goes. Once we connect to the **Base Port**, we will pass a configuration to the GPIO driver. With this, we can set the update rate, timeout, and pin configuration. This example will use `pin: 0` and **toggle the pin state between on&off** through a `toggle()` function.

> Each `pin` will save its last set `value` until the next device boot.

```python
# Define zmq socket
context = zmq.Context()
# Create a Pusher socket
socket = context.socket(zmq.PUSH)
# Connect Pusher to configuration socket
socket.connect('tcp://{0}:{1}'.format(matrix_ip, gpio_port))

# Configure GPIO update rates and timeout
def config_gpio_read():
    # Create a new driver config
    config = driver_pb2.DriverConfig()
    # Delay between updates in seconds
    config.delay_between_updates = 2.0
    # Timeout after last ping
    config.timeout_after_last_ping = 3.5
    # Send driver configuration through ZMQ socket
    socket.send(config.SerializeToString())

# Recursive function to toggle pin state
def config_gpio_write(pin, value):
    # Create a new driver config
    config = driver_pb2.DriverConfig()
    # set desired pin
    config.gpio.pin = pin
    # Set pin mode to output
    config.gpio.mode = io_pb2.GpioParams.OUTPUT
    # Set the output of the pin initially
    config.gpio.value = value%2
    # Send driver configuration through ZMQ socket
    socket.send(config.SerializeToString())

    # Wait 2 seconds
    time.sleep(2)
    # Increase value and run again
    value += 1
    config_gpio_write(0, value%2)
```
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
The next step is to connect and send a message to the **Keep-alive Port**. That message will grant us a response from the **Data Update Port** for the current GPIO values. The `utils import` from the **Initial Variables** section takes care of this.
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
The **Error Port** connection is also taken care of by the `utils import`. Below we define a function to be called and given any error messages that occur within MATRIX CORE.
```python
def gpio_error_callback(error):
    # Log error
    print('{0}'.format(error))
```
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** is then made to allow us to receive the current IMU data we want. The message received from the GPIO driver is converted into a 16 bit array, named `gpioValues` that represents each pin on your MATRIX device.

```python
def gpio_callback(msg):
    # Extract data
    data = io_pb2.GpioParams().FromString(msg[0])
    # Convert GPIO values to 16-bit
    gpioValues = ('{0:016b}'.format(data.values))
    # Reverse string for chronological order
    gpioValues = gpioValues[::-1]
    # Convert string into an array
    gpioValues = list(gpioValues)
    # Log GPIO pin states from gpioValues[0-15]
    print('GPIO PINS-->[0-15]\n{0}'.format(gpioValues))
```
<h4>Data Output</h4>
The Python object below is an example output you'll receive from the **Data Update Port**. For readability, the code above has converted the output as a 16-bit value and turned it into an array.
```python
values: 513
```
</details>

<!-- Start Process -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Start Processes</summary>
This is where we begin the asynchronous events for each of the driver ports and where we define the functions we want to use for each port.

```python
if __name__ == "__main__":
    # Initiate asynchronous events
    ioloop.install()
    # Start Error Port connection
    Process(target=register_error_callback, args=(gpio_error_callback, matrix_ip, gpio_port)).start()
    # Start Keep-alive Port connection
    Process(target=driver_keep_alive, args=(matrix_ip, gpio_port, 1)).start()
    # Start Data Update Port connection
    Process(target=register_data_callback, args=(gpio_callback, matrix_ip, gpio_port)).start()
    # Send Base Port configurations
    try:
        # Configure GPIO update and timeout
        config_gpio_read()
        # Toggle state of selected pin, start with pin on
        config_gpio_write(0, 1)
    # Avoid logging GPIO errors on user quiting
    except KeyboardInterrupt:
        print('quit')
```
</details>