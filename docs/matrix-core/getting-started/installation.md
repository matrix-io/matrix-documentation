## Installation
```bash
# setup & installation
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install libzmq3-dev xc3sprog matrix-creator-openocd wiringpi cmake g++ git;
```

CORE should be running on next boot.

## Upgrades
If you need to upgrade your MATRIX CORE package at any time, please run the following commands and restart.
```bash
sudo apt-get update;
sudo apt-get upgrade;
sudo shutdown -r now;
```


### Starting manually
```
# MALOS runs as a service, but to stop it run:
sudo pkill -9 malos

# to run manually, just type `malos`
malos
```