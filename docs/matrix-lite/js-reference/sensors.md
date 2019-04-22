<h2 style="padding-top:0">Sensors</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">

## Overview
The following sections below will go over how to read & what to expect from each sensor on the MATRIX Creator.

## Import Statement
```language-js
const matrix = require("@matrix-io/matrix-lite");
```
<br/>

<h2 style="padding:0; margin:0;">Reading Sensor Data</h2>
Below are the functions you'll use to read data from each sensor. Reading a sensor will always return the latest values.

###IMU
```language-js
matrix.imu.read();
```
```language-js
// Example IMU Return Value //
{ 
  accel_x: 0.0020000000949949026,
  accel_y: 0.004999999888241291,
  accel_z: 0.9819999933242798,
  gyro_x:  0.7770000100135803,
  gyro_y:  -0.2460000067949295,
  gyro_z:  0.7250000238418579,
  yaw:     -177.40724182128906,
  pitch:   -0.11669033765792847,
  roll:    0.2917275130748749,
  mag_x:   0.5299999713897705,
  mag_y:   -0.024000000208616257,
  mag_z:   -0.05999999865889549 
}
```
### UV
```language-js
matrix.uv.read();
```
```language-js
// Example UV Return Value //
{ 
  uv: 0.013000000268220901 
}
```
### Humidity
```language-js
matrix.humidity.read();
```
```language-js
// Example Humidity Return Value //
{ 
  humidity:    29.04400062561035, 
  temperature: 33.279998779296875 
}
```

### Pressure
```language-js
matrix.pressure.read();
```
```language-js
// Example Pressure Return Value //
{ 
  altitude:    -47.4370002746582,
  pressure:    101896,
  temperature: 32.9370002746582 
}
```
