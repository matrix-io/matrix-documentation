## Dashboard

Login to your [MATRIX Dashboard](http://dash.matrix.one).

### One dashboard per application
Dashboards consist of widgets which are defined in a [configuration file](configuration.yaml), `config.yaml`. Widgets provide readouts for data coming from a MATRIX application, or widgets can provide controls for users to modify how applications operate.

### Widgets
Widgets are configured via `config.yaml` under the `widgets` key.
See [Reference > Widget Examples](../reference/widgets.md) for more detailed information about widget configuration.

#### Layout via `screens`
`screens` and `widgets` are both global entries in the `config.yaml`. `screens` provides for a data-structure driven layout, where each row is a defined list of widgets. So if we have one array:

```
screens:
  - leftWidget
  - rightWidget

widgets:
  leftWidget: ...
  rightWidget: ...
```
The widgets will end up left 50% and right 50%. This way we can easily distinguish between layout and functionality.

#### Nesting Widgets
You can use nesting within the `screens` data structure to further customize the layout. This example would produce two rows, the first with two panels, the second with three.

```
screens:
  - - topLeft
    - topRight
  - - bottomLeft
    - bottomCenter
    - bottomRight
```


#### Devices and Applications
Inside the dahsboard should be able to navigate to your active devices and applications. The dashboard for each application consists of widgets which display data from the selected devices.
