## Computer Vision
Part of the vision for MATRIX OS is to provide computer vision in an easy to access format.

## Configuration
To facilitate communication with the hardware, it is required to define CV services in `config.yaml` before they will be available to your application.

See [Services](../Configuration/services.md) for more information

We've build computer vision algorithms in the API inteface to add another level of experiential IoT applications. We've also made it extremely simple to get started.

## Detection Algorithms
Available algorithms: `face`, `palm`, `fist`

<!-- `thumb-up`
`palm-open`
`palm-closed`
`face-id`
`vehicle-count`
`person-count` -->

## Initialization
```
# app.js
var algorithm = 'face';
var options   = {};
matrix.init( algorithm, options ).then(function( data ){
  // your CV detection data will be available here
  console.log( data );
});
```

### options

`refresh` - how many seconds before restarting the detection, default: 3

`timeout` - if there is no detection, stop after this many seconds, default: none

## Algorithms

### Basic
`face`,`fist`,`palm`

<!-- `thumb-up`
`palm-open`
`palm-closed`
`face-id`
`vehicle-count`
`person-count` -->


### Basic Data Format
`palm` output - `matrix.init('palm')`
```
{
  location: { x: 333, y: 237, width: 55, height: 55 },
  tag: 'HAND_PALM'
}
```

### Extended Face Data Format
`demographics` output - - `matrix.init('demographics')`
```
{ location: { x: 213, y: 221, width: 55, height: 55 },
 tag: 'FACE',
 demographics:
  { gender: 'MALE',
    emotion: 'CALM',
    age: 35,
    pose:
     { yaw: -0.24303536117076874,
       roll: 0.04344254732131958,
       pitch: -0.10279278457164764 },
    face_id: '4' } }
```

#### emotions
`HAPPY`
`SAD`
`CONFUSED`
`ANGRY`
`CALM`
`SURPRISED`
`DISGUST`


<!--## Base Options
These are applicable to all algorithms.

- `zone` - a nested array of x,y, width and height
- `zones` - an array of zone arrays

### Example
```
var zone1 =  [ 100, 100, 300, 400 ];
var zone2 =  [ 50, 50, 250, 300 ];
{
  zone: zone1,
  zones: [zone1, zone2]
}
``` -->

<!-- ## Gesture
```
matrix.init('gesture', options).then(function(data){})
```
`then` will call when any gesture is detected.

### Gesture Options
To trigger on specific gestures pass an array of the desired values as `options.detect`.

### Example
```
var options = { detect: ['THUMB_UP'] };
matrix.init('gesture', options);
```

#### Gestures
`THUMB_UP`
`PALM_OPEN`
`PALM_CLOSED`

### Data Format
// TODO -->

<!--
### Face Detection Options
To only detect particular characteristics pass an array of the desired values as `options.detect`.

### Example
```
var options = { detect: ['AGE', 'EMOTION','GENDER','FACE_ID','HEAD_POSE','FACE_FEATURES'] };
matrix.init('gesture', options);
```
-->

<!--
## Face Recognition
```
matrix.init('face-id').then(function(data){})
```  
Facial recognition requires a target face to be supplied to it first. This can be provided in the application folder or uploaded to the device.

### Options
To detect a face, supply it in `options.match`. Use an array to recognize multiple faces.

### Example
```
// preuploaded Example - myFace.jpg
matrix.init('face-id', { match: 'myFace' })
```
```
// dynamic faces from dashboard / mobile app / cli
matrix.on('faceUpload', function(data){
  // saves upload to filesystem
  matrix.save(data.name + '.' + data.typeSuffix, data.file);

  // retrieve the configuration variable
  var faces = matrix.faces;

  // update with new face file
  faces.push(data.name);

  // save new face to configuration
  matrix.config('faces', faces);

  // restart application to use new face
  matrix.restartApp();
});

// use configuration for recognition
matrix.init('face', { match: matrix.faces })
```
## Vehicle Counting
```
matrix.init('vehicle-count').then(function(data){})
```  

### Options
Toggle different detection modes depending on circumstances.

### Example
//TODO

## People Counting
```
matrix.init('people-count').then(function(data){})
```
### Options
### Example -->
