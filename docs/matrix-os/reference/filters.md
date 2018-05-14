## Filters

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

MatrixOS sensors and computer vision algorithms provide data which can be filtered between the `sensor`, which can be regarded as the data source, and the `then`, which can be regarded as the data receiver. Between the two, we can use chaining methods to easily filter what data is received.

```language-javascript
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
```language-javascript
matrix.sensor('temperature').is(72)
```

### negation
`not()`
```language-javascript
matrix.sensor('temperature').not(72)
```

### has
`has()` is used to refine a data source by additional criteria and keys.

```language-javascript
// for simple sensors
matrix.sensor('temperature').has('value')
// equivalent to
matrix.sensor('temperature').has()

// for complex sensors
matrix.sensor('gyroscope').has('x')

```

### bounds
###### > greater then
`above`, `over`, `after`
```language-javascript
matrix.sensor('temperature').has().above(72)
```

###### < less then
`below`, `under`, `before`
```language-javascript
matrix.sensor('temperature').has().below(32)
```

###### between
```language-javascript
matrix.service('face').start().has('happy').between(50,100)
```
