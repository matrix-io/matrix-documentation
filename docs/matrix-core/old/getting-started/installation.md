
## Installation

```language-bash
# Add rep and key
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
# update & upgrade
sudo apt-get update;
sudo apt-get upgrade;
# install malos package
sudo apt-get install matrixio-malos
# reboot
sudo reboot
```

CORE should be running on next boot.

## Upgrades

If you need to upgrade your MATRIX CORE package at any time, please run the following commands and restart.

```language-bash
sudo apt-get update;
sudo apt-get upgrade;
sudo shutdown -r now;
```

## Start / Stop manually

CORE runs as a service after boot. If you need to stop it use:

```language-bash
sudo pkill -9 malos
```

To manually run it back again use:

```language-bash
malos &
```

The output will be similar to:

```language-bash
pi@raspberrypi:~ $ malos &
[1] 24343
pi@raspberrypi:~ $ **************
MALOS starting
**************

You can query specific driver info using port 20012.
Registered driver IMU with port 20013.
Registered driver Humidity with port 20017.
Registered driver Everloop with port 20021.
Registered driver Pressure with port 20025.
Registered driver UV with port 20029.
Registered driver MicArray_Alsa with port 20037.
Registered driver Servo with port 20045.
Registered driver Gpio with port 20049.

pi@raspberrypi:~ $
```

### Continue

1. Do [Hello World](./hello-world.md)
1. Try [JavaScript](../examples/jstests.md) or [Python](../examples/pytests.md) tests.
1. Write and run your own CORE-enabled software by using our [Reference](../reference/index.md) documentation.
