## Support
* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)
* Submit documentation issues or improvements at [matrix-io/matrix-documentation](https://github.com/matrix-io/matrix-documentation)

## Requirements
* [Raspberry Pi](https://www.raspberrypi.org)
* [MATRIX Creator](https://creator.matrix.one)
* [NodeJS](https://nodejs.org) on the client computer

## Installation

#### Local Machine Setup
1. Install [MATRIX CLI](CLI/overview.md) via npm `sudo npm install -g matrix-cli`
1. Target the proper environment `matrix set env rc`
1. With MATRIX CLI installed on your computer, register an account with MATRIX via `matrix register`
1. Log into your account using `matrix login`
1. Once registered an account, run `matrix register device`
1. Enter a `device name` and (optional) `device description`
1. After a few moments you will be provided with a `MATRIX_DEVICE_ID` and `MATRIX_DEVICE_SECRET`
1. Select your device using `matrix use `, and enter your device ID. Command examples will be provided for easy copy paste

```
# example variasbles generated via registration, yours will be different
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```

**Note 1:** Save these for the Configure ENV Variables step, near the end.

**Note 2:** [Watch Getting Started, Registration and Installation](https://www.youtube.com/watch?v=ckDD6HEjfAY) of MATRIX OS and MATRIX CLI on Youtube.

#### Raspberry Pi Setup
The following command installs the MATRIX Open Source platform and get ready your MATRIX Creator:

1. Install MATRIX OS: `curl https://raw.githubusercontent.com/matrix-io/matrix-creator-quickstart/master/install.sh | sh`
1. Inside your home folder (`~`), create a file named `.envrc` with the variables from the [Matrix CLI Setup above](/#local-machine-setup)
1. Run `source ~/.envrc` to make the variables available to the shell
1. Go to `matrix-os` folder with `cd ~/matrix-os` and run `NODE_ENV=rc node index.js` to start the OS. While in alpha, we are running in our Release Candidate environment.

#### Check if everything works
1. If you didn't do it earlier, `matrix use $deviceId`
1. Run `matrix`, verify you are on `rc` environment, your user is correct, and your selected device is correct.
1. Now you can issue commands and deploy apps to your MATRIX OS from the [MATRIX CLI](CLI/overview.md).

## Custom Raspbian Package
We'll be making a custom raspbian package available for download very soon!
