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
