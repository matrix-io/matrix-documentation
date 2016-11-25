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

# Reboot!
sudo reboot;
```

#### MATRIX OS Setup

##### Installation
**NOTE:** MATRIX OS has a NodeJS dependency. Please Install NodeJS on your Pi before installing MATRIX OS.

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

##### Configure ENV variables

1. On the Pi, inside your `~` folder, create a file named `.envrc` with the variables from the Matrix CLI Setup above.  
```
# in .envrc file or place in ~/.bash_profile to auto configure
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```
1. `source .envrc` from `~` to make the variables available to the shell.

#### Run MATRIX OS
1. From the `matrix-os` folder. `NODE_ENV=rc node index.js`. While in alpha, we are running in our Release Candidate environment.

#### Returning to local computer
1. If you didn't do it earlier, `matrix use $deviceId`
1. Run `matrix`, verify you are on `rc` environment, your user is correct, and your selected device is correct.
1. Now you can issue commands and deploy apps to your MATRIX OS from the [MATRIX CLI](CLI/overview.md).
