## Local Database

MATRIX OS has a local, file-based key-value store for app usage.

It is not recommended to set end user specific configurations here, and use `config.yaml>settings` instead.

## Get
```
matrix.store.get(key, cb)
```

## Set
```
matrix.store.set(key, value, cb)
```

## Delete
```
matrix.store.delete(key, cb)
```
