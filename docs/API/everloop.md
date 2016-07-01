# Everloop

A powerful tool for communicating with end users is the EverLoop LED circle.

## Set Colors
```
// set an initial color
matrix.led('red')

// interleave two colors
matrix.led([ '#bada55, '#e1337e'])

// support opacity
matrix.led('rgba(255, 0, 100, 0.6)')
```

## Generate Shapes
```
matrix.led({
  // number of lights to use [ 90° = 9 ]   
  arc: 9,

  color: 'green',

  // index to start drawing arc
  start: 12
});

// draw a point
matrix.led({
  angle: 245,
  color: 'white',
  // blends interlight space if true, solid lights if false, default false
  blend: true
})

// support multiple shapes
```
## Manipulate colors

```
//retrieves the current color state of the LED
matrix.led()

// lighten all colors 0 - 100
matrix.led().brighten(10)

// darken all colors 0 - 100
matrix.led().darken(10)
```

## Manipulate position

```
// rotate the lights clockwise by a specified angle
matrix.led().rotateCW(90)

// rotate the lights counter clockwise by a specified angle
matrix.led().rotateCCW(45)
```

## Example clock
```
setInterval(function(){
  var time = new Date();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  var hourLED = {
    // translate hours (12) to angle (360)
    arc: h * 3,
    color: 'blue',
    darken: 50
  };

  var minuteLED = {
    // translate minutes ( 60 ) to angle ( 360 )
    angle: m * 6,
    color: 'green'
  };

  var secondLED = {
    // translate seconds (60) to angle (360)
    angle: s * 6,
    color: yellow,
    blend: true
  };

  matrix.led([hourLED, minuteLED]);

}, 1000)
```
