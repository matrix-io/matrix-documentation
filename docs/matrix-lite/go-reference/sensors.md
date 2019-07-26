<h2 style="padding-top:0">Sensors</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">

## Overview
The following sections below will go over how to read & what to expect from each sensor on the MATRIX Creator.

## Import Statement
```go
import ("github.com/matrix-io/matrix-lite-go")
```

!!! tip "MATRIX Initialization"
    `.Init` will contain a `Sensors` struct to call the functions below
    ```go
    m := matrix.Init()
    ```

## Reading Sensor Data
Sensor data can be read by calling `.Read()` on a sensor struct. This updates the existing sensor's values. Below are examples on how to call each sensor and what information to expect.

```go tab="IMU"
m.Imu.Read()

// Example m.Imu properties
{ 
  AccelX: 0.0020000000949949026,
  AccelY: 0.004999999888241291,
  AccelZ: 0.9819999933242798,
  GyroX:  0.7770000100135803,
  GyroY:  -0.2460000067949295,
  GyroZ:  0.7250000238418579,
  Yaw:    -177.40724182128906,
  Pitch:  -0.11669033765792847,
  Roll:   0.2917275130748749,
  MagX:   0.5299999713897705,
  MagY:   -0.024000000208616257,
  MagZ:   -0.05999999865889549 
}
```

```go tab="UV"
m.Uv.Read()

// Example m.Uv properties
{ 
  Uv: 0.013000000268220901 
}
```

```go tab="Humidity"
m.Humidity.Read()

// Example m.Humidity properties
{ 
  Humidity:    29.04400062561035, 
  Temperature: 33.279998779296875 
}
```

```go tab="Pressure"
m.Pressure.Read()

// Example m.Pressure properties
{ 
  Altitude:    -47.4370002746582,
  Pressure:    101896,
  Temperature: 32.9370002746582 
}
```
