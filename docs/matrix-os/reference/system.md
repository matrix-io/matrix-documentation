# System Methods

Several methods are available for common computing use cases, like application instance settings, storing files or persistant data lookups. These will be localized to the device and are not available across all instances of the application.

## Settings

When an application requires a variable which should be user provided or will change between different installations, settings is a way to approach this problem.

### Example

```language-bash
# in config.yaml
name: appName
settings:
  apiKey: 'enteryourapikey'
```

Every key in settings is exposed on the root `matrix` object. Here, `settings.apiKey` is available in the application environment as `matrix.apiKey`.

```language-bash
# in app.js
externalService.auth({ key:  matrix.apiKey }).then( ... );
```

### Dynamically Changing Settings from an application
```language-js
matrix.set({ apiKey: 'newkey' });
```

### Changing application instance settings

After a user installs the application, they can change the settings from the CLI tool.

```language-bash
matrix config appName apiKey=myrealapikeydontcopy
```


## Local Database

MATRIX OS provides a local, file-based key-value store for app usage. This is available across applications.

It is not recommended to set end user specific configurations here, and use `config.yaml>settings` instead.

## Get

```language-js
matrix.store.get(key, cb)
```

## Set

```language-js
matrix.store.set(key, value, cb)
```

## Delete

```language-js
matrix.store.delete(key, cb)
```

## File Storage

MATRIX applications utilize a shared file storage, so files saved with one application are accessible from another.

### Save

```language-js
// url - publically accessible url
// filename - what to save this file as
// cb - function to call when save is complete
matrix.file.save( url, filename, cb )
```

### Load

```language-js
// filename - file to load
// cb - function to call after file is read, passed (err, data)
matrix.file.load(filename, cb)
```

### List

```language-js
matrix.file.list(filename, function(err, files){
  // files is an array of file names
})
```

### Remove

```language-js
// filename - what file to Remove
// cb - function to call when remove is complete
matrix.file.remove( filename, cb )
```
