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

// Imu properties
m.Imu.AccelX float32
m.Imu.AccelY float32
m.Imu.AccelZ float32
m.Imu.GyroX  float32
m.Imu.GyroY  float32
m.Imu.GyroZ  float32
m.Imu.Yaw    float32
m.Imu.Pitch  float32
m.Imu.Roll   float32
m.Imu.MagX   float32
m.Imu.MagY   float32
m.Imu.MagZ   float32 
```

```go tab="UV"
m.Uv.Read()

// Uv properties
m.Uv.Uv float32 

```

```go tab="Humidity"
m.Humidity.Read()

// Humidity properties
 m.Humidity.Humidity    float32 
 m.Humidity.Temperature float32
```

```go tab="Pressure"
m.Pressure.Read()

// Pressure properties
 m.Pressure.Altitude    float32
 m.Pressure.Pressure    float32
 m.Pressure.Temperature float32 
```
