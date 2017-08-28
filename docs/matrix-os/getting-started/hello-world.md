## Application: Hello World

### You will need
* A Registered & Configured MATRIX Device
* Installed Mobile Application OR [Command Line Tool](../overview/cli.md)

After you have successfully configured your MATRIX OS installation on a MATRIX device, you can install applications.

### Application Installation
Using the mobile application, or using the Command Line Tool, install `sensorTest`

```bash
# after selecting device with `matrix use`
> matrix install sensorTest
```

Permission will be asked before install commences, to continue, allow access for the application to all sensors.

### Running an Application
Using the mobile application, flick the switch next to an application name to start. Or if using the Command Line Tool:

```bash
> matrix start sensorTest
```

### Success
You should see lights animating on the Everloop, one for every active sensor.

![Sensor Test Success](../img/sensor-test.jpg)


### Continue
Now that you have installed and run an application, [Next Steps](next-steps.md) will be able to guide your next MATRIX adventure.