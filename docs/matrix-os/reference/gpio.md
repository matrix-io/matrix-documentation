## GPIO

### Device Compatibility
<img width="170" src="../../img/creator-icon.svg">
<img width="170" src="../../img/voice-icon.svg">

GPIO can be used to communicate or receive input from analog and digital components through the MATRIX Creator, or any other sensor leveraging Raspberry Pi's GPIOs.

### Configuration
Make sure to add the following to your `config.yaml` to enable GPIO's/

```language-yaml
integrations:
  - gpio
```


### matrix.gpio.read
* `pinNumber`: The GPIO you are reading from.
* `callback`: Returns `err`, `value`.
```language-javascript
matrix.gpio.read(16, function(err, value) {
  if(err) throw err;
  console.log(value);	// The current state of the pin
});
```

### matrix.gpio.write
* `pinNumber`: The GPIO you are reading from.
* `value`: The value you would like to update the GPIO with.
* `callback`: Returns `err`, `value`.

```language-javascript
matrix.gpio.write(16, 1, function(err) {
	if(err) throw err;
});
```

## Servo

### Configuration
Make sure to add the following to your `config.yaml` to enable Servos/

```language-yaml
integrations:
  - gpio
```


### matrix.servo
* `pin`: The GPIO pin the servo is connected to.
* `angle`: Integer specifying the specific angle to set the servo to.
```language-javascript
matrix.servo(pin, angle);
```