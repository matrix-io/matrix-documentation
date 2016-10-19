## Support
* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)

## Installation

#### MATRIX CLI Setup
**Note:** Pre-requisite of [NodeJS](https://nodejs.org/en/download) on the client computer.

1. Install [MATRIX CLI](../CLI/overview.md) via npm `npm install -g matrix-cli`.
1. Target the proper environment `matrix set env rc`.
1. With MATRIX CLI installed on your computer, register an account with MATRIX via `matrix register`.
1. Once registered an account, run `matrix register device`.
1. Enter a `device name` and (optional) `device description`.
1. After a few moments you will be provided with a `MATRIX_DEVICE_ID` and `MATRIX_DEVICE_SECRET`.

```
# example variables generated via registration, yours will be different
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```

Save these for the Configure ENV Variables step, near the end.

#### Raspberry Pi Setup

1. To enjoy your new board you’ll need to set it up. First, you need to have Raspbian installed on your Raspberry Pi. If you don’t have it, you can [download](https://www.raspberrypi.org/downloads/raspbian/) it and [follow the instructions](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).
1. You'll also need to install [NodeJS](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) on your Raspberry Pi before you get started.
1. Basic understanding of Terminal. Via terminal, discover your Pi's address with `arp -na | grep -i b8:27:eb`. In our case, our IP for this example is `192.168.0.15`, yours may be different.

```
# setup & installation
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install -y libzmq3-dev xc3sprog malos-eye matrix-creator-malos matrix-creator-openocd wiringpi matrix-creator-init cmake g++ git --force-yes;

# Enable your camera on your Pi.
sudo raspi-config;
sudo reboot;
```

This completes the Creator hardware setup. This is all you need to begin using [MALOS](MALOS/overview.md) and [HAL](HAL/overview.md).
**Note**: You can also explore the [Hardware Interfaces](intro/interfaces.md).

#### MATRIX OS Setup

##### Installation
**NOTE:** MATRIX OS has a NodeJS dependency. Please Install NodeJS before installing MATRIX OS.

###### Node Installation Manual
Go to the [NodeJS downloads page](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
If the NodeJS installation fails, you might want to try a [Manual Installation](https://github.com/nodesource/distributions#debmanual) instead.

###### Node Installation Easy
```
# Install npm (doesn't really matter what version, apt-get node is v0.10...)
sudo apt-get install npm

# n is a node version manager
sudo npm install -g n

# node 6.5 is the latest target node version, also installs new npm
n 6.5
```

###### MatrixOS Installation
```
git clone https://github.com/matrix-io/matrix-os.git;
cd matrix-os;
git submodule update --init;
npm install;
```

###### MatrixOS Dependency upgrade
Run this if needed. Should be automatically upgraded.
```
npm upgrade matrix-firebase matrix-node-sdk matrix-app-config-helper
```

##### Run Services

```
# currently needs to be run on every restart
sudo modprobe bcm2835-v4l2;

# before you run
malos_eye & malos 2>&1
```

##### Configure ENV variables

1. On the Pi, inside your `~` folder, create a file named `.envrc` with the variables from the Matrix CLI Setup above.  
```
# in .envrc file
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```
1. `source .envrc` from `~` to make the variables available to the shell.
1. To begin targeting this device with the CLI, enter the `matrix use` command provided. `matrix use $deviceId`
1. If you `matrix`, you should see your deviceId selected.

#### Run MATRIX OS
1. From the `matrix-os` folder. `NODE_ENV=rc node index.js`. While in alpha, we are running in our Release Candidate environment.

1. You can issue commands and deploy apps to your MATRIX OS from the [MATRIX CLI](CLI/overview.md).

## Custom Raspbian Package
We'll be making a custom raspbian package available for download very soon!
