### Installation

#### Install from package 

If you haven't already installed the required MATRIX packages that configure everything after each boot, please install:

```
# Add repo and key
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list

# Update packages and install
sudo apt-get update
sudo apt-get upgrade

# Installation
sudo apt-get install matrixio-creator-init libmatrixio-creator-hal libmatrixio-creator-hal-dev

# Reboot after installation
sudo reboot
```

#### Install from source

##### Install Pre-Requisites

```
sudo apt-get install cmake g++ git libfftw3-dev wiringpi libgflags-dev
```

##### Clone and Build

To start working with HAL directly, you'll need to clone it and then build it. 

```
git clone https://github.com/matrix-io/matrix-creator-hal.git
mkdir build
cd build
cmake ..
make && sudo make install
```

### Continue
1. Do [Hello World](./hello-world.md)
1. Try out the [hardware demos](../examples/hardware-demos.md) available inside the `demos` directory.
1. Write and run your own HAL abstraction layer by using our [Component](../components/) documentation.
