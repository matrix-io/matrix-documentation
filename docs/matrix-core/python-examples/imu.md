<h2 style="padding-top:0">Inertial Measurement Unit (IMU)</h2>
<h4 style="padding-top:0">Python Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The IMU driver reports values for:

* Yaw, Pitch, and Roll
* Acceleration for **x**, **y**, **z** axes
* Gyroscope for **x**, **y**, **z** axes
* Magnetometer for **x**, **y**, **z** axes

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20013
* `Keep-alive port`: 20014
* `Error port`: 20015
* `Data Update port`: 20016

## Code Example
The following sections show how to implement a connection to each of the IMU driver's ports.

<!-- Initial Variables -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Python. We also define a few helpful variables for easy references.
```language-python
import os # Miscellaneous operating system interface
import zmq # Asynchronous messaging framework
import time # Time access and conversions
import sys # System-specific parameters and functions
from matrix_io.proto.malos.v1 import driver_pb2 # MATRIX Protocol Buffer driver library
from matrix_io.proto.malos.v1 import sense_pb2 # MATRIX Protocol Buffer sensor library
from multiprocessing import Process # Allow for multiple processes at once
from zmq.eventloop import ioloop # Asynchronous events through ZMQ
matrix_ip = '127.0.0.1' # Local device ip
imu_port = 20013 # Driver Base port
# Handy functions for connecting to the keep-Alive, Data Update, & Error port 
from utils import driver_keep_alive, register_data_callback, register_error_callback
```
</details>

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our IMU example goes. Once we connect to the **Base Port**, we will pass a configuration to the IMU driver. With this we can set the update rate, timeout, and temperature configuration.
```language-python
def config_socket():
    # Define zmq socket
    context = zmq.Context()
    # Create a Pusher socket
    socket = context.socket(zmq.PUSH)
    # Connect Pusher to configuration socket
    socket.connect('tcp://{0}:{1}'.format(matrix_ip, imu_port))

    # Create a new driver config
    driver_config_proto = driver_pb2.DriverConfig()
    # Delay between updates in seconds
    driver_config_proto.delay_between_updates = 0.05
    # Timeout after last ping
    driver_config_proto.timeout_after_last_ping = 6.0

    # Send driver configuration through ZMQ socket
    socket.send(driver_config_proto.SerializeToString())
```
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
The next step is to connect and send a message to the **Keep-alive Port**. That message will grant us a response from the **Data Update Port** for the current IMU value. The `utils import` from the **Initial Variables** section takes care of this.
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
The **Error Port** connection is also taken care of by the `utils import`. Below we define a function to be called and given any error messages that occur within MATRIX CORE.
```language-python
def imu_error_callback(error):
    # Log error
    print('{0}'.format(error))
```
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** will allow us to receive the current IMU data we want. The `utils import` takes care of this as well. We can define a function and expect IMU data to be passed to it.

```language-python
def imu_data_callback(data):
    # Extract data
    data = sense_pb2.Imu().FromString(data[0])
    # Log data 
    print('{0}'.format(data))
```
<h4>Data Output</h4>
The Python object below is an example output you'll receive from the **Data Update Port**.
```language-python
yaw: 151.336044312
roll: 0.174327388406
accel_y: 0.00300000002608
accel_z: 0.986000001431
gyro_x: 2.58599996567
gyro_y: 0.0289999991655
gyro_z: 0.84399998188
mag_x: 0.300000011921
mag_y: 0.16400000453
mag_z: -0.0780000016093
```
</details>

<!-- Start Process -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Start Processes</summary>
This is where we begin the asynchronous events for each of the driver ports and where we define the functions we want to use for each port.

```language-python
if __name__ == '__main__':
    # Initiate asynchronous events
    ioloop.install()
    # Send Base Port configuration 
    config_socket()
    # Start Error Port connection
    Process(target=register_error_callback, args=(imu_error_callback, matrix_ip, imu_port)).start()
    # Start Data Update Port connection
    Process(target=register_data_callback, args=(imu_data_callback, matrix_ip, imu_port)).start()
    # Start Keep-alive Port connection
    Process(target=driver_keep_alive, args=(matrix_ip, imu_port)).start()
```
</details>