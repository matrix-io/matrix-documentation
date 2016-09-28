## Support
* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)

## Installation
New parts of the MATRIX ecosystem are being developed and integrated every day. Here are a set of instructions which will get MATRIX OS running on your Creator. This will be streamlined in the future.

## Local Machine
1. Install your Creator onto an Raspberry Pi, connect to network cable which goes to local network, NOT to your computer, as it needs to be discoverable. Wifi support coming soon.
1. Discover your Pi's address with `arp -na | grep -i b8:27:eb`. In our case, our IP for this example is `192.168.0.15`, yours may be different.
1. SSH into your Pi. `ssh pi@192.168.0.15`
1. (Optional) Map ip to a host name in `/etc/hosts`.
```
echo '192.168.0.15 matrix' >> /etc/hosts
ssh pi@matrix
```

## Raspberry Pi
### Setup
SSH into your Creator and run the following:
```
# setup & installation
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install -y libzmq3-dev xc3sprog malos-eye matrix-creator-malos matrix-creator-openocd wiringpi matrix-creator-init cmake g++ git --force-yes;
```

This completes the Creator hardware setup.

### You can now explore the [Hardware Interfaces](intro/interfaces.md).

## MATRIX OS
### Installation
**NOTE:** MATRIX OS has a NodeJS dependency. Please Install NodeJS before installing MATRIX OS. For installation instructions you can go to the [NodeJS downloads page](https://nodejs.org/en/download/package-manager)  
```
# optional nodejs installation (example)
mkdir nodejs && cd nodejs
wget -c https://nodejs.org/dist/v4.5.0/node-v4.5.0-linux-armv7l.tar.xz
xz -d node-v4.5.0-linux-armv7l.tar.xz
tar xvf node-v4.5.0-linux-armv7l.tar
export PATH=/home/pi/nodejs/node-v4.5.0-linux-armv7l/bin:$PATH

# mandatory installation
git clone https://github.com/matrix-io/matrix-os.git;
cd matrix-os;
git submodule update --init;
npm install;
```

### Configuration

**NOTE:** Enable your camera on your Pi.
```
sudo raspi-config;
sudo reboot;
```

### Run Services

```
# currently needs to be run on every restart
sudo modprobe bcm2835-v4l2;
# before you run

malos_eye & malos 2>&1
```
## Local Machine
### Register Device

1. With [MATRIX CLI](https://github.com/matrix-io/matrix-cli) installed on your computer, run `matrix register device`.
1. Enter a `device name` and (optional) `device description`.
1. After a few moments you will be provided with a `MATRIX_DEVICE_ID` and `MATRIX_DEVICE_SECRET`.

```
# example variables generated via registration, you'll get your own
MATRIX_DEVICE_ID=dc7a1a71be2d
MATRIX_DEVICE_SECRET=08629018e9d793a7a10ea823ad15894da0c3616dec7aab85b4ecf1774505f0c665b29c660f06cd4f7e5544272b
```

## Raspberry Pi

### Set Up ENV Variables, USE device.

1. Add the above variables as environment variables via a shell script or command line on the Raspberry Pi.
1. (optional) We export envs via an `.env` file which can be processed using `source .env`
1. To begin targeting this device with the CLI, enter the `matrix use` command provided

### Run MATRIX OS

1. From the `matrix-os` folder. `node index.js`
1. If you want to start a MATRIX app on launch, use the env `START_APP`. ex. `START_APP=monitor node index.js`
1. Now you can issue commands and deploy apps to your MATRIX OS from the CLI. ( https://github.com/matrix-io/matrix-cli)
1. Have fun!
