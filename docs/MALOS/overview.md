## Matrix Abstraction Layer for OS

MALOS provides a [ZeroMQ](http://zeromq.org/) messaging layer. An intended target for this layer is [MATRIX OS](http://github.com/matrix-io/matrix-os).


## Installation
```
# setup & installation
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install -y libzmq3-dev xc3sprog malos-eye matrix-creator-malos matrix-creator-openocd wiringpi matrix-creator-init cmake g++ git --force-yes;
```

## Upgrades
If you need to upgrade your `malos` package at any time, please run the following commands and restart.
```
sudo apt-get update;
sudo apt-get upgrade;
sudo shutdown -r now;
```

You should something similar to this if everything is OK.
```
$ malos

**************
MALOS starting
**************

You can query specific driver info using port 20012.
Registered driver IMU with port 20013.
Registered driver Humidity with port 20017.
Registered driver Everloop with port 20021.
Registered driver Pressure with port 20025.
Registered driver UV with port 20029.
Registered driver ZigbeeBulb with port 20033.
Registered driver MicArray_Alsa with port 20037.
Registered driver Lirc with port 20041.
```

## Running MALOS as a background process.
```
$ malos > /dev/null 2>&1 &
```
### Demos
See [MALOS > Demos](../MALOS/example.md)