## Test your Sensors

> You need a registered MATRIX device and [CLI](../overview.md) installed

In [Hello World](../getting-started/hello-world), we installed an application which shines lights if a sensor is working properly

Here, we will build that application.

First, create the application and visit the directory:

```
> matrix create mySensorTest
# app folder is made
> cd mySensorTest
```

Edit `config.yaml` to add the sensors. This step is necessary to authorize the application to access the sensors.

```
sensors:
  - temperature
  - pressure
  - humidity
  - uv
  - altitude
  - gyroscope
  - magnetometer
  - accelerometer
```

Edit `app.js`. This is an example of an implementation for one sensor, `temperature`. You will have to repeat the code for every sensor, and adjust the LED `angle` option accordingly.

```
matrix.sensor('temperature', function(data){
  matrix.led({
    angle: 0,
    color: 'blue'
  }).render();
});
```