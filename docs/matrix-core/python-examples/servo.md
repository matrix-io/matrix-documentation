<h2 style="padding-top:0">Servo</h2>
<h4 style="padding-top:0">Python Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The Servo driver can set the angle of your servos through the pins of your MATRIX device.

**Device Pinouts**:

* [MATRIX Creator](/matrix-creator/resources/pinout.md)
* [MATRIX Voice](/matrix-voice/resources/pinout.md)

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20045
* `Error port`: 20047

## Code Example
The following sections show how to implement a connection to each of the Servo driver's ports. You can download this example <a href="https://github.com/matrix-io/matrix-core-examples/blob/master/python/servo.py" target="_blank">here</a>.

<!-- Initial Variables -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Python. We also define a few helpful variables for easy references.
```language-python
import os # Miscellaneous operating system interface
import zmq # Asynchronous messaging framework
import time # Time access and conversions
import sys # System-specific parameters and functions
import random # Generate pseudo-random numbers
from matrix_io.proto.malos.v1 import driver_pb2 # MATRIX Protocol Buffer driver library
from multiprocessing import Process # Allow for multiple processes at once
from zmq.eventloop import ioloop # Asynchronous events through ZMQ
matrix_ip = '127.0.0.1' # Local device ip
servo_port = 20045 # Driver Base port
# Handy function for connecting to the Error port 
from utils import register_error_callback
```
</details>

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our servo example goes. Once we connect to the **Base Port**, we will pass a configuration to the servo driver. With this we can choose the pin we want to edit and the angle to set for it. This example will send random numbers to any servo attached to pin 0. This example has a `moveServo()` function that calls itself to send random angles to your servo.

```language-python
def send_servo_command(pin):
    # Define zmq socket
    context = zmq.Context()
    # Create a Pusher socket
    socket = context.socket(zmq.PUSH)
    # Connect Pusher to configuration socket
    socket.connect('tcp://{0}:{1}'.format(matrix_ip, servo_port))

    # Create a new driver config
    servo_config = driver_pb2.DriverConfig()
    # Set a pin that the servo will operate on
    servo_config.servo.pin = pin

    # Function to change servo angle
    def moveServo(angle):
        # Log angle
        print('Angle: {0}'.format(angle))
        # Set the servo's angle in the config
        servo_config.servo.angle = angle
        # Serialize the config and send it to the driver
        socket.send(servo_config.SerializeToString())
        # Wait for 1 second
        time.sleep(1)
        # Run function again with random angle
        moveServo(random.randint(0, 180))

    # Initial moveServo call
    moveServo(180)
```
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
The **Error Port** connection is taken care of by the `utils import`. Below we define a function to be called and given any error messages that occur within MATRIX CORE.
```language-python
def servo_error_callback(error):
    # Log error
    print('{0}'.format(error))
```
</details>

<!-- Start Process -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Start Processes</summary>
This is where we begin the asynchronous events for each of the driver ports used and where we define the functions we want to use for each port.

```language-python
if __name__ == '__main__':
    # Initiate asynchronous events
    ioloop.install()
    # Start Error Port connection
    Process(target=register_error_callback, args=(servo_error_callback, matrix_ip, servo_port)).start()
    # Send Base Port configuration 
    try:
        send_servo_command(0)
    # Avoid logging servo angle errors on user quiting
    except KeyboardInterrupt:
        print(' quit')
```
</details>