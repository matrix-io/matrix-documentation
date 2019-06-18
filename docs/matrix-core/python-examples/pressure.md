<h2 style="padding-top:0">Pressure</h2>
<h4 style="padding-top:0">Python Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The Pressure driver reports values for:

* Pressure
* Altitude
* Temperature

>Based on component location, the temperature values from the [Humidity driver](./humidity) are recommended over the Pressure driver

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>
* `Base port`: 20025
* `Keep-alive port`: 20026
* `Error port`: 20027
* `Data Update port`: 20028

## Code Example
The following sections show how to implement a connection to each of the Pressure driver's ports. You can download this example <a href="https://github.com/matrix-io/matrix-core-examples/blob/master/python/pressure.py" target="_blank">here</a>.

<!-- Initial Variables -->
???+ info "Initial Variables"
    Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Python. We also define a few helpful variables for easy references.
    ```python
    import os # Miscellaneous operating system interface
    import zmq # Asynchronous messaging framework
    import time # Time access and conversions
    import sys # System-specific parameters and functions
    from matrix_io.proto.malos.v1 import driver_pb2 # MATRIX Protocol Buffer driver library
    from matrix_io.proto.malos.v1 import sense_pb2 # MATRIX Protocol Buffer sensor library
    from multiprocessing import Process # Allow for multiple processes at once
    from zmq.eventloop import ioloop # Asynchronous events through ZMQ
    matrix_ip = '127.0.0.1' # Local device ip
    pressure_port = 20025 # Driver Base port
    # Handy functions for connecting to the keep-Alive, Data Update, & Error port 
    from utils import driver_keep_alive, register_data_callback, register_error_callback
    ```

<!-- Base PORT -->
???+ info "Base Port"
    Here is where the configuration for our pressure example goes. Once we connect to the **Base Port**, we will pass a configuration to the pressure driver. With this we can set the update rate, timeout, and temperature configuration.
    ```python
    def config_socket():
        # Define zmq socket
        context = zmq.Context()
        # Create a Pusher socket
        socket = context.socket(zmq.PUSH)
        # Connect Pusher to configuration socket
        socket.connect('tcp://{0}:{1}'.format(matrix_ip, pressure_port))

        # Create a new driver config
        driver_config_proto = driver_pb2.DriverConfig()
        # Delay between updates in seconds
        driver_config_proto.delay_between_updates = 1.0
        # Timeout after last ping
        driver_config_proto.timeout_after_last_ping = 6.0

        # Send driver configuration through ZMQ socket
        socket.send(driver_config_proto.SerializeToString())
    ```

<!-- Keep-alive PORT -->
???+ info "Keep-alive Port"
    The next step is to connect and send a message to the **Keep-alive Port**. That message will grant us a response from the **Data Update Port** for the current pressure value. The `utils import` from the **Initial Variables** section takes care of this.

<!-- Error PORT -->
???+ info "Error Port"
    The **Error Port** connection is also taken care of by the `utils import`. Below we define a function to be called and given any error messages that occur within MATRIX CORE.
    ```python
    def pressure_error_callback(error):
        # Log error
        print('{0}'.format(error))
    ```

<!-- Data Update PORT -->
???+ info "Data Update Port"
    A connection to the **Data Update Port** will allow us to receive the current pressure data we want. The `utils import` takes care of this as well. We can define a function and expect pressure data to be passed to it.

    ```python
    def pressure_data_callback(data):
        # Extract data
        data = sense_pb2.Pressure().FromString(data[0])
        # Log data 
        print('{0}'.format(data))
    ```
    <h4>Data Output</h4>
    The Python object below is an example output you'll receive from the **Data Update Port**.
    ```python
    pressure: 101268.492188
    altitude: 4.81199979782
    temperature: 33.625
    ```

<!-- Start Process -->
???+ info "Start Processes"
    This is where we begin the asynchronous events for each of the driver ports and where we define the functions we want to use for each port.

    ```python
    if __name__ == '__main__':
        # Initiate asynchronous events
        ioloop.install()
        # Send Base Port configuration 
        config_socket()
        # Start Error Port connection
        Process(target=register_error_callback, args=(pressure_error_callback, matrix_ip, pressure_port)).start()
        # Start Data Update Port connection
        Process(target=register_data_callback, args=(pressure_data_callback, matrix_ip, pressure_port)).start()
        # Start Keep-alive Port connection
        Process(target=driver_keep_alive, args=(matrix_ip, pressure_port)).start()
    ```