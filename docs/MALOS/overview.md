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

MALOS should be running on next boot.

### Demos
See [MALOS > Demos](../MALOS/example.md)
