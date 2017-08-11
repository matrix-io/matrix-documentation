## Dashboard

Login to your [MATRIX Dashboard](http://dash.matrix.one).

#### Devices and Applications
You should be able to navigate to your active devices and applications. The dashboard for each application consists of widgets which display data from the selected devices.

### Widgets

See [Reference > Widget Examples](../reference/widgets.md) for more detailed information about widget configuration.

#### Widget options

##### All Widgets
* `label` - text label for this widget box

##### Display Widgets
Display widgets, like tables, charts and value outputs are only concerned with what data to display and how to display it.
* `display` - which display widget to load
* `key`/`keys` - show these keys from the data payload
* `type` - select keys from this data segment (see [Overview > Sending Data](data.md) )
* `format` - filter the data. choose from `count`, `sum`, `avg`, `percent`, `max`, `min`, `fixed`, `round`.
* `realtime` - defaults to true. set to false and use refresh option for manual updates.
* `refresh` - how many seconds between data refresh. not set by default. use with realtime: false. 

##### Interactive Widgets
* `control` - which interactive widget to load
* `trigger` - the event to listen for in your application ( see [Reference > Crosstalk](../reference/crosstalk.md))
* `value` - on button widgets, what text should be in the button
* `map` - on button widgets, a collection of `value: trigger` where value is the button text, and trigger is the event fired

#### Layout

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

#### Data Operations

Using `format`, data operations can be applied to the data for each Display Widget. The current widget configuration supports the operations: `count`, `sum`, `avg`, `percent`, `max`, `min`, `fixed`, `round`.

#### Data Handling
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

#### Widget Size

Widgets can be resized horizontally with the `size` attribute.

Size is simply the percentage width you would like the widget to take. If size is not specified, then the widget will take up a equal proportion of the remaining width.

##### Example
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

#### Display widgets
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
    control: button
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
