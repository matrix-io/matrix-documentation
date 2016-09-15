A powerful tool for communicating with end users is the EverLoop LED circle.

## Rendering

MatrixOS is an attempt at abstracting out the complexity of hardware to make it very accessible for end users. At the same time, one also wants to support those who might want to perform more complex operations. When designing a language, sometimes compromises between ease of use and features must be made. 

#### The problem
Many things might want to write to the LED. We can leave it up to chance as to which gets to write, or we can approach it intelligently to optimize the aesthetics and performance. This requires a more complex notation. 

#### The Solution
```
matrix.led('blue')
//does nothing


matrix.led('green').render()
//lights change
```

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

//no color assumes off
matrix.led({
  arc: 360
})

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
matrix.led().rotate(90)
```

## Composition

### Shape Objects
```
// make a smiley face
matrix.led([
  {
    angle: 45,
    color: 'yellow'
  },
  {
    angle: 135,
    color: 'yellow'
  },
  {
    arc: 90,
    color: 'yellow',
    start: 225
  }
]).darken(90).render();
```
### Direct Pixel Manipulation
Array index = led to change
```
matrix.led([0, 0, 0, 0, 'yellow', 0,
0, 0, 0, 0, 0, 0, 0, 'yellow', 0, 0,
0, 0, 0, 0, 0, 0, 'yellow', 'yellow',
'yellow', 'yellow', 'yellow', 'yellow',
'yellow', 'yellow', 'yellow' ]).render();
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

  matrix.led([hourLED, minuteLED]).render();

}, 1000)
```
