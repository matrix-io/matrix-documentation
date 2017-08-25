## Download and Prepare
```
git clone https://github.com/matrix-io/matrix-creator-malos;
cd matrix-creator-malos;
git submodule update --init;
cd src/js_test;
npm install;
```

## Examples
CORE is the program that sits between the low level hardware layer and MATRIX OS. This program allows MATRIX OS to access the board hardware via ZeroMQ sockets. You can also use it directly, as it is done with the examples below. The The IPs used in the examples are 127.0.0.1. Remember to edit them if you're accessing the Creator from another host and not from the Raspberry itself.

**Note:** Pre-requisite of [NodeJS](https://nodejs.org/en/download) on the client computer.

For an indepth discussion of these tests, please examine the [Reference](../reference/) sections for JavaScript details.

### Drivers

```
node test_driver_info.js
```
### Everloop

```
node test_everloop.js
```
### Humidity

```
node test_humidity.js
```
### IMU

```
node test_imu.js
```
### IR Remote

```
node test_ir_remote.js
```
### Pressure

```
node test_pressure.js
```
### UV

```
node test_uv.js
```
### Zigbee Bulb On/Off

```
node test_zigbee_bulb.js
```
### Zigbee Bulb Color

```
node test_zigbee_color.js
```
### Zigbee Bulb Brightness

```
node test_zigbee_level.js
```
