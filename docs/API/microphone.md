```
matrix.init('microphone').contains('hello world')
```

## Directional array
Individual microphones can be toggled as follows.
```
matrix.init('microphone', {
// degrees
  source: 90,
// or by index
  sensor: 5
});
```

## Filtering
```
matrix.init('microphone').has('db').above(155).then()
```
`db`, `fft`
