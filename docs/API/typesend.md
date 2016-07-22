# Send

Unless otherwise specified, sensor data is typed with the application name.

```
matrix.send({
  foo: 123
})
```

is read in a widget `config.yaml` ( See [Configuration>Widgets](../Configuration/widgets.md))

```
name: fooApp
widgets:
  fooWidget:
    display: digit,
    type: fooApp
    key: foo
```


# Type
Types are another way to organize the data coming off MatrixOS and make it easier to work with in dashboards.

```
matrix.type('bar').send({
  foo: 123
})
```
would instead be utilized with the following
```
name: fooApp
widgets:
  fooWidget:
    display: digit,
    type: bar
    key: foo
```

Types are also different ways of segmenting the data. When your application generates reports, types and keys will form the structure of that report. ( See [ Data Types ](../Configuration/datatypes.md) for more )
