# Sensors

## Simple Sensor List
temperature
humidity

## Complex Sensor List
gps
gyro
accellerometer

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

### gps
```
{
  lat: 34.234,
  lon: 13.111
}
```
### gyro / accelleromete
```
{
  x: 0.2323,
  y: 0.234234,
  z: 1.31231
}
```

# Filtering Sensor Data
see [API > Filter](filter.md)
