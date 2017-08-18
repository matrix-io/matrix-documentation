
## Installation

Your MATRIX device will have MATRIX OS preinstalled on it. These instructions are included if you want to build your own MOS image.

MATRIX OS is currently targeted to run on Raspbian. 

### Raspberry Pi Setup
Start with a [clean Raspbian install](https://www.raspberrypi.org/downloads/raspbian/).

When complete, start your Raspberry Pi and get to a device command prompt. 

This command installs the MATRIX Open Source platform and configures your MATRIX Creator:

```
curl https://raw.githubusercontent.com/matrix-io/matrix-creator-quickstart/master/install.sh | sh
```

### CLI Setup

These next instructions can be executed via your Raspberry Pi or on a local computer. We would recommend NOT installing the CLI on the Raspberry Pi.

```
You need Node installed on your machine to continue
```
1. Install [MATRIX CLI](../overview/cli.md) via npm `npm install -g matrix-cli`
1. If you do not have a MATRIX Labs account, register via `matrix register`

### Register a Device
1. Log into your account using `matrix login`
1. Once registered an account, run `matrix register device`
1. Enter a `device name` and (optional) `device description`
1. After a few moments you will be provided with a `MATRIX_DEVICE_ID` and `MATRIX_DEVICE_SECRET`
1. Select your device using `matrix use `, and enter your device name or device ID. Other commands, like `install`, `start`, and `ping`, require a device to be selected for targeting the command.

```
# example variables generated via registration, yours will be different
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```

**Note 1:** Save these for the Configure ENV Variables step, near the end.

**Note 2:** [Watch Getting Started, Registration and Installation](https://www.youtube.com/watch?v=ckDD6HEjfAY) of MATRIX OS and MATRIX CLI on Youtube.

### Configuring MOS on the Pi

These instructions should be executed on the Pi.

1. Inside your home folder (`~`), create a file named `.envrc` with the variables from the [Matrix CLI Setup above](/#local-machine-setup)
1. Run `source ~/.envrc` to make the variables available to the shell, which will then be used when starting MOS.
1. Go to `matrix-os` folder with `cd ~/matrix-os` and run `node index.js` to start the OS.

### Check if everything works
1. If you didn't do it earlier, `matrix use {deviceId}`
1. Run `matrix`, your user is correct, and your selected device is correct.
1. Now you can issue commands and deploy apps to your MATRIX OS from the [MATRIX CLI](../overview/cli.md).
1. Try `matrix ping`, the device should flash a few seconds later.

### More options
See [Manual Setup](../overview/manual-setup)