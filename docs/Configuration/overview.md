# Configuration Overview

Configuration information is saved in the installation record for an app. It is provided by a `config.yaml` file inside the `app.matrix` directory.

This file undergoes several validations and transformations, so don't be surprised if a saved configuration is very different from a provided configuration. A finished configuration has `validated: true` in it.

## Intent
Configurations provide the following:

* Meta information, app name, description
* Policy information, for asking user permissions
* Data structure, what data to expect from an application
* Dashboard layouts, creating interfaces for widgets
* Widget definitions, what information and controls to display where in the interface
* Runtime configuration via `settings`, useful for api keys and the like.
