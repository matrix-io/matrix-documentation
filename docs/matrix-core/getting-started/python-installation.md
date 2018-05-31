## Creating A Python Project
This setup will go through how to install all the necessary python packages needed to program with MATRIX CORE.

First, use the commands below to create a folder, inside in the home directory `~/` of your MATRIX device(Raspberry Pi). This will be where you'll put your python scripts.
```language-bash
cd ~/
mkdir python-matrix-core-app
cd python-matrix-core-app
```

<br/>
## Installing Python Packages

While inside your project directory, use the following commands to install all the necessary Python packages needed to interact with MATRIX CORE.
```language-bash
wget "https://github.com/matrix-io/matrix-creator-malos/blob/master/src/python_test/Pipfile" -O Pipfile
wget "https://github.com/matrix-io/matrix-creator-malos/blob/master/src/python_test/Pipfile.lock" -O Pipfile.lock
wget "https://raw.githubusercontent.com/matrix-io/matrix-creator-malos/master/src/python_test/requirements.txt" -O requirements.txt 
wget "https://raw.githubusercontent.com/matrix-io/matrix-creator-malos/master/src/python_test/utils.py" -O utils.py 
sudo apt-get install build-essential python-dev
pip install -r requirements.txt
```

<br/>
## Check If Everything Works
<h3 style="padding-top: 0">Creating app.py</h3>
To ensure your installation has succeeded, create a file named app.py and paste the code below.

```language-python
### Set Initial Variables ###
from random import randint
import time
import zmq # Asynchronous Messaging Framework
from zmq.eventloop import ioloop# Asynchronous event loop for ZMQ Sockets 
from multiprocessing import Process
from matrix_io.proto.malos.v1 import driver_pb2# Protocol Buffers for MATRIX functions
from matrix_io.proto.malos.v1 import io_pb2# Protocol Buffers for MATRIX functions
matrix_ip = '127.0.0.1'# Local IP
matrix_everloop_base_port = 2021# Port for Everloop drive

### Functions ###
def animation():
    # Endless Loop
    while True:
        ## Interacting With Everloop ZMQ Socket ##
        context = zmq.Context()# Grab zmq context
        config_socket = context.socket(zmq.PUSH) # Create a Pusher socket (to later send LED values)
        config_socket.connect('tcp://{0}:{1}'.format(matrix_ip, matrix_everloop_base_port)) # Connect Pusher to configuration socket (where LED values are sent)

        ## Create Eveloop Image ##
        image = []# Empty array to hold RGBW values for each LED

        # For each LED (currently required to send exactly 35)
        for led in range(35):
            ledValue = io_pb2.LedValue()
            ledValue.blue = randint(0, 50)
            ledValue.red = randint(0, 200)
            ledValue.green = randint(0, 255)
            ledValue.white = 0
            image.append(ledValue)

        ## Send Everloop Image ##
        config = driver_pb2.DriverConfig()# Create an empty MATRIX configuration
        config.image.led.extend(image) # Store the Everloop image in MATRIX configuration
        config_socket.send(config.SerializeToString())# Send MATRIX configuration through ZMQ socket

        # Wait 50 milliseconds before starting again 
        time.sleep(0.05)

### Main Function ###
if __name__ == '__main__':
    # non-blocking event loop for ZMQ Sockets 
    ioloop.install()
    # Start a non-blocking process for function animation
    Process(target=animation, args=()).start()
```

<h3 style="padding-top: 0">Running app.js</h3>
Once you have the app.js code copied, use the following command to run a simple hello world app.
```language-bash
python app.py
```
<h3 style="padding-top: 0">Result</h3>
![](/matrix-core/img/install-setup-test.gif)

## Next Steps
Now that everything is properly installed, learn more about the Everloop and other [Driver Protocols](../protocols) MATRIX Core has to offer, or view the available [Python examples](../python-examples).