From https://github.com/matrix-io/matrix-os#alpha-installation-instructions

## Alpha Installation Instructions
New parts of the MATRIX ecosystem are being developed and integrated every day. Here are a set of instructions which will get MATRIX OS running on your Creator. This will be streamlined in the future.

#### Local Computer
1. Install your Creator onto an rPi, connect to network cable which goes to local network, NOT to your computer, as it needs to be discoverable. Wifi support coming soon.
1. Discover your rPi address with `arp -na | grep -i b8:27:eb`.
1. SSH into your rPi. `ssh pi@192.168.0.15` Open 3 SSH sessions
1. (Optional) Map ip to a host name in `/etc/hosts`.
```
echo '192.168.0.15 matrix' >> /etc/hosts
ssh pi@matrix
```

#### On Raspberry Pi
1. In one SSH session on your Creator `echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list`
1. `apt-get update; apt-get upgrade;` - update apt-get with our packages
1. `sudo raspi-config` - enable camera
1. `sudo reboot` - reboot
1. `apt-get install git malos-eye matrix-creator-malos libzmq3-dev` - install hardware drivers
1. `git clone https://github.com/matrix-io/matrix-os.git` - install matrix os
1. `cd matrix-os; npm install` - setup
1. In one SSH session, run `malos` - hardware interface
1. In another SSH session, run `malos_eye` - computer vision provider
1. In the final SSH session, from the `matrix-os` folder. `node index.js`
1. If you want to start a MATRIX app on launch, use the env `START_APP`. ex. `START_APP=monitor node index.js`
1. Read environment notes below.
1. Now you can issue commands and deploy apps to your MATRIX OS from the CLI. ( https://github.com/matrix-io/matrix-cli)

### Environments
MATRIX OS and CLI run on top of several different environments, most users will want to select `production`, which will be selected by default. ( Note: While in alpha, MATRIX OS will default to `rc` )

`production` - stable releases ( do not use while in alpha )
`rc` - release candidate

These two share a dataset, so users and devices from one will be available on the other.

Change environment by setting `NODE_ENV`. ex. `NODE_ENV=rc node index.js`

From the CLI use `matrix set env rc`.

Make sure your device software and CLI are using the same environment.

#### Cutting Edge

`dev` - development environment

You will have to make a second account for this environment (use `matrix register`). Test out the newest features before they move to `rc`. You will have to recreate your devices here.
