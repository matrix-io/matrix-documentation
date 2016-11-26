# Widgets

A comprehensive overview coming soon. See [examples](examples.md) for now.


## Layout

Widgets are defined in the `widgets` key of an app config file. This is a collection where each Widget has a keyed name which is associated with an entry in `screens` to determine it's location on the dashboard.

```
screens:
  - leftWidget
  - rightWidget

widgets:
  leftWidget: ...
  rightWidget: ...
```

This way we can easily distinguish between layout and functionality.


## Data Handling
The dashboard holds a central data store which the widgets receive or request data from.

Default operation is for a widget to be updated with data in real time. This is represented by enabling the option `realtime`:

```
// To enable realtime updates
widgets:
  testWidget:
     realtime: true
```

The alternative is to have a widget manually refresh it's data on an interval by disabling `realtime`. Default `refresh` is 5 seconds. If you wanted to refresh a graph every minute:

```
// To disable realtime updates
widgets:
  testWidget:
     realtime: false
     refresh: 60
```

## Display widgets
Indicated via a `display` option.

`bar` - bar chart

`digit` - numerical

`radar` - radar chart

`line` - line chart

`list` - data table

`list-group` - grouped data table

`pie-chart` - pie chart

`polar` - polar area chart

`label` - string display

`gauge` - gauge

`indicator` -  light indicator on/off

`map` - map

``

## Interactive Widgets
Indicated via a `control` option.

`button` - button, single or multiple

`dropdown` - dropdown menu

`range` - range slider
