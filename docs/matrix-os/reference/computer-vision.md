## Computer Vision
MATRIX OS is designed to integrate with computer vision in a powerful and robust way. You can use computer vision output to drive behavior, capture data for further analysis or anything you want!

## Example
From [faceTest MATRIX App](http://apps.matrix.one/#!/apps/facetest)
```
matrix.led('red').render();

matrix.service('face').start().then(data => {
  matrix.led('green').render();
  setTimeout(function() {
    matrix.led('black').render();
  },2000);
});
```

## Configuration
To facilitate communication with the hardware,  CV services must be defined in `config.yaml` before they will be available to your application.

```
services:
  faceDetection:
    engine: detection
    type: face
```

See [Services](../Configuration/services.md) for more information

## matrix.service
The base `matrix.service` command is how you access computer vision services.
```
matrix.service( algorithm, options )
```

### basic algorithms
`face` - triggers when it sees a face shape

`fist` - gesture recognition for a closed fist

`palm` - gesture recognition for an open palm

### `options`
`refresh` - how many seconds before restarting the detection, default: 3

`timeout` - if there is no detection, stop after this many seconds, default: none


### start()
Starts a given CV algorithm with provided options.
```
matrix.service( algorithm, options ).start()
```


### stop()
Stops running a CV algorithm.
```
var s = matrix.service( algorithm, options ).start();
s.stop();

//or
matrix.service(algorithm).stop();
```
<!--
`blob`, `color`

`thumb-up`
`palm-open`
`palm-closed`
`face-id`
`vehicle-count`
`person-count` -->


### .then()
Returns the data, `Promise` style.

`palm`, `face` and `fist` have associated tags

Returns `tag`: `HAND_PALM`, `HAND_FIST`, or`FACE`

#### Example
```
{
  location: {
   x: 333,
   y: 237,
   width: 55,
   height: 55
  },
  tag: 'HAND_PALM'
}
```

### Complete Example
```
# app.js
var algorithm = 'face';
var options   = {};
matrix.service( algorithm, options ).start().then(function( data ){
  // your CV detection data will be available here
  console.log( data );
});
```

## Advanced Algorithms
`demographics` - age, gender and emotion detection

`recognition` - facial recognition

## Extended Face Analytics
Use `demographics` for the service call and in `config>services>name>engine`

### Example Config.yaml
```
services:
  facelytics:
    engine: demographics
    type: face
```
### Example app.js

```
matrix.service('demographics').start().then(function(output){
  // see output below
});
```

#### Demographics Output
```
{ location: { x: 213, y: 221, width: 55, height: 55 },
 tag: 'FACE',
 trackId: 2,
 demographics:
  { gender: 'MALE',
    emotion: 'CALM',
    age: 25,
    pose:
     { yaw: -0.24303536117076874,
       roll: 0.04344254732131958,
       pitch: -0.10279278457164764 },
    face_id: '4' } }
```
#### Tracking
`trackId` assigns a unique index-based identifier to each face detected. This number resets when the application or service is restarted, so do not rely on it for persistance.

If you need persistant facial detection, try the `recognition` service.

#### available emotions
`HAPPY`

`SAD`

`CONFUSED`

`ANGRY`

`CALM`

`SURPRISED`

`DISGUST`




### Recognition
`recognition` - `matrix.service('recognition')`


MATRIX OS includes face recognition which turns a face into a series of numbers which can be used to identify the face when it is seen later. We do not store face images, just the numbers.

Recognition only works from > ~4 ft away. Removing hats and glasses will result in more accurate results.

### Example Config.yaml
```
services:
  faceRecog:
    engine: recognition
    type: face
```
### Example app.js
```
matrix.service('recognition').start()
```

By default, `recognition` works in `RECOGNITION` mode. Recognition requires training first.
#### train()

```
matrix.service('recognition').train('test').then(data =>  { ... });
```
This will associate a face with a particular tag. 

### Training Data Response
```
{ 
  // number of trains performed
  count: 2,
  // number of trains desired
  target: 7,
  uuids: [...]
}
```
### Training Data Example
This will render a progress arc as training is completed.
```
matrix.service('recognition').train('test').then(function(d) {
  matrix.led({
    arc: Math.round(360 * (d.count / d.target)),
    color: 'blue',
    start: 0
  }).render();
});
```
#### start()
After training, you can enable normal recognition as follows.
```
matrix.service('recognition').start().then(data => {...})
```

#### Recognition Training Response
Outputs a collection of tags and scores.
```
[{ tags : ['tagName'], score: 0.8 }, {...}]
```
`tags` are the tags matched with each recognition. `score` is the measure of a match, lower numbers are better. `< 0.8` is a good metric to use for recognition.

#### Recognition Example
```

matrix.service('recognition').start().then(data => {...})
// select the best match out of all the responses
    var faces = _.values(d.matches);
    faces = _.sortBy(faces, ['score'])[0];

// if it passes a threshold, show green, otherwise show red
    if (MinDistanceFace.score < 0.85) {
      matrix.led('green').render();
    } else {
      matrix.led('red').render();
    }
});
```

### Stop()
If you need to explicitly stop a service, simply pass a `stop()` chained method.
```
matrix.service('recognition').stop()
```
Please note, that while this will tell the service to stop working, data may still trigger callbacks for a few seconds more.

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
matrix.service('gesture', options).then(data => {})
```
`then` will call when any gesture is detected.

### Gesture Options
To trigger on specific gestures pass an array of the desired values as `options.detect`.

### Example
```
var options = { detect: ['THUMB_UP'] };
matrix.service('gesture', options);
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
matrix.service('gesture', options);
```
-->

<!--
## Face Recognition
```
matrix.service('face-id').then(data => {})
```  
Facial recognition requires a target face to be supplied to it first. This can be provided in the application folder or uploaded to the device.

### Options
To detect a face, supply it in `options.match`. Use an array to recognize multiple faces.

### Example
```
// preuploaded Example - myFace.jpg
matrix.service('face-id', { match: 'myFace' })
```
```
// dynamic faces from dashboard / mobile app / cli
matrix.on('faceUpload', data => {
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
matrix.service('face', { match: matrix.faces })
```
## Vehicle Counting
```
matrix.service('vehicle-count').then(data => {})
```  

### Options
Toggle different detection modes depending on circumstances.

### Example
//TODO

## People Counting
```
matrix.service('people-count').then(data => {})
```
### Options
### Example -->
