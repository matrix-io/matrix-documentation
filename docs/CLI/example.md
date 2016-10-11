## Example Workflows

#### Register an Account
```
matrix register
```

#### Setup New Device
Set up a brand new device. This flow provides Device ID and Secret. Save these for future use, you are only given this once.
```
matrix login
matrix device register

# use provided id
matrix use <deviceId>

# should show new device
matrix list devices
```
#### App Deployment
Deploys an application you are developing locally.
```
matrix login
matrix list devices
matrix use <deviceId>

matrix deploy frontdoor
```

#### App Installation
Installs an application that you have published locally.
```
matrix login
matrix list devices
matrix use <deviceId>

matrix install frontdoor
matrix set config frontdoor settings.lock.apiKey=ABC123FED
matrix start frontdoor
```

#### App Publishing
Publishes an application to the store.
```
matrix login
matrix list devices
matrix use <deviceId>

matrix publish frontdoor
matrix install frontdoor
matrix start frontdoor
```

#### Using the Simulator
Creates a local simulator to interface with. Currently has a dependency of Docker & Docker-Machine.
```
matrix login
matrix sim init
matrix use simid-abc123
matrix sim start

# makes testapp/ with app scaffold
matrix create testapp

# places testapp/ onto matrixos
matrix deploy testapp

# starts testapp/
matrix start testapp
```
