## Introduction
MOS applications allow you to easily utilize the components and sensors of your MATRIX device through Javascript. This IoT platform enables you to create applications and integrate them with any third party API to expand the functionality of your MATRIX device.

<script src="https://asciinema.org/a/IQattOMy0TEQwthojttWEwAGO.js" id="asciicast-IQattOMy0TEQwthojttWEwAGO" async></script>

## Initial Setup
MOS apps are designed to be developed outside your MATRIX device and deployed when you want to run your app. All that's required from your Raspberry Pi is to have MOS running.
>The following commands will be entered in the terminal that you installed the MATRIX CLI tool in.

Use the command below to create a MOS app which will generate a folder with the necessary files. You will be prompted to enter a quick description and optional keywords to describe this app.

```language-bash
matrix create YOU_APP_NAME_HERE
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

Your app is now ready to deploy to your MATRIX device.


