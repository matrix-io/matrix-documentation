# Publishing your Application

## App Store
[http://apps.matrix.one]()

## Three Steps to Distribution

1. `matrix create` - Make your application
1. `matrix deploy` - Test your application
1. `matrix publish` - Publish on the app Store

## Guidelines
Your application must do only what it claims to do with the name, description and README.md.

All sensors, integrations and computer vision usage must be registered in the `config.yaml`, and will be authorized by users on install.

All applications will be code-reviewed and are subject to removal at any time.

## Before publishing an application.

### Ensure Meta Information is Accurate
`name` and `description` must be included in your config.yaml. If you want to use a multiword application name, provide a `displayName` with a correlating `name`. Users will use `name` when `matrix install`ing.

The contents of `README.md` will be shown on the app detail page, along with images provided
`imageUrls` will be used on the detail page

`galleryUrl` will be used on the main App Store page, or the first item in `imageUrls` will be used

`keywords` are used to tag your application and will be used to return your application on searches for these keywords.

`categories` are not yet formalized, but will divide the store listings. Submitting proposed app categories will inform this process.
```
example config.yaml

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

### Ensure Components are Setup
All applications which use events, CV or sensors, must register these in the config file.

`events` are registered as follows:

#### Events
```
events:
  - face-recognized
  - locked-door
```

#### Sensors
```
sensors:
  - temperature
  - uv
```

#### Computer Vision
```
services:
  faceService:
    engine: detection
    type: face
```

A user will be required to grant an application permissions before installing. A user may install an app with any or all permissions enabled.

### Test your Application

Use `matrix deploy` to test your application before publishing. Make sure it functions as intended. Share a video of your creation with us!
