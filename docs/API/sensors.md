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

* `sensorType`: Type of sensor you are initializing `temperature`, `humidity`, `pressure`, `uv`, `gyroscope`, `accelerometer`.
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
  type: 'gyroscope' 
}

```
### Accelerometer
Output for `accelerometer`
```
{
  x: 0.1,
  y: 0.23,
  z: 0.224
}
```

### Filtering Sensor Data
See [API > Filter](filter.md)
