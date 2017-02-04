Alpha API, subject to deprecation

Version Introduced: 0.9.0

## Base

`matrix.zigbee()` - activates the zigbee network and sees if any of the remembered devices are available

Returns an object which is used to activate other zigbee commands

```
var zb = matrix.zigbee();
```

## Network

 `zb.discover()` - put zigbee into discover mode for 60 seconds. power on your zigbee device to have it be found

 `zb.reset()` - if you get into problems, issue a reset command

## Lights

currently, only zigbee lights are supported
`zb.light(n)` - address found lights. `n` indicates the number of the light, in order of which it was added, default to the first.

`zb.light().on()` - turns on the light
`zb.light().off()` - turns off the light
`zb.light().toggle()` - turns the light on or off

`zb.light().fadeIn(time)` - slowly turn a light over `time` seconds
`zb.light().fadeOut(time)` - slowly turn off a light over `time` seconds

`zb.light().color(hue, time)` - sets the light to `hue` color, over `time` seconds, defaulting to 3 seconds. `hue` accepts 0-360 hue values, in addition any `color` value which would be passed to the Everloop, like `'blue'` or `'#0000FF'`. see [Everloop](everloop.md)

`zb.light().level(level, time)` - sets the light level to `level` 0-100 over `time` seconds, defaults to 3

## Example
Use events to have precise control over your zigbee devices.
```
matrix.on('discover', function(){
  matrix.zigbee().discover();
});

matrix.on('reset', function(){
  matrix.zigbee().reset();
});

matrix.on('toggle', function(){
  matrix.zigbee().light().toggle();
});

matrix.on('off', function(){
  matrix.zigbee().light().fadeOut(10);
});

matrix.on('on', function(){
  matrix.zigbee().light().fadeIn(10);
});

matrix.on('dim', function(){
  matrix.zigbee().light().level(10, 5);
});

var spin;
matrix.on('spin', function(){
  var hue = 0;
  var i = 0;
  setInterval( function(){
    spin = matrix.led({
        h: hue++,
        s: 1,
        l: 0.5
      }).render();

    if ( i > 35 ){
      i = 0;
    }

    if ( hue > 360){
      hue = 0;
    }

    if ( hue % 10 === 0){
      matrix.zigbee().light().color(hue, 1);
    }
  }, 50);
});

matrix.on('stop', function(){
  clearInterval(spin);
});
```
Issue a `spin` event against the above application to cycle colors on the Everloop and set the zigbee light to the same color.
