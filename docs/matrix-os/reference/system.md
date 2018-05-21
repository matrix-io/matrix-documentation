<h2 style="padding-top:0">System Methods</h2>

Several methods are available for common computing use cases, like saving application variables, storing files or local database. These will be localized to the device and are not available across all instances of the application.

<br/>
## Settings
When an application requires a variable which should be user provided or will change between different instances, settings is a way to approach this problem.

<h3 style="padding-top:0">Config Setup</h3>
> You should have familiarity with [Configuration Files](configuration.md) before exploring further.

Add the `settings:` configuration to your app's config.yaml and specify each setting your app will save.
```language-bash
settings:
  apiKey: 'dfe972dc'
  secretKey: 'ea9e2dab'
```

Every key in settings is exposed on the root `matrix` object. For example, `settings.apiKey` is accessible in your MATRIX app as `matrix.apiKey`.

```language-javascript
console.log(matrix.apiKey);// prints your apiKey setting
```

<h3 style="padding-top:0">Dynamically Changing Settings from an application</h3>
> Currently, the setting will only be overwritten after the MATRIX app restarts.

```language-javascript
matrix.set({ apiKey: '3c3cce95' });// Overrides matrix.apiKey
matrix.set({ secretKey: '08937cef' });// Overrides matrix.apiKey
```

<!-- 
### Changing application instance settings

After a user installs the application, they can change the settings from the CLI tool.

```language-bash
matrix config appName apiKey=myrealapikeydontcopy
``` 
-->

<br/>
## Local Database

MATRIX OS provides a local, file-based key-value store for app usage. This storage is globally accessible to any application installed on the same device. 
> It is not recommended to set end user specific configurations here. use [settings](#settings) instead.

<h3 style="padding-top:0">Set</h3>
Defines the name of the a `key` and the `value` it'll hold in the local database.
```language-javascript
matrix.store.set(key, value, function(){
  //...
});
```

<h3 style="padding-top:0">Get</h3>
Obtains the `value` of a stored `key` in the local database. The value is passed to the `callback`.
```language-javascript
matrix.store.get(key, function(error, value){
  console.log(value);// prints key value
});
```

<h3 style="padding-top:0">Delete</h3>
Remove a stored `key` from the local database.
```language-javascript
matrix.store.delete(key, function(){
  //...
});
```

<br/>
## File Storage

MATRIX applications utilize a local file storage for storing files. This enables MATRIX applications to dynamically download content that was not initially packaged with the app.

<h3 style="padding-top:0">Save</h3>
Downloads and stores a file specified through a URL.

* `url` publicly accessible url.
* `filename` name of the file being saved.
* `callback` function to call when save is complete.
```language-javascript
matrix.file.save(url, filename, function(){
  //..
});
```

<h3 style="padding-top:0">Load</h3>
Load the buffer of a file you saved.

* `filename` file to load.
* `callback` function to call after file is read

```language-javascript
matrix.file.load(filename, function(error, data){
  console.log(data);// prints buffer of loaded file
});
```

<h3 style="padding-top:0">List</h3>
See all currently stored files in application.

* `callback` function to call after files are counted

```language-javascript
matrix.file.list(function(error, files){
  console.log(files);// prints array of downloaded files
})
```

<h3 style="padding-top:0">Remove</h3>
* `filename` file to remove from application storage
* `callback` function to call when remove is complete

```language-javascript
matrix.file.remove(filename, function(){
  //..
});
```
