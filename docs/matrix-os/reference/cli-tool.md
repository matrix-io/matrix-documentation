<h2 style="padding-top:0">Command Line Interface (CLI)</h2>
The MATRIX CLI tool is a terminal interface for managing your MATRIX devices and applications. This includes deploying, downloading, and publishing applications.

> MATRIX CLI requires <a href="https://nodejs.org/en/" target="_blank">Node.js</a> on your personal computer.

<br/>
## Installation
To install the MATRIX CLI, execute the following command in your personal computer's terminal.
```language-bash
npm install -g matrix-cli
```

<br/>
##Command list

Typing `matrix` lists all the available MATRIX CLI commands. Each command for the CLI tool must begin with `matrix`.

### Setup
* `matrix register` - Register for a MATRIX Labs account.

    ↳ `matrix register device` - Registers a MATRIX device to your account.

* `matrix account` - View MATRIX Labs account details.
    
    ↳ `matrix account profile` - Edit account details.

* `matrix remove YOUR_DEVICE_NAME_OR_ID` - Removes a MATRIX device from your account.

* `matrix login` - Sign into MATRIX Labs account.

* `matrix logout` - Sign out of MATRIX Labs account.

* `matrix upgrade` - Update current MATRIX CLI tool version.

* `matrix use YOUR_DEVICE_NAME_OR_ID` - Select MATRIX device to use.

* `matrix set` - Set environment or locale.

    ↳   `matrix set env DESIRED_ENV` - Switch between **dev**, **rc**, and **production** environments. Recommended to stay in **rc**.
    
    ↳   `matrix set locale DESIRED_LOCALE` - Switch between **es** (spanish) and **en** (english) locale for the MATRIX CLI tool.

### Management
* `matrix list` - Lists all MATRIX devices or apps.
    
    ↳ `matrix list devices` - Lists all registered devices.
    
    ↳ `matrix list apps` - Lists all installed MATRIX apps for the current device.

### Apps
* `matrix search APP_NAME` - Check if a MATRIX app is listed in the app store

* `matrix install APP_NAME` - Install MATRIX app to your MATRIX device.

* `matrix uninstall APP_NAME` - Uninstall MATRIX app from your MATRIX device.

* `matrix config APP_NAME` - Check configuration of an installed MATRIX app.

* `matrix start APP_NAME` - Starts an installed MATRIX app.

* `matrix stop APP_NAME` - Stops an installed MATRIX app.

* `matrix restarts APP_NAME` - Restarts an installed MATRIX app.

### Development
* `matrix create APP_NAME` - Creates folder with the necessary files for a MATRIX app.

* `matrix deploy APP_FOLDER` - Installs MATRIX app to your MATRIX device.

* `matrix publish APP_FOLDER` - Upload MATRIX app to the app store.

* `matrix unPublish APP_NAME` - Remove MATRIX app from the app store.

* `matrix trigger EVENT_TO_EMIT` - Emits a [Cross-talk](/matrix-os/reference/crosstalk/) event to each MATRIX device.

* `matrix ping` - Flashes the lights on MATRIX device currently selected.

* `matrix log` - Shows all console.log() outputs from your MATRIX device.

> `matrix ping` has a known issue where it will output an error, but still ping the device.