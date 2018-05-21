<h2 style="padding-top:0">Creating a Dashboard</h2>

![](/matrix-os/img/dashboard-example-result.png)

In this example we will demonstrate how to make a MATRIX Dashboard that can read and send data from your MATRIX device. The final result will your MATRIX device flickering its LEDs green and sending a random number to the dashboard, once the user presses a button.

> You should have familiarity with [Data Types](/matrix-os/reference/data-types.md), [Cross Talk](/matrix-os/reference/crosstalk.md), [Dashboard](/matrix-os/reference/dashboard.md), and the [Getting Started](/matrix-os/getting-started) section before exploring further. 

## Setting Up Your Application
<h3 style="padding-top:0">Create Your App</h3>
With the, MATRIX CLI tool installed, go to the terminal on your personal computer and insert the following command.
```language-bash
matrix create exampleDashboard
```

<h3 style="padding-top:0">Config.yaml</h3>
We will be setting up the app's `config.yaml` page in order to define the layout of our dashboard, dataTypes, and events.

* `datatypes` - Will define the variable that will save the random number we create.

* `screens` - Determines the placement of widgets.

* `widgets` - Our two dashboard components to visualize the random number we generate and command our MATRIX device to make that number.

* `Events` - Events doesn't have to be specified here because we are not sending one from our app, but receiving it from the `startButton` widget we made. View [Cross Talk](/matrix-os/reference/crosstalk.md) to learn more.

```language-yaml
configVersion: 2

description: 'Example dashboard to learn from.'
keywords: dashboard example
name: exampleDashboard
shortName: exampleDashboard
displayName: Example Dashboard

dataTypes:
  #Holds the value shown on the dashboard
  randomNumber:
    number: integer

screens:
#This will show both widgets in the same Row
- - numberGenerator
  - startButton

widgets:
  #Displays a randomly generated number
  numberGenerator:
    display: digit
    type: randomNumber
    key: number
    label: Random Number
  #Calls number generator
  startButton:
    control: button
    event: generateNumber
    value: Get Random Number
    label: Start Number Generator
```
<br/>
## Writing Your Application
The following code below goes into your application's `app.js` file. The code can be split into two parts. The first is a simple function to turn on and off your MATRIX device's LEDs. The second part waits for the dashboard `generateNumber` event from the `startButton` widget. Once the event goes off, the previous function is called and a random number is created and sent to the dashboard's `numberGenerator` widget.

```language-javascript
// - Turn LEDs on and then off
function flickerLights(color){
    matrix.led(color).render();// Turn LEDs green
    // Wait 1 second
    setTimeout(function(){
        matrix.led('black').render();// Turn LEDs off
    },500);
}

// - On Dashboard Button Press
matrix.on('generateNumber', function(){
    flickerLights('green');// Flicker MATRIX Device LEDs

    var randomNumber = Math.floor(Math.random()*100);// Generate a random number between 0 and 99
    // Send Number To Dashboard
    matrix.type('randomNumber').send({
        'number': randomNumber
    });
});
```
<br/>
## Deploying Your Application
You application should now be ready to deploy. Use the following command, with the location of your app folder, to send the app to your MATRIX device.
```
matrix deploy PATH_TO_YOUR_APP_HERE
```

After it's deployed, you can start the app with the final command below.
```language-bash
matrix start exampleDashboard
```
<h3 style="padding-top:0">Final Result</h3>
Visit the [MATRIX Dashboard](https://dash.matrix.one) to see the example you've deployed. Use the "Get Random Number Button" to test the number generator and LEDs flashing. 
![](/matrix-os/img/dashboard-example-demo.gif)

Alternatively, you can use the following command if you want to test sending a Cross Talk command through the MATRIX CLI tool.
```matrix-bash
matrix trigger generateNumber
```