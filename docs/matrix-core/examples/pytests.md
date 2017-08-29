# Python Examples

### Prerequisites

Make sure to have cloned the Python examples found below to your Raspberry Pi.
```
git clone https://github.com/matrix-io/matrix-creator-malos;
git submodule update --init;
cd matrix-creator-malos/src/python_test;
```

#### Python packages

Install the following python packages dependences via Terminal.
```
sudo apt-get install build-essential python-dev
pip install -r requirements.txt
```

If you're using [pipenv](https://github.com/kennethreitz/pipenv), then do the following:
```
# Install dependencies
pipenv install
```

#### MATRIX Creator software

Install CORE and perform device reboot. 

```
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install matrix-creator-init matrix-creator-malos cmake g++ git libzmq3-dev --no-install-recommends
reboot
```

### Test GPIO

``` bash
$ python test_gpio.py
GPIO15=0
GPIO15=1
GPIO15=0

```

If you're using [pipenv](https://github.com/kennethreitz/pipenv):
```
$ pipenv run python test_gpio.py
```

(on this example: pin 15 on write mode, toggle value 0 and 1)

## Python Test Files

### Driver_info

```
python test_driver_info.py
```

### Everloop

```
python test_everloop.py
```

### Everloop color


```
python test_set_everloop_color.py
```

### GPIO

```
python test_gpio.py
```

### GPIO Read & Write

```
python test_gpio_read_write.py
```

### Humidity

```
python test_humidity.py
```

### Imu

```
python test_imu.py
```

### IR

```
python test_ir_remote.py
```

### Pressure

```
python test_pressure.py
```

### Servo

```
python test_servo.py
```

### UV

```
python test_uv.py
```


#### GPIO python example

On this example, we will connect to CORE GPIO driver for controlling a single pin. GPIO driver on MATRIX creator supports:<a href="https://github.com/matrix-io/matrix-creator-malos/blob/master/docs/gpio_diagram.jpg"><img src="https://github.com/matrix-io/matrix-creator-malos/blob/master/docs/gpio_diagram.jpg" align="right" width="420" ></a>

* GPIO pin input
* GPIO pin output
* GPIO updates (state from all pins)

The CORE driver follows the [CORE protocol](../index.md).

----


#### GPIO Example details

Enhanced description of the [sample source code](./test_gpio.py).

First, define the address of the MATRIX Creator. In this case we make it be `127.0.0.1` because we are connecting from the local host. It will be your creator's IP address if you wish to run the python samples from a different computer, in such case you can `export CREATOR_IP=<ip>` variable, and the samples will connect to the specified host.

We also set the base port for the CORE Pressure driver (20013).

``` python
import zmq
import time
import driver_pb2 as driver_proto # proto buffer precompiled

# Either local host or the value you set in env var
creator_ip = os.environ.get('CREATOR_IP', '127.0.0.1')
creator_gpio_base_port = 20013 + 36

# connection to device
context = zmq.Context()
socket = context.socket(zmq.PUSH)
socket.connect('tcp://' + creator_ip + ':' + str(creator_gpio_base_port))

# instance for config driver message
config = driver_proto.DriverConfig()
config.gpio.pin = 15  # pin on board
config.gpio.mode = driver_proto.GpioParams.OUTPUT # pin mode OUTPUT/INPUT

while True:
    config.gpio.value ^= 1 # toggle value
    print ('GPIO'+str(config.gpio.pin)+'='+str(config.gpio.value))
    socket.send(config.SerializeToString()) # send proto message
    time.sleep(1)
```
### Advanced sample
MATRIX CORE layer uses ZMQ push/subscriptions to send driver configurations and to get driver updates. For more info see [CORE protocol](../index.md) driver details.

Enhanced description of the [sample source code](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/python_test/test_gpio_read_write.py).

