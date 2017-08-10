## Sensors

### Available Sensors
`temperature`, `humidity`, `pressure`, `uv`, `gyroscope`, `accelerometer`

> You should have familiarity with [Configuration Files](../overview/configuration.md) before exploring Sensors. 

### Configuration
End users must explicitly authorize MOS applications to utilize hardware sensors.

This requires that each application identify required sensors in `config.yaml`.

```
sensors:
  - temperature
  - uv
```

Otherwise sensors will not work.

### matrix.sensor()
All sensors are initialized using the `sensor` method.

* `sensorType`: Type of sensor you are initializing 
* `options`: The options for that sensor. By default, all sensors support a `refresh` and `timeout` property.

```
var options = {
  refresh: 1000, //milliseconds between data points
  timeout: 10000 //how long before stopping this sensor
};

matrix.sensor('temperature', options).then(function(data){
  //see below for data formats
});
```

## Outputs
### Temperature
Output for `temperature` (in &#8451;).
```
{
  value: 36.95899963378906,
  type: 'temperature'
}
```

### Humidity
Output for `humidity`.
```
{
  value: 30.409704208374023,
  type: 'humidity'
}
```

### Pressure
Output for `pressure` (in mbars).
```
{
  value: 101692,
  type: 'pressure'
}
```

### UV
Output for `UV`.
```
{
   value: 0.0053547522984445095,
   risk: 'Low'
}
```

### Gyroscope
Output for `gyroscope`.
```
{
  yaw: 144.78964233398438,
  pitch: 2.112252950668335,
  roll: -92.0414810180664,
  x: -10.78155517578125,
  y: 1.8841552734375,
  z: 0.441131591796875,
  type: 'gyroscope'
}

```
### Accelerometer
Output for `accelerometer`
```
{
  x: 0.1,
  y: 0.23,
  z: 0.224,
  type: 'accelerometer'
}
```
### Magnetometer
Output for `magnetometer`
```
{
  x: 0.51,
  y: 0.53,
  z: -0.124,
  type: 'magnetometer'
}
```

### Filtering Sensor Data
See [MATRIX OS > Reference > Filter](filters.md)
