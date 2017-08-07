## Example Workflows


#### Setup New Device
Set up a brand new device. See (Manual Setup)[../../matrix-os/overview/manual-setup.md] for more information.
```
matrix login
matrix device register
# provides id / secret, needs to be copied to device to use

# should show new device
matrix list devices

# use provided id
matrix use <deviceId>
```

#### App Deployment
Deploys an application (`frontdoor`) you are developing locally.
```
matrix login
matrix list devices
matrix use <deviceId>

matrix deploy frontdoor
```

#### App Installation
Installs an application and sets a custom API key (example).
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
# apps.matrix.one/!#/apps/frontdoor now exists

matrix install frontdoor
matrix start frontdoor
```