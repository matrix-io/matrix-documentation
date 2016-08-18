# Sensors

## Simple Sensor List
- temperature
- humidity

## Complex Sensor List
- gps
- gyroscope
- accellerometer

# Using Sensors
```
matrix.init('temperature').then(function(data){
  //see below for data formats
})
```

## Data from Simple Sensors
Simple sensors emit float numbers with a `value` key.
```
{
  value: 72.0
}
```
## Data from complex sensors
Complex sensors emit structured data

### microphone
```
{
  db: 132.23,
  text: 'hello world'
}
```

### gps
```
{
  lat: 34.234,
  lon: 13.111
}
```
### gyroscope
```
{
  x: 0.1,
  y: 0.23,
  z: 0.224
}

```
### accellerometer
```
{
  yaw: 82.06211853027344,
  pitch: -7.972985744476318,
  roll: 1.0514432191848755
}
```

#### accellerometer options

- `refresh` - ms delay between refresh
- `timeout` - how long before auto timeout

# Filtering Sensor Data
see [API > Filter](filter.md)
