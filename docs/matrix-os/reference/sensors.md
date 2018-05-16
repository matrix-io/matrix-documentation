<h2 style="padding-top:0">Sensors</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

### Available Sensors
`temperature`, `humidity`, `pressure`, `uv`, `gyroscope`, `accelerometer`

### Configuration
> You should have familiarity with [Configuration Files](configuration.md) before exploring further. 

When downloading an app from the <a href="https://apps.matrix.one" target="_blank">MATRIX App Store</a>, End users must explicitly authorize MOS applications to utilize hardware sensors.

This requires that each application to identify the sensors it requires in `config.yaml`. Sensors will not work unless this is specified. Below is an example for an app that requires the temperature and humidity sensor.

```language-yaml
sensors:
  - temperature
  - humidity
```

### Reading Sensors
All sensors are initialized using the `sensor` method. This method should only be used once per sensor. Once called, your can use a `.then` promise to initiate a callback.

```language-javascript
matrix.sensor(sensorType, options);
```

* `sensorType`: Type of sensor you are initializing 
* `options`: The options for that sensor. All sensors support a `refresh` and `timeout` property.

```language-javascript
// Example
var temperatureValue = 0; // global variable to hold sensor value
var humidityValue = 0; // global variable to hold humidity value

// Sensor options
var options = {
  refresh: 1000, // milliseconds between data points
  timeout: 10000 // how long before stopping this sensor
};

// Begin calling temperature sensor
matrix.sensor('temperature', options).then(data => {
  temperatureValue = data.value; // update global variable
  console.log(temperatureValue); // print new temperature value
});

// Begin calling humidity sensor
matrix.sensor('humidity', options).then(data => {
  humidityValue = data.value; // update global variable
  console.log(humidityValue); // print new humidity value
});
```

## Outputs
Below are all the possible data formats for each sensor.
<h3 style="padding-top:0">Temperature</h3>
Output for `temperature` (in &#8451;).
```language-javascript
{
  value: 36.95899963378906,
  type: 'temperature'
}
```

<h3 style="padding-top:0">Humidity</h3>
Output for `humidity`.
```language-javascript
{
  value: 30.409704208374023,
  type: 'humidity'
}
```

<h3 style="padding-top:0">Pressure</h3>
Output for `pressure` (in mbars).
```language-javascript
{
  value: 101692,
  type: 'pressure'
}
```

<h3 style="padding-top:0">UV</h3>
Output for `UV`.
```language-javascript
{
   value: 0.0053547522984445095,
   risk: 'Low'
}
```

<h3 style="padding-top:0">Gyroscope</h3>
Output for `gyroscope`.
```language-javascript
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
<h3 style="padding-top:0">Accelerometer</h3>
Output for `accelerometer`
```language-javascript
{
  x: 0.1,
  y: 0.23,
  z: 0.224,
  type: 'accelerometer'
}
```
<h3 style="padding-top:0">Magnetometer</h3>
Output for `magnetometer`
```language-javascript
{
  x: 0.51,
  y: 0.53,
  z: -0.124,
  type: 'magnetometer'
}
```