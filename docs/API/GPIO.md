[WIP] GPIO can be used to communicate or receive input from analog and digital components through the MATRIX Creator, or any other sensor leveraging Raspberry Pi's GPIOs.

## .open
```
matrix.gpio.open(16, "output", function(err){
	// read or write
});
```

## .read
* `pinNumber`: The GPIO you are reading from.
* `callback`: Returns `err`, `value`.
```
matrix.gpio.read(16, function(err, value) {
  if(err) throw err;
  console.log(value);	// The current state of the pin 
});
```

## .write
* `pinNumber`: The GPIO you are reading from.
* `value`: The value you would like to update the GPIO with.
* `callback`: Returns `err`, `value`.

```
matrix.gpio.write(16, 1, function(err) {
	if(err) throw err;
});
```

## .close
* `pinNumber`: The GPIO you would like to close.
```
matrix.gpio.close(16);
```

## Example
```
matrix.gpio.open(16, "output", function(err) {
    matrix.gpio.write(16, 1, function() {
        matrix.gpio.close(16);
    });
});
```