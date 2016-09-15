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

Filtering decides whether or not a data point is passed to the `then()`, it does not change the data in any way.

## Simple Filtering methods

### equality

###### Numeric
`is()` `like()`
```
matrix.init('temperature').is(72)
```

###### String
```
matrix.init('microphone').contains('hello world')
```

### negation
`not()`
```
matrix.init('temperature').not(72)
```

### proximity
`near()`
```
matrix.init('gps').near([39.0432661,117.7249414])
```

## Complex Filtering

### has
`has()` is used to refine a data source by additional criteria and keys.

```
// for simple sensors
matrix.init('temperature').has('value')
// equivalent to
matrix.init('temperature').has()

// for complex sensors
matrix.init('gyro').has('x')

// for detections
matrix.init('face').has('age')
```

### bounds
###### > greater then
`above`, `over`, 'after'
```
matrix.init('temperature').has().above(72)
```

###### < less then
`below`, `under`, 'before'
```
matrix.init('temperature').has().below(32)
```

###### between
```
matrix.init('face').has('happy').between(50,100)
```
