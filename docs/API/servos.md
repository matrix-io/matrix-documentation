## Servo
Uses the GPIO pins in the MATRIX Creator to control Servos.

### Configuration
Make sure to add the following to your `config.yaml` to enable Servos/

```
integrations:
  - gpio
```


### Set servo angle
* `pin`: The GPIO pin the servo is connected to.
* `angle`: Integer specifying the specific angle to set the servo to.
```
matrix.servo(pin, angle);
```