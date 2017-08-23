
## Installation & Registration

Your MATRIX device may or may not have **MATRIX Open System** preinstalled on it. 

These instructions are included if you need to build your own MOS image.

**Note:** MATRIX Open System is currently targeted to run on Raspbian. 

### Set up your Personal Computer

> You need [NodeJS, and the Node Package Manager (npm)](https://nodejs.org/en/download/) installed.

These next instructions can be executed your personal computer or Raspberry Pi. We would recommend installing the [Command Line Interface](../overview/cli) (CLI) on your local computer, not the Raspberry Pi.

1. Install the CLI via npm `npm install -g matrix-cli`
1. `matrix login` if you have a MATRIX Labs account, otherwise `matrix register` to sign up
1. Log into your account using `matrix login`
1. Once registered an account, run `matrix register device`
1. Enter a `device name` and (optional) `device description`
1. After a few moments you will be provided with a `MATRIX_DEVICE_ID` and `MATRIX_DEVICE_SECRET`

#### Login Credentials

```bash
# example variables generated via registration, yours will be different
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```

**Note:** Save these for the Configure ENV Variables step, near the end.

### Set up your Raspberry Pi

> Your Pi needs a [clean Raspbian install](https://www.raspberrypi.org/downloads/raspbian/).

Access a command prompt on your Pi. 

#### MOS Installation

This command will install the **MATRIX Open System** and required sub-components.

```bash
curl https://raw.githubusercontent.com/matrix-io/matrix-creator-quickstart/master/install.sh | sh
```

**Note:** [Watch Getting Started, Registration and Installation](https://www.youtube.com/watch?v=ckDD6HEjfAY) of MATRIX OS and MATRIX CLI on Youtube.

#### Device Registration

1. Inside your home folder (`~`), create a file named `.envrc` with the [id & secret exports](/#login-credentials) from above.
1. Run `source ~/.envrc` to make the variables available to the shell, which will then be used when starting MOS.
1. Go to `matrix-os` folder with `cd ~/matrix-os` and run `node index.js` to start the OS.

### Check if everything works

1. On your Personal Computer, If you didn't do it earlier, in PuTTy, Terminal, or Command Prompt, type `matrix use {deviceId}`
1. Try `matrix ping`, the device should flash a few seconds later.
1. Now you can issue commands and [deploy applications](../overview/cli/#deploy) to your MATRIX OS from the [MATRIX CLI](CLI/overview.md).

### Continue

* See [Hello World](../overview/hello-world) example
* See [Manual Setup](../overview/manual-setup)