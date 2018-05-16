## Cross-Talk

Cross-Talk events allow MATRIX applications to exchange information between different devices, or on the same device. For example, a temperature monitor app can output an event to an alarm app to notify you when the current temperature is too high or low. Cross-Talk events will only be sent to MATRIX devices tied to the same MATRIX Labs account.

## Config Setup
> You should have familiarity with [Configuration Files](configuration.md) before exploring Sensors.

CrossTalk requires each event, that will be emitted, in your app's configuration file to execute successfully. This information is also used in the app store to determine which applications can communicate via events.

<h3 style="padding-top:0;">Defining An Event</h3>
Add the `events:` configuration to your app's config.yaml and give each event your app will emit. Do not add this to an app's configuration if they are only going to listen for events.
```language-yaml
events:
  - flashGreen
  - flashBlue
```

<br/>
## Event Emitters & Listeners
Once your app has its events properly defined, you can use `matrix.emit` to broadcast the event to other MATRIX apps and `matrix.on` to receive them.

<h3 style="padding-top:0;">.emit(app, event, payload)</h3>
Use this function in the application that has the events defined in the config.yaml file.

* `app` MATRIX app you're sending the event to.
* `event` Event being sent to MATRIX app.
* `payload` Optional object or string to attach to event being sent.
```language-javascript
// Trigger an event in a specific application
matrix.emit('app', 'event', payload);

// Example 1
matrix.emit('ledControl', 'flashGreen');

// Example 2
matrix.emit('alarm', 'highTemperature', {temperature: 80.95899963378906}');

```
<h3 style="padding-top:0;">.on(event, callback)</h3>
Use this function in the application that will receive the events. Applications that receive events do not need to specify the events in its config.yaml.

* `event` Event to listen on.
* `callback` Callback method with payload returned.
```language-javascript
// Listen for CrossTalk events sent to this application
matrix.on('event', function(payload) {
  ...
});

// Example 1
matrix.on('flashGreen', function(){
  ...
});

// Example 2
matrix.on('highTemperature', function(payload){
  ...
});

```

<br/>
## Dashboard
Receive events from the MATRIX Dashboard by binding them to widget controls.
```language-javascript
// Interface elements from Dashboards can also trigger CrossTalk events.
matrix.on('buttonClick', function(payload) { ... });
```
See [Configuration > Widgets](../reference/widgets#Buttons) for the entire list.
