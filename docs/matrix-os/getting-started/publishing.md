<h2 style="padding-top: 0">Publishing your Application</h2>

>MATRIX App Store is in **early development**. All applications may be reviewed and are subject to removal at any time.


MATRIX applications can be published to the <a href="http://apps.matrix.one" target="_blank">MATRIX App Store</a> for users to share their IoT creations with the community.

![](/matrix-os/img/app-store.png)

<br/>
## Before publishing an application.

<h3 style="padding-top:0">Ensure Meta Information is Accurate</h3>
The following information goes into your MATRIX application's [`config.yaml`](/matrix-os/reference/configuration). The contents of your app's `README.md` will be shown on its detail page, along with any images provided.

**Required Meta Information**

* `name` - The CLI command `matrix install` will use this to find your app.

* `description` - Mini description shown in app preview.

* `displayName` - Name shown on the app store.

**Optional Meta Information:**

* `imageUrls` - will be used on the detail page

* `galleryUrl` - will be used on the main App Store page, or the first item in `imageUrls` will be used

* `keywords` - are used to tag your application and will be used to return your application on searches for these keywords.

* `categories` - are not yet formalized, but will divide the store listings. Submitting proposed app categories will inform this process.
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
All applications, which use events and sensors, must register these in the config file..


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

A user will be required to grant an application permissions before installing. A user may install an app with any or all permissions enabled.

<br/>

## Uploading An Application

Your application must do only what it claims to do with the name, description and README.md.

All sensors, integrations, and services must be registered in the [`config.yaml`](/matrix-os/reference/configuration). User's will give consent for each after installing your app.


To upload the your application, use the following [MATRIX CLI](/matrix-os/reference/cli-tool#development) command and point it to your app folder.

```
matrix publish YOUR_APP_FOLDER
```
