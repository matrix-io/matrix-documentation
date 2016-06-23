# Filters

MatrixOS sensors and computer vision algorithms provide data which can be filtered between the `init`, which can be regarded as the data source, and the `then`, which can be regarded as the data receiver. Between the two, we can use chaining methods to easily filter what data is received.

```
// filtering in a simple application
matrix.init('temperature')
.above(80)
.then(function(data){
  // see CrossTalk documentation for more information about matrix.emit
  matrix.emit('ac-control', 'turnOn');
})
```

## Simple Filtering methods

#### equality

##### Numeric
`is()` `like()`
```
matrix.init('temperature').is(72)
```

##### String
```
matrix.init('microphone').contains('hello world')
```

#### negation
`not()`
```
matrix.init('temperature').not(72)
```

#### proximity
`near()`
```
matrix.init('gps').near([39.0432661,117.7249414])
```

#### bounds
##### >
`above`, ``
```
matrix.init('temperature').above(72)
```
