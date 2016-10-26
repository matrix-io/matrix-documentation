## Sensors

### Sensors and Configuration
End users must explicitly authorize MOS applications to utilize hardware sensors and computer vision algorithms.

This requires that each application identify required sensors in `config.yaml`.

```
sensors:
  - temperature
  - uv
```

Otherwise sensors will not work.

### .init
All sensors are initialized using the `init` method.

* `sensorType`: Type of sensor you are initializing `temperature`, `humidity`, `pressure`, `uv`, `altitude`, `gyro`, `accel`.
* `options`: The options for that sensor. By default, all sensors have a `refresh` and `timeout` property.

```
var options = {
  refresh: 1000, //milliseconds
  timeout: 1000 //milliseconds
};

matrix.init('temperature', options).then(function(data){
  //see below for data formats
});
```

## Outputs
### Temperature
Output for `temperature` (in &#8451;).
```
{
  value: 28.0
}
```

### Humidity
Output for `humidity`.

### Pressure
Output for `pressure`.

### Altitude
Output for `altitude`.

### UV
Output for `temperature`.

### Gyroscope
Output for `gyro`.
```
{
  yaw: 82.06211853027344,
  pitch: -7.972985744476318,
  roll: 1.0514432191848755
}
```
### Accelerometer
Output for `accel`
```
{
  x: 0.1,
  y: 0.23,
  z: 0.224
}
```

### Filtering Sensor Data
See [API > Filter](filter.md)
