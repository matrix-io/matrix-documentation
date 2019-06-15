<h2 style="padding-top:0">Sensors</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">

## Overview
The following sections below will go over how to read & what to expect from each sensor on the MATRIX Creator.

## Import Statement
```python
from matrix_lite import sensors
```
<br/>

## Reading Sensor Data
Sensor data can be read by calling `.read()` on a sensor object. This returns an object with the current sensor's values. Below are examples on how to call each sensor and what information to expect.

```python tab="IMU"
sensors.imu.read()

## Example imu.read() output ##
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

```python tab="UV"
sensors.uv.read()

## Example uv.read() output ##
{ 
  uv: 0.013000000268220901 
}
```

```python tab="Humidity"
sensors.humidity.read()

## Example humidity.read() output ##
{ 
  humidity:    29.04400062561035, 
  temperature: 33.279998779296875 
}
```

```python tab="Pressure"
sensors.pressure.read()

## Example pressure.read() output ##
{ 
  altitude:    -47.4370002746582,
  pressure:    101896,
  temperature: 32.9370002746582 
}
```
