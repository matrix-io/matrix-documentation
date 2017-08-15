## Command Line Interface (CLI)

MATRIX devices can be managed via website, mobile phone applications or via CLI.

## Installation
Installing MATRIX CLI is easy. You need to have Node installed:

* [Node.js](https://nodejs.org/en/)

After Node is available, install MATRIX CLI with `npm` and you're good to go.

```
npm install -g matrix-cli
```

##### Local vs Device
MATRIX CLI was designed to be used from your local machine, or can be installed to and used from your Raspberry Pi.

## Registration

### User registration
If you do not have an AdMobilize MATRIX account, use:
```
matrix register
```
Check your email to confirm the account then you can login.

```
matrix login
```

##### Manual device registration
This step can also be done via the MATRIX mobile application, which will automatically set the credentials.

In order to manually set up your device, use:
```
matrix register device
```

For more details about registering devices, see [Getting Started > Installation > CLI Setup](../getting-started/installation.md#cli-setup)

This will ask for your device details and then provide you with an id and a secret, you need to set those ENV vars in your device so it can authenticate on boot. 

For more information on running MATRIX OS manually, see (MATRIX OS > Overview > Manual Setup)[manual-setup.md].

### Command list
For a list of all the available options, use:
```
matrix
```

## Devices
See (MATRIX OS > Overview > Devices)[devices.md]

### Device Registration
```
# Find MatrixOS apps for a keyword
matrix register device
```

### List your Devices
```
matrix list devices
```

### Use a Specific Device
```
# Choosing a device identifier from the list above
matrix use <device-id>
```

## Applications
See (MATRIX OS > Overview > Applications)[applications.md]

**All the application commands require an active device to be specified with `matrix use`.**

### Install

```
# Install an app from the store to MatrixOS
matrix install appName
```

### Uninstall
```
# Uninstall an app from your device
matrix uninstall appName
```

### Create
```
#creates a folder with a base matrix app template
matrix create appName
```
See [MATRIX OS > Overview > Applications](applications.md) for more information about writing MATRIX OS applications.

### Deploy
```
# uploads app folder to MatrixOS
matrix deploy appName
```
### Run
```
matrix start appName
```

### Stop
```
matrix stop appName
```

### Restart
```
matrix restart appName
```
