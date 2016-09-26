# Example Workflows

# Setup New Device
```
matrix login
matrix device register

# use provided id
matrix use deviceid

# should show new device
matrix list devices

```

# Simulator
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

# Example App Install and Set Configurations

```
matrix login
matrix list devices
matrix use <deviceId>

matrix install frontdoor
matrix set config frontdoor settings.lock.apiKey=ABC123FED
matrix start frontdoor
```
