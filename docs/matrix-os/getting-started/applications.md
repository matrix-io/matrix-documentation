<h1 style="padding-top: 0">Creating An Application</h1>

## Introduction
MOS applications allow you to easily utilize the components and sensors of your MATRIX device through Javascript. This IoT platform enables you to create applications and integrate them with any third party API to expand the functionality of your MATRIX device.

## Initial Setup
MOS apps are designed to be developed outside your MATRIX device and deployed when you want to run your app. All that's required from your Raspberry Pi is to have MOS running.
>The following commands will be entered in the terminal that you installed the MATRIX CLI tool in.

Use the command below to create a MOS app which will generate a folder with the necessary files. You will be prompted to enter a quick description and optional keywords to describe this app.

```language-bash
matrix create YOUR_APP_NAME_HERE
```
The file structure will look like this:
```
YOUR_APP_FOLDER
    * app.js (Where you write your code)
    * config.yml (Configuration file for application)
    * index.js (Imports MATRIX libraries for use in app.js)
    * package.json (Defines npm modules to install on your MATRIX Device)
    * README.MD (Readme file for MATRIX App Store)
```

Open the app.js file and paste the code below with any text editor.
```language-javascript
matrix.led('green').render();//turn all LEDs green
```

<br/>
## Deploying Your App
With your MOS app completed, all that's left to do is run the following commands to deploy and then start the app on your MATRIX device.
```language-bash
matrix deploy PATH_TO_YOUR_APP_HERE
matrix start YOUR_APP_NAME_HERE
```
<h3 style="padding-top: 0">Preview</h3>
The interactive video below will show you the terminal outputs to expect from following this guide.
<script src="https://asciinema.org/a/MtmfX3q0tZxtrI4QwJ6t0COFe.js" id="asciicast-MtmfX3q0tZxtrI4QwJ6t0COFe" async></script>
<h3 style="padding-top: 0">Results</h3>
When the MOS app runs, your MATRIX device should look like the image below.

![](/matrix-os/img/green-led-test.png)

## [Next Steps](../reference)
View our reference page to see what you can with the MATRIX OS SDK.