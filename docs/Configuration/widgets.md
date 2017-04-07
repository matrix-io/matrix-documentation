# Widgets

A comprehensive overview coming soon. See [examples](examples.md) for now.


## Layout

Widgets are defined in the `widgets` key of an app config file. This is a collection where each Widget has a keyed name which is associated with an entry in `screens` to determine it's location on the dashboard or the mobile apps.

```
screens:
  - leftWidget
  - rightWidget

widgets:
  leftWidget: ...
  rightWidget: ...
```

This way we can easily distinguish between layout and functionality.

## Data Operations

Using `format`, data operations can be applied to each Display Widget. The current widget configuration supports the operations: `count`, `sum`, `avg`, `percent`, `max`, `min`, `fixed`, `round`. These will be represented as a new field, for example, on a `display:line`, an extra `sum` line could be drawn. 

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

## Widget Size

Widgets can be resized horizontally with the `size` attribute.

Size is simply the percentage width you would like the widget to take. If size is not specified, then the widget will take up a equal proportion of the remaining width.

### Example
```
widgets:
  halfWidth:
    size: 50
  quarterWidth:
    size: 25
    # size doesn't need to be specified
  quarterWidth2:
    # size doesn't need to be specified
```

## Display widgets
Indicated via a `display` option.

```
widgets:
  barChart:
    display: bar
```

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

`link` - link to a destination (URL)

## Interactive Widgets
Indicated via a `control` option.

```
widgets:
  controlButton:
    display: button
```


`input` - input field, single or multiple

`button` - button, single or multiple

`switch` - switch, single or multiple

`radio` - radio, single or multiple

`dropdown` - dropdown menu

`range` - range slider

`xy` - track pad

`radial` - joystick, single or multiple

`color` - color picker