``` python
import zmq
import time
import driver_pb2 as driver_proto
from  multiprocessing import Process
from zmq.eventloop import ioloop, zmqstream
ioloop.install()

# Either local host or the value you set in env var
creator_ip = os.environ.get('CREATOR_IP', '127.0.0.1')
creator_gpio_base_port = 20013 + 36

# setup GPIO pin to output mode and set gpio value
def config_gpio_write(pin,value):
    config = driver_proto.DriverConfig()
    config.gpio.pin = pin
    config.gpio.mode = driver_proto.GpioParams.OUTPUT
    config.gpio.value = value
    sconfig.send(config.SerializeToString())

# setup GPIO pin to input mode
def config_gpio_read(pin):
    config = driver_proto.DriverConfig()
    # 250 miliseconds between updates.
    config.delay_between_updates = 0.5
    # Stop sending updates 2 seconds after pings.
    config.timeout_after_last_ping = 3.5
    config.gpio.pin = pin
    config.gpio.mode = driver_proto.GpioParams.INPUT
    sconfig.send(config.SerializeToString())

# get complete GPIO register status. (all pines)
def gpio_callback(msg):
    print "Received gpio register: %s" % msg

# ZMQ subscription for driver notifications via gpio_callback
def register_gpio_callback():
    ssub = context.socket(zmq.SUB)
    ssub_port = str(creator_gpio_base_port+3)
    ssub.connect('tcp://' + creator_ip + ':' + ssub_port)
    ssub.setsockopt(zmq.SUBSCRIBE,"")
    stream = zmqstream.ZMQStream(ssub)
    stream.on_recv(gpio_callback)
    print "Connected to publisher with port %s" % ssub_port
    ioloop.IOLoop.instance().start()
    print "Worker has stopped processing messages."

# toggle 0/1 on GPIO pin output
def task_gpio_write(pin):
    pin_value = 0
    while True:
        pin_value ^= 1
        config_gpio_write(pin,pin_value)
        print ('GPIO:'+str(pin)+' => '+str(pin_value))
        time.sleep(1)

# request notifications to driver
def task_driver_ping():
    context = zmq.Context()
    sping = context.socket(zmq.PUSH)
    sping.connect('tcp://' + creator_ip + ':' + str(creator_gpio_base_port + 1))
    while True:
        sping.send('')
        time.sleep(1)

if __name__ == "__main__":
    # ZMQ initialization and build socket config
    context = zmq.Context()
    sconfig = context.socket(zmq.PUSH)
    sconfig.connect('tcp://' + creator_ip + ':' + str(creator_gpio_base_port))

    config_gpio_write(0,0) # pin 0 in output mode, value 0
    config_gpio_read(1)    # pin 1 in input mode

    # register async tasks
    Process(target = task_gpio_write, args = (0, )).start()
    Process(target = task_driver_ping).start()

    register_gpio_callback()
```

----

## CORE Driver details

### 0MQ Port
```
20049
```
### Protocol buffers

``` javascript
// GPIO handler params
message GpioParams {
  // GPIO to config
  uint32 pin = 1;

  // GPIO mode input/output
  enum EnumMode {
    INPUT = 0;
    OUTPUT = 1;
  }
  EnumMode mode = 2;

  // GPIO value
  uint32 value = 3;

  // GPIO all values
  uint32 values = 4;
}
```
The message is defined in [driver.proto](https://github.com/matrix-io/protocol-buffers/blob/master/malos/driver.proto).

### Keep-alives

This driver needs keep-alive messages [as specified in the CORE protocol](https:////github.com/matrix-io/matrix-creator-malos/blob/master/README.md#keep-alive-port).
If you start sending keep-alive messages it will start returning data every second so you can omit the configuration for this device.


### Errors

This driver reports errors when an invalid configuration is sent.


### Write

All pins on matrix creator start as inputs. For change to outputs the driver need message for each pin on OUTPUT mode.


### Read

The driver will send a serialized message of integer *values* which reprensets of state from all GPIO pins [see figure 1](https://github.com/matrix-io/matrix-creator-malos/blob/av/doc_gpio/docs/gpio_diagram.jpg). For example: *values=5* represents *101* (pin 0 on 1, pin 1 on 0 and pin 2 on 1).