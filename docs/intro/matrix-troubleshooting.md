## Troubleshooting

Starting MOS from your device, you will have access to more error messages with `DEBUG=*,-engine*,-Component*` prepended to the commands presented below. `engine`, refers to `engine.io`, sockets, and `Component`, is very verbose hardware communications, disable these filters as necessary.

### Test applications
Several applications are available in the [MATRIX App Store](https://apps.matrix.one).

* `sensorTest` - Tests all sensors
* `clock` - Runs a clock which tests the LEDs
* `faceTest - Face detection services via `malos-eye`.

### Lights are spinning, but don't stop

Exits with message
```
Device Error undefined
```
Solution. Run again with environment set.
```
NODE_ENV=rc node index.js
```

### MATRIX Vision Services not working
Messages appear when `malos_eye` is running, and hardware is not properly installed. Please shut off device, firmly reconnect the camera connection, and restart.
```
VIDIOC_STREAMON: Invalid argument
VIDIOC_STREAMON: Invalid argument

Message received: gesture error: Could not read frame
Message received: gesture error: 1, Could not send update for GESTURE driver.

select timeout
select timeout
select timeout
select timeout
```