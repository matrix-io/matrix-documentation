# Workflow

## Application
Each application has an `config.yaml` file which determines several things.

1. How to evaluate and categorize the application for the MatrixOS app Store
1. Application dashboard widget layout, display and data sources
1. Runtime variables used by Matrix applications
1. Fixed data structure for saving information and routing to dashboard.
1. What external services, such as CV and sensors, will be used, and how will they be provided to the app.

External services can also be coded in the application directly.

## Deployment
Configurations are written on deployment ( see [matrix deploy](../CLI/apps.md) ). If you change the `config.yaml`, you must deploy the application again. Otherwise you can change configuration using `matrix set config`.

## Data Types
If you've setup a migration or an SQL table, this is a very simple structure to tell the application what sort of data you will be passing around.

```
dataTypes:
  foobar: integer
```

See [Data Types](datatypes.md)

## Screens & Widgets
Two root nodes. `screens` and `widgets` work together to determine layout and content.

### Screens
Screens notates a nested array which informs the dashboard how to layout the widgets.
```
screens:
  - - a
    - b
    - foo
  - - 1
    - 2
    - 3

// => turns into

[ [ a, b, foo ], [ 1, 2, 3 ] ]
```
Sub arrays correlates to rows in a display.
The above would display on the dashboard as follows:
```
[a][b][foo]
[1][2][3]
```
The value in the array corresponds to a widget name.

### Widgets
Widgets describe the module to load inside a designated screen.
```
widgets:
  foo:
    # type defines what type of data this widget should display
    type: foobar
    # if provided, label shows above each widget
    label: Foo widget
```

For more info see [Screens & Widgets](screens.md)
