Here we will demonstrate a simple IFTTT integration to alert you to weather outside.

> You should know the basics of application creation and deployment. See [Application Workflow Example](app-create.md) for more information.


### IFTTT Setup
First, get an account at <http://ifttt.com>.

* Click on the profile menu on the right and select `New Applet` and click on `this`

![IFTTT 1](../img/ifttt-1.png)

* Select the Weather Underground Icon

![IFTTT 2](../img/ifttt-2.png)

* Select `Current Condition Changes To`

![IFTTT 3](../img/ifttt-3.png)

* Select Rain from the Dropdown

![IFTTT 4](../img/ifttt-4.png)

* Select `that`

![IFTTT 5](../img/ifttt-5.png)

* Type in and select `matrix-io`

![IFTTT 6](../img/ifttt-6.png)

* Connect with matrix-os

![IFTTT 7](../img/ifttt-7.png)

* Login with your MATRIX Credentials

![IFTTT 8](../img/ifttt-8.png)

* Allow IFTTT access to your MATRIX account

![IFTTT 9](../img/ifttt-9.png) 

* Choose `Send a MATRIX Event` action

![IFTTT 10](../img/ifttt-10.png)

* Fill out details for your event. We are selecting to use an event named `weather-change` and passing the `Condition` (which should be "Rain").

![IFTTT 11](../img/ifttt-11.png)

* Finish making your applet.

![IFTTT 12](../img/ifttt-12.png)

### MOS Application Code

* Create the application
```
$ matrix create rain-oracle
$ cd rain-oracle

# first we setup the config
$ vi config.yaml
```

* Add to the `config.yaml`
```
integrations:
  - ifttt

events: 
  - weather-change
```

* Create `app.js`
```
matrix.on('weather-change', (condition) => {
  if ( condition === 'Rain'){
    matrix.led('blue').render();  
  }
})
```

* Deploy to device and start (ensure device is selected with `matrix use`)
```
$ matrix deploy

# start application
$ matrix start rain-oracle
```