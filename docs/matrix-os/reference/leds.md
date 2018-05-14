## Everloop LEDs

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

A powerful tool for communicating with end users is the EverLoop LED circle. CLICK VIDEO BELOW:

[![Everloop Tutorial](../img/everloop-image.png)](https://www.youtube.com/watch?v=L4btaqw4HqM)


## Basic Operations

### String Notation & Render
```language-javascript
matrix.led('blue'); //does nothing

matrix.led('green').render(); //lights change

// supports css
matrix.led('rgb(255, 0, 100)').render();
```

You can use any CSS color property (color-name, rgb, and hex). Darker colors on the Everloop generally display with more precision then lighter colors, which tend to get washed out. Please avoid `rgba` as alpha values do not render correctly. 

## Intermediate Operation
### Object Notation - Shape Generators

Shape objects `{Shape}` are the fastest way to get started with Everloop. We are always building, [let us know](http://community.matrix.one/) what shapes you want us to work on next!

The object creation is simple, you combine global properties with specific properties into a single object that controls a single generator. To draw multiple shapes, see Multiple Shapes below.

### Available Shapes
Include one of these properties to enable the shape generator.
```
arc - number of degrees to draw an arc, important for smile faces, supports negative values
fade - similiar to arc, except lights fade out
angle - draw a single light at this degree point
```

### Shape Properties
Every Shape object must include a `color` property to render.
```
color - color strings, as specified above
blend - mix lights to make angle positioning more precise
spin - number of degrees by which to spin the hue ( 0 - 360 )
start - ( arc only ), start light index
```

#### Example Shape Object
```language-javascript
{
  color: 'red'
  angle: 90
}
```

### Chaining Operations
These operate on the shapes and colors defined in the `led` object.

```language-javascript
rotate(angle) - rotates whole shape by this many degrees 
```

### Multiple shapes and pixel drawing
Use an array to include multiple shapes. Color strings can also be included and will be drawn as a single light whose index matches the strings index in the array provided.

## Examples
```language-javascript
var a = matrix.led({
  // degrees of arc [ 90° = quadrant ]   
  arc: 90,

  color: 'green',

  // index to start drawing arc
  start: 12
}).render();


// draw a point
var b = matrix.led({
  angle: 245,
  color: 'white',
  // blends interlight space if true, solid lights if false, default false
  blend: true
}).render();

// rotate the lights clockwise by a specified angle
matrix.led([a, b]).rotate(90).render();
```

## Composition

### Shape Objects
```language-javascript
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
]).render();
```

### Direct LED Manipulation
Array index indicates the led to change
```language-javascript
matrix.led([0, 0, 0, 0, 'yellow', 0,
0, 0, 0, 0, 0, 0, 0, 'yellow', 0, 0,
0, 0, 0, 0, 0, 0, 'yellow', 'yellow',
'yellow', 'yellow', 'yellow', 'yellow',
'yellow', 'yellow', 'yellow' ]).render();
```


## Example clock
```language-javascript
setInterval(function(){
  var time = new Date();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  var hourLED = {
    // translate hours (12) to angle (360)
    arc: h * 3,
    color: 'blue'
  };

  var minuteLED = {
    // translate minutes ( 60 ) to angle ( 360 )
    angle: m * 6,
    color: 'green'
  };

  var secondLED = {
    // translate seconds (60) to angle (360)
    angle: s * 6,
    color: 'yellow',
    blend: true
  };

  // will draw all three
  matrix.led([hourLED, minuteLED, secondLED]).render();

}, 1000);
```

## Advanced Use
Enable `SUN_MODE=true` as a flag when launching MATRIX OS to turn on the white LEDs (and the luminence calculations). Wear sunglasses or use another mode of protecting your eyes when using this while developing. It is intended for use behind coverings.


## High Level Discussion

MATRIX OS is an attempt at abstracting out the complexity of hardware to make it very accessible for end users. At the same time, one also wants to support those who might want to perform more complex operations. When designing a language, sometimes compromises between ease of use and features must be made.

#### The problem
Many applications might want to write to the LED. We can leave it up to chance as to which gets to write, or we can approach it intelligently to optimize the aesthetics and performance. We also want to be able to manage and optimize LED transformations from a system level. Normally, MATRIX OS enables very fast communication with the hardware and tries to get out of the way as much as possible. For LEDS, we still get out of the way, but we need to blend all the input from different applications, otherwise this creates flicker as multiple applications compete for the same light indices. To discretely manage this, we created a special channel and notation just for leds.

#### The Solution
```
matrix.led
```