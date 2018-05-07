⚠️ **CURRENTLY IN DEVELOPMENT**

## Voice Control

MATRIX OS provides for voice recognition via wakeword detection. "Hey Siri", "Alexa", "Ok Google" are examples of common wakewords used in commercial products. The default wakeword for MATRIX OS is "Matrix", however, you can train any wakeword you want.

### Configuration 
```
services:
  customListener:
    engine: voice
    phrase: hey joe
```

### Wakeword Training
```
matrix.listen('hey joe', function(err, phrase){

});

// equivalent to

matrix.listen('customListener', function(err, phrase){

});

// equivalent to

matrix.service('voice').listen('hey joe', function(err, phrase){

});

// equivalent to 
matrix.service('customListener').listen(function(err, phrase){

})
``` 

