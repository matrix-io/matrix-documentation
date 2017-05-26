## Settings

When an application requires a variable which should be user defined, and will change between different installations, settings is a way to approach this problem.

### Config.yaml
In your config enter the following.

```
name: appName
settings:
  apiKey: 'enteryourapikey'
```

### app.js
Everything in settings is exposed on the root `matrix` object.
```
service.auth( matrix.apikey ).then( ... );
```

### userland
After a user installs the application, they can change the settings from the CLI tool, or in the future, from the dashboard.

`matrix config appName apiKey=myrealapikeydontcopy`

