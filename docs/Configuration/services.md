## Services

Services are used to indicate which computer vision libraries a given application will request to utilize.

### Example Service Definition & Usage
```
# config.yaml

services:
  faceTest:
    engine: detection
    type: face

# app.js
matrix.init('face')
```

For the data formats of the payloads returned, refer to [Computer Vision](../API/computer-vision.md)

### Engines & Types
#### `detection`
`face` - returns basic face detection information
`demographics` - returns advanced demographic information

#### `gesture`
`palm` - looks for open palm
`fist` - looks for closed fist
`thumb-up` - looks for thumb up sign
