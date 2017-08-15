## Installation
```
# setup & installation
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install -y libzmq3-dev xc3sprog malos-eye matrix-creator-malos matrix-creator-openocd wiringpi matrix-creator-init cmake g++ git --force-yes;
```

CORE should be running on next boot.

## Upgrades
If you need to upgrade your MATRIX CORE package at any time, please run the following commands and restart.
```
sudo apt-get update;
sudo apt-get upgrade;
sudo shutdown -r now;
```