## Package Installation

Welcome to the MATRIX Creator! To enjoy your new board you’ll need to set it up. First, you need to have Raspbian installed on your Raspberry Pi. If you don’t have it, you can [download](https://www.raspberrypi.org/downloads/raspbian/) it and [follow the instructions](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

Add the matrix package repository.
```
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list
```

Update the Package List.
```
sudo apt-get update
sudo apt-get install matrix-creator-init matrix-creator-malos cmake g++ git
```

Reboot the Raspberry Pi!

## Basic Examples

**Note:** For the following examples, the pre-requisite is NodeJS. Don't use the one shipped with raspbian because it's a bit old. If you don't have it, please check a recipe included below.
```
git clone https://github.com/matrix-io/matrix-creator-malos.git
cd src/js_test

// humidity, temperatre
node test_humidity.js 

// inertial measurement unit
node test_imu.js 

// pressure, altitude
node test_pressure.js 

// uv index, uv range
node test_uv.js
```