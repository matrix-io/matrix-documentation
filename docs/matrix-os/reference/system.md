# System Methods
Several methods are available for common computing use cases, like application instance settings, storing files or persistant data lookups. These will be localized to the device and are not available across all instances of the application.

## Settings
When an application requires a variable which should be user provided or will change between different installations, settings is a way to approach this problem.

### Example
```
# in config.yaml
name: appName
settings:
  apiKey: 'enteryourapikey'
```

Every key in settings is exposed on the root `matrix` object. Here, `settings.apiKey` is available in the application environment as `matrix.apiKey`.

```
# in app.js
externalService.auth({ key:  matrix.apiKey }).then( ... );
```

### Changing application instance settings
After a user installs the application, they can change the settings from the CLI tool.

`matrix config appName apiKey=myrealapikeydontcopy`



## Local Database

MATRIX OS provides a local, file-based key-value store for app usage. This is available across applications.

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

## File Storage

MATRIX applications utilize a shared file storage, so files saved with one application are accessible from another.

### Save
```
// url - publically accessible url
// filename - what to save this file as
// cb - function to call when save is complete
matrix.file.save( url, filename, cb )
```

### Load
```
// filename - file to load
// cb - function to call after file is read, passed (err, data)
matrix.file.load(filename, cb)
```

### List
```
matrix.file.list(filename, function(err, files){
  // files is an array of file names
})
```

### Remove
```
// filename - what file to Remove
// cb - function to call when remove is complete
matrix.file.remove( filename, cb )
```
