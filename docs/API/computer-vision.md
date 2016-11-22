## Computer Vision
We've build computer vision algorithms in the API inteface to add another level of experiential IoT applications. We've also made it extremely simple to get started.
## Detection Algorithms
Available algorithms: `face` `detection`
<!-- `thumb-up`
`palm-open`
`palm-closed`
`face-id`
`vehicle-count`
`person-count` -->

## Initialization Example
```
var algorithm = 'face';
var options   = {};
matrix.init( algorithm, options ).then(function( data ){
  // some callback
  console.log( data );
});
```

<!--
## Base Options
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
// TODO
-->

## Face Detection
```
matrix.init('face').then(function(data){})
```  
`then` will call when any face is detected

<!--
### Face Detection Options
To only detect particular characteristics pass an array of the desired values as `options.detect`.

### Example
```
var options = { detect: ['AGE', 'EMOTION','GENDER','FACE_ID','HEAD_POSE','FACE_FEATURES'] };
matrix.init('gesture', options);
```
-->

#### emotions
`HAPPY`
`SAD`
`CONFUSED`
`ANGRY`
`CALM`
`SURPRISED`
`DISGUST`
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
