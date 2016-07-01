# Cross-Talk

CrossTalk is how MatrixOS applications communicate between different devices. Applications can exchange information with other applications, or with other instances of the same application. Cool, right?

## Global Emitters & Listeners
```
// Send a payload to all listeners
matrix.emit(payload);

// Listen for global CrossTalk messages
matrix.on(function(payload) { ... });
```

## App Specific Message
```
// Send a message to a particular application
matrix.emit('app', payload);

// Listen for application specific CrossTalk messages
matrix.on(function(payload) { ... });
```
## Specific Event within App
```
// Trigger an event in a specific application
matrix.emit('app', 'event', payload);

// Listen for CrossTalk events sent to this application
matrix.on('event', function(payload) { ... });
```
## Dashboard
```
// Interface elements from Dashboards can also trigger CrossTalk events.
matrix.on('buttonClick', function(payload) { ... });
```
see [docs/configuration/widgets]() for more information
