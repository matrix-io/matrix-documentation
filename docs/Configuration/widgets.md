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

Default operation is for a widget to be updated with data in real time.

This is represented with an option, `push`.

```
//to disable realtime updates
widgets:
  testWidget:
     push: false
```

The alternative is to have a widget manually refresh it's data on an interval, if you wanted to refresh a graph every minute

```
//to disable realtime updates
widgets:
  testWidget:
     push: false
     pull: true
     refresh: 60
```

## Display widgets
Indicated via a `display` option.

`bar` - bar chart
`digit` - numerical
`radar` - polar chart
`line` - line chart
`list-group` - data table

## Interactive Widgets
Indicated via a `control` option.

`button` - button, single or multiple
`dropdown` - dropdown menu
`range` - range slider
