# Sending Data From MATRIX Devices

MATRIX devices will only externally store data if it is explicitly sent via an application. If you want to use MATRIX Dashboard components to work with your data, it will need to be exported using the `send` command.

Enabling a MATRIX application to save information using `send` requires a *Data Type* to be configured.

> You should have familiarity with [Configuration Files](configuration.md) before exploring Data Types. 

## Data Types
Simple applications can have a single, universal datatype, or a more complicated, keyed object. If you are familiar with database schemas, we have adopted a similiar approach.

### Single Datatype

```yaml
# in app config.yaml 
dataTypes:
  foo: string
  bar: integer
```

### Complex Datatype

```yaml
# in config.yaml
dataTypes:
  foo:
    foo1 : integer
    fooA : string
  bar:
    bar1: integer
    barA: string
```

In the above example `foo` and `bar` are *Types* available to extend the `send` command, and to use with Widgets in the Dashboard.

### Migrations - IMPORTANT

We do not currently support changing dataTypes for newer versions of an application. If you need to change dataTypes after an application is published, please release a new application until we can address this issue.


## Send

Once a datatype is defined, you can save data and make it accessible in realtime via dashboard. 

### Simple Send Example

```yaml
# config.yaml
dataTypes:
  foo: integer
```

```js
// app.js
matrix.send({
  foo: 123
})
```



## Types

Types are a mechanism for segmenting the data coming off MatrixOS and make it available in end user applications, dashboards and reports.

### Complex Send Example

```js
matrix.type('bar').send({
  foo: 123
})

```

would be utilized with the following widget

```
name: fooApp
dataTypes:
  bar:
    foo: integer

widgets:
  fooWidget:
    display: digit,
    type: bar
    key: foo
```
