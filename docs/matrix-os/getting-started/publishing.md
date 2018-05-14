<h1 style="padding-top: 0">Publishing your Application</h1>

MATRIX applications can be published to the <a href="http://apps.matrix.one" target="_blank">MATRIX App Store</a> for users to share their IoT creations with the community.


## Uploading An Application
<!-- - Publish on the app Store -->
To upload the your application, you'll need to use the following [MATRIX CLI](/matrix-os/reference/cli-tool) command and point it to your app folder.
```language-bash
matrix publish YOUR_APP_FOLDER
```
<br/>
## Guidelines
Your application must do only what it claims to do with the name, description and README.md.

All sensors, integrations and computer vision usage must be registered in the [`config.yaml`](/matrix-os/reference/configuration), and will be authorized by users on install.

All applications will be code reviewed and are subject to removal at any time.

<br/>
## Before publishing an application.

<h3 style="padding-top:0">Ensure Meta Information is Accurate</h3>
`name` and `description` must be included in your [`config.yaml`](/matrix-os/reference/configuration). If you want to use a multiword application name, provide a `displayName` with a correlating `name`. Users will need to use your app's `name` to download it with the `matrix install` command.

The contents of `README.md` will be shown on the app detail page, along with images provided
`imageUrls` will be used on the detail page

`galleryUrl` will be used on the main App Store page, or the first item in `imageUrls` will be used

`keywords` are used to tag your application and will be used to return your application on searches for these keywords.

`categories` are not yet formalized, but will divide the store listings. Submitting proposed app categories will inform this process.
```language-yaml
#example config.yaml

name: example-app
displayName: The Example App
description: An example application config.yaml.

imageUrls:
  - http://image.com/1
  - http://image.com/2

galleryUrl: http://image.com/3

keywords:
  - example
  - configuration

categories:
  - entertainment
  - development
```

<h3 style="padding-top:0">Ensure Components are Setup</h3>
All applications which use events, computer vision or sensors, must register these in the config file. Your app will not be published if this metadata is missing.

<h4 style="padding-top:0">Events</h4>
```language-yaml
events:
  - face-recognized
  - locked-door
```

<h4 style="padding-top:0">Sensors</h4>
```language-yaml
sensors:
  - temperature
  - uv
```

<h4 style="padding-top:0">Computer Vision</h4>
```language-yaml
services:
  faceService:
    engine: detection
    type: face
```

A user will be required to grant an application permissions before installing. A user may install an app with any or all permissions enabled.

<br/>
## Test your Application

Use `matrix deploy` to test your application before publishing. Make sure it functions as intended. Share a video of your creation with us!
