From https://github.com/matrix-io/matrix-os#alpha-installation-instructions

## Alpha Installation Instructions
New parts of the MATRIX ecosystem are being developed and integrated every day. Here are a set of instructions which will get MATRIX OS running on your Creator. This will be streamlined in the future.

#### Local Computer
1. Install your Creator onto an rPi, connect to network cable which goes to local network, NOT to your computer, as it needs to be discoverable. Wifi support coming soon.
1. Discover your rPi address with `arp -na | grep -i b8:27:eb`.
1. SSH into your rPi. `ssh pi@192.168.0.15`
1. (Optional) Map ip to a host name in `/etc/hosts`.
```
echo '192.168.0.15 matrix' >> /etc/hosts
ssh pi@matrix
```

#### Raspberry Pi
##### Setup
1. In one SSH session on your Creator run the following:
```
# setup & installation
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install -y xc3sprog malos-eye matrix-creator-openocd wiringpi matrix-creator-init cmake g++ git --force-yes;
git clone https://github.com/matrix-io/matrix-os.git;
cd matrix-os;
git submodule update --init;
npm install;

# configure - NOTE: This is interactive. Enable your camera
sudo raspi-config;


sudo reboot;
```
1. Be sure your camera was enabled in `raspi-config`

##### Run Services

1. In one SSH session, run `malos` - hardware interface
1. In another SSH session, run `malos_eye` - computer vision provider
```
# currently you need to run
sudo modprobe bcm2835-v4l2;
# before you run malos_eye
```

##### Register Device

1. With https://github.com/matrix-io/matrix-cli run ` matrix register device `
1. Enter a name and (optional) description
1. After a few moments you will be provided with a device ID and secret.
1. Add these as environment variables via a shell script or command line.
1. (optional) We export envs via an `.env` file which can be processed using `source .env`
1. To begin targeting this device with the CLI, enter the `matrix use` command provided

##### Run MATRIX OS
1. Ensure environment variables are set from above step.
1. From the `matrix-os` folder. `node index.js`
1. If you want to start a MATRIX app on launch, use the env `START_APP`. ex. `START_APP=monitor node index.js`
1. Read environment notes below.
1. Now you can issue commands and deploy apps to your MATRIX OS from the CLI. ( https://github.com/matrix-io/matrix-cli)
1. Have fun!
