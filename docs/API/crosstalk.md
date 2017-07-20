## Cross-Talk
Cross-Talk is a mechanism for applications to communicate, whether on the same device, or on different devices. Applications can exchange information with other applications, or with other instances of the same application. All messages get sent to all devices, so if you have the same app running on different devices, this is how to communicate between installations of the same app.

## Overview
Cross talk events are publicly searchable by app, and allow MATRIX applications to easily exchange information between devices, or on the same device. For example, a face detection application could trigger a `face-in`, which is heard by a [configured](../Configuration/overview.md) and [trained](computer-vision.md) recognition program.

## Config Setup
CrossTalk requires setup in configuration to execute successfully. This information is also used in the app store to determine which applications can communicate via events.

### Global
```
events:
  - globalEvent
```
### App Targeted
```
events:
  - appName
```
### App/Event Targeted
```
events:
  - appname:
    - eventname
```

## Global Emitters & Listeners
Global messages that can be received across applications, devices, and clients. e.g. Emit from one device, receive on another.
###.emit(payload)
* `payload` Object or string to pass through to retrieve with the listener.
```
// Send a payload to all listeners
matrix.emit(payload);
```
###.on(cb)
* `cb` Callback method with `payload` returned.
```
// Listen for global CrossTalk messages
matrix.on(function(payload) { ... });
```

## App Specific Message
Messages that can be shared across applications on a single device.
###.emit(app, payload)
* `app` Label to later listen for.
* `payload` Object or string to pass through to retrieve with the listener.
```
// Send a message to a particular application
matrix.emit('app', payload);
```
###.on(cb)
* `cb` Callback method with payload returned.
```
// Listen for application specific CrossTalk messages
matrix.on(function(payload) { ... });
```
## Specific Event within App
Messages that can be filtered by application, and an event type.
###.emit(app, event, payload)
* `app` Label to later listen for.
* `event` Event scope within `app` to listen for.
* `payload` Object or string to pass through to retrieve with the listener.
```
// Trigger an event in a specific application
matrix.emit('app', 'event', payload);
```
###.on(event, cb)
* `event` Event to listen on.
* `cb` Callback method with payload returned.
```
// Listen for CrossTalk events sent to this application
matrix.on('event', function(payload) { ... });
```
## Dashboard
Receive events from web or mobile by binding them to widget controls.
```
// Interface elements from Dashboards can also trigger CrossTalk events.
matrix.on('buttonClick', function(payload) { ... });
```
### Configuration-Driven Events
See [Configuration > Widgets](../Configuration/widgets.md)
