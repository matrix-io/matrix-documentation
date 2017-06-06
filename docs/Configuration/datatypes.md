# dataTypes
We experimented with a loosely defined data structure, where the system would dynamically type information for storage and retrieval. This may return in the future, but for now, we need to clearly define data structures and types.

This is only useful if the application is `matrix.send()`ing information for storage and/or dashboard use.

## types
Types are segments of your data. These are used for filtering in the dashboard.

## data
There are two ways to structure data types

### implicit data type names
```yaml
dataTypes:
  foo: string
  bar: integer
```
```
# matrix.send({ foo: 'abc', bar: 123 })
```

### explicit data type names
```
dataTypes:
  type1:
    foo: string
  type2:
    bar: integer
```
```
# matrix.type('type1').send({foo: 'abc'})
# matrix.type('type2').send({bar: 123})
```

## options
Here is the regex object for the different data formats.

```
regex: {
  string :/(string|str|s)/,
  object :/(object|obj|o)/,
  float :/(float|fl|f)/,
  integer :/(integer|int|i)/,
  boolean :/(b|bool|boolean)/,
}
```

This is so you can do.
```
dataTypes:
  foo1: s
  foo2: s
  foo3: o
```

## Caution
MATRIX doesn't yet have a schema migration mechanism in place. While this is an issue, in the process of developing your application if you discover you need to change dataTypes, we recommend making a new application.
