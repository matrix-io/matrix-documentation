
## Send

This will save this particular data and make it accessible in realtime via dashboard. 

Each piece of data must have a type defined. Unless otherwise specified, sensor data is typed with the application name.

Types must be defined in the config file using `dataTypes`. ( See [Configuration>Datatypes](../Configuration/datatypes.md))

```
dataTypes:
  foo: integer

matrix.send({
  foo: 123
})
```



# Type
Types are a way to organize the data coming off MatrixOS and make it easier to work with in dashboards.

```
matrix.type('bar').send({
  foo: 123
})
```
would be utilized with the following
```
name: fooApp
widgets:
  fooWidget:
    display: digit,
    type: bar
    key: foo
```

Types are a way of segmenting data from the device for use by end-user applications. When your application generates reports, types and keys will form the structure of that report. ( See [ Data Types ](../Configuration/datatypes.md) for more )


### Widget Use
Example widget `config.yaml` using `type` ( See [Configuration>Widgets](../Configuration/widgets.md))

```
matrix.send({...});

name: fooApp
widgets:
  fooWidget:
    display: digit,
    type: fooApp
    key: foo
```

```
matrix.type('foo').send({...})

name: fooApp
widgets:
  fooTime:
    display: chart
    type: foo
    keys: a,b,c
```
