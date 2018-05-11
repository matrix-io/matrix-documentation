## Dashboard

Login to your [MATRIX Dashboard](http://dash.matrix.one).

### One dashboard per application
Dashboards consist of widgets which are defined in a [configuration file](configuration.md), `config.yaml`. Widgets provide readouts for data coming from a MATRIX application, or widgets can provide controls for users to modify how applications operate.

### Widgets
Widgets are configured via `config.yaml` under the `widgets` key. See [Reference > Widget Examples](../reference/widgets.md) for more detailed information about widget configuration.

### Screens
Screens use structured data to represent layouts. One array represents a row, elements of that array are columns within that row. Widget names must be used in the `screens` array to link the layout with the configuration widget object.

This means that every `screen` must be a nested array. In YAML, ``[[a, b]]`` is represented by

```yaml
screens:
  - - a
    - b
```
It's not pretty, but it allows us much design flexibility in a configuration file. 

For example, this creates a dashboard with two widgets in one row, each taking up 50% of the available width.
```yaml
screens:
  - - leftWidget
    - rightWidget

widgets:
  leftWidget: ...
  rightWidget: ...
```

You can use nesting within the `screens` data structure to further customize the layout.

This example would produce two rows, the first with two panels, the second with three.

```yaml
screens:
  - - topLeft
    - topRight
  - - bottomLeft
    - bottomCenter
    - bottomRight
```

#### Devices and Applications
Inside the dahsboard should be able to navigate to your active devices and applications. The dashboard for each application consists of widgets which display data from the selected devices.