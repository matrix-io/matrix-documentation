### Screens
MATRIX Dashboards are made up of [widgets](widgets/md), and the `screens` option in the [configuration](../overview/configuration.md) file, `config.yaml` determines how they are arranged and laid out.

`screens` uses structured data to represnent layouts. One array represents a row, elements of that array are columns within that row. Widget names must be used in the `screens` array to link the layout with the configuration widget object.

For example, this creates a dashboard with two widgets in one row, each taking up 50% of the available width.
```
screens:
  - leftWidget
  - rightWidget

widgets:
  leftWidget: ...
  rightWidget: ...
```

You can use nesting within the `screens` data structure to further customize the layout.

This example would produce two rows, the first with two panels, the second with three.

```
screens:
  - - topLeft
    - topRight
  - - bottomLeft
    - bottomCenter
    - bottomRight
```
