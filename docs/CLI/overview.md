# Overview

MatrixOS devices and applications are managed via the Matrix CLI.

## Installation
```
npm install -g matrix-cli
```

This will make the `matrix` command available in your terminal.

```
  _  _ ____ ___ ____ _ _  _
  |\/| |__|  |  |__/ |  \/   _ | [o]
  |  | |  |  |  |  \ | _/\_ |_ |_ | v1.1.3  - production


API: http://demo.admobilize.com Streaming: http://mxss.admobilize.com:80
User: hello@rokk3rlabs.com Device: 12:23:34:45:56

---- SETUP ----
 login - Login to the MatrixOS platform
logout - Log out of the MatrixOS platform
   use - Indicate active device
   set - set environment settings, update application configuration
       ↳ [env <environment>, config <app> k=v]

-- MANAGEMENT --
   sim - manage local MatrixOS simulator using docker
       ↳ [ init, restore, start, stop, save, clear ]
  list - information about your devices, applications and installations
       ↳ [ apps, devices, all, groups ]
reboot - Reboots the active MatrixOS device

----- APPS -----
search - Search for apps
install - Install an app or sensor to active MatrixOS device
       ↳ [ app / sensor ] <name>. defaults to app
config - view and modify application configuration
uninstall - uninstall <app>
update - Update to a specified version of a MatrixOS application
       ↳ <appName> <version>
 start - Starts an app running on the active MatrixOS
  stop - Stops an app running on the active MatrixOS
restart - Restarts an app running on the MatrixOS

- DEVELOPMENT -
create - Creates a new scaffolding for a MatrixOS Application
deploy - Deploys an app to the active MatrixOS
trigger - Runs a trigger test
   log - Logs output from selected MatrixOS and applications
```

## Creating an Application
Creating an application is very basic. It deploys from template stored in the `matrix-console` package.
```
matrix create app1
```

###### App Structure
* `app.js` -- This is your application logic
* `config.yaml` -- Change variables, indicate sensors, configure dashboard.
* `DEVELOPER.MD` -- Developer information that will be published for integrations on the Developer Portal.
* `index.js` -- app entry point, do not modify
* `package.json` -- NodeJS information file, do not modify without knowledge.

## Management
```
matrix list - information about your MatrixOS devices, applications and installations [ apps, devices, all, groups ]
 -- matrix list apps - Shows a list of apps under your account.
 -- matrix list devices - Shows a list of devices under your account.
 -- matrix list all - Shows a list of devices, with the Apps installed on each device.
 -- matrix list groups - Shows a list of groups under your account.
```


## Control over Applications
Work with your apps, and within the app ecosystem here. You can deploy to your simulator, or deploy to your actual MATRIX hardware. It's up to you.

```
matrix search - Search for apps
matrix install - [-a] app and [-s] sensor install. defaults to app.
 -- matrix install sensor [sensorname]
 -- matrix install app [appname]
matrix update - Update, update app1, update app1 v0.1
matrix uninstall - Usage: uninstall app1
 -- matrix uninstall sensor [sensorname]
 -- matrix uninstall app [appname]
matrix start - Starts an app running on the MATRIX.
matrix stop - Stops an app running on the MATRIX.
matrix restart - Restarts an app running on the MATRIX.
```

## Developing an Application
Flexibility to develop anything you want. These four simple commands help you test and build pretty much anything.

```
matrix create - Creates a new scaffolding for a MATRIX App.
matrix deploy - Deploys an app to the Matrix.
matrix trigger - Runs a trigger test
matrix log - Usage: log [-f, --follow]
```

---------------

## Using the Simulator

Create a fresh simulator, using the MATRIX OS image available online.
```
matrix sim - manage local MatrixOS simulator using docker [ upgrade, restore, init, start, save, clear ]
 -- matrix sim upgrade - initialize your MatrixOS simulator
 -- matrix sim restore - Restore your MatrixOS simulator
 -- matrix sim init - initialize your MatrixOS simulator
 -- matrix sim start - start MatrixOS virtual environment
 -- matrix sim save - save MatrixOS state, use after deploy / install
 -- matrix sim clear - remove simulation local data
```
