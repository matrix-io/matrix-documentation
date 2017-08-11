## GPIO
GPIO can be used to communicate or receive input from analog and digital components through the MATRIX Creator, or any other sensor leveraging Raspberry Pi's GPIOs.

### Configuration
Make sure to add the following to your `config.yaml` to enable GPIO's/

```
integrations:
  - gpio
```


### matrix.gpio.read
* `pinNumber`: The GPIO you are reading from.
* `callback`: Returns `err`, `value`.
```
matrix.gpio.read(16, function(err, value) {
  if(err) throw err;
  console.log(value);	// The current state of the pin
});
```

### matrix.gpio.write
* `pinNumber`: The GPIO you are reading from.
* `value`: The value you would like to update the GPIO with.
* `callback`: Returns `err`, `value`.

```
matrix.gpio.write(16, 1, function(err) {
	if(err) throw err;
});
```

## Servo

### Configuration
Make sure to add the following to your `config.yaml` to enable Servos/

```
integrations:
  - gpio
```


### matrix.servo
* `pin`: The GPIO pin the servo is connected to.
* `angle`: Integer specifying the specific angle to set the servo to.
```
matrix.servo(pin, angle);
```