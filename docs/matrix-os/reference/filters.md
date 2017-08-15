## Filters

MatrixOS sensors and computer vision algorithms provide data which can be filtered between the `sensor`, which can be regarded as the data source, and the `then`, which can be regarded as the data receiver. Between the two, we can use chaining methods to easily filter what data is received.

```
// filtering in a simple application
matrix.sensor('temperature')
.above(80)
.then(data => {
  // see CrossTalk documentation for more information about matrix.emit
  matrix.emit('ac-control', 'turnOn');
});
```

Filtering decides whether or not a data point is passed to the `then()`, it does not change the data in any way.

## Simple Filtering methods

### equality

###### Numeric
`is()` `like()`
```
matrix.sensor('temperature').is(72)
```
<!--
###### String
```
matrix.sensor('microphone').contains('hello world')
```-->

### negation
`not()`
```
matrix.sensor('temperature').not(72)
```
<!--
### proximity
`near()`
```
matrix.sensor('gps').near([39.0432661,117.7249414])
```-->

### has
`has()` is used to refine a data source by additional criteria and keys.

```
// for simple sensors
matrix.sensor('temperature').has('value')
// equivalent to
matrix.sensor('temperature').has()

// for complex sensors
matrix.sensor('gyroscope').has('x')

```

### bounds
###### > greater then
`above`, `over`, 'after'
```
matrix.sensor('temperature').has().above(72)
```

###### < less then
`below`, `under`, 'before'
```
matrix.sensor('temperature').has().below(32)
```

###### between
```
matrix.service('face').start().has('happy').between(50,100)
```
