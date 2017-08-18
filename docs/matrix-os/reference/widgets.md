## Widgets

Defined in config.yaml, widgets display information from the device and allow you to send information via familiar interfaces, like dropdowns and buttons.

### Layout
For details on how to arrange widgets on a dashboard, see [Screens](screens.md)

Widgets are basically configuration objects which can be defined with the following options. 

#### Options

##### All Widgets
* `label` - text label for this widget box

Widgets come in two forms:
* Display Widgets - Displays data from an application
* Interactive Widgets - Sends real-time events to an application

##### Display Widget Options
Display widgets, like tables, charts and value outputs are only concerned with what data to display and how to display it.
* `display` - which display widget to load
* `key`/`keys` - show these keys from the data payload
* `type` - select keys from this data segment (see [Overview > Sending Data](../overview/data.md) )
* `format` - filter the data. choose from `count`, `sum`, `avg`, `percent`, `max`, `min`, `fixed`, `round`.
* `realtime` - defaults to true. set to false and use refresh option for manual updates.
* `refresh` - how many seconds between data refresh. not set by default. use with realtime: false. 

##### Interactive Widget Options
* `control` - which interactive widget to load
* `trigger` - the event to listen for in your application ( see [Reference > Crosstalk](crosstalk.md))
* `value` - on button widgets, what text should be in the button
* `map` - on button widgets, a collection of `value: trigger` where value is the button text, and trigger is the event fired

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


# Widget Examples

# Displays

## Digit
![Digit](../img/ios/digit.png)
```
digitTest:
  display: digit
  type: monitor
  key: cpu
  format: round
  label: cpu
```

###### Handling Code
```
matrix.type('monitor').send({
  'cpu': 2.4,
  'memory': 5.4 }
);  
```

## Label
![Label](../img/ios/label.PNG)
```
labelTest:
  display: label
  type: uv
  key: risk
  label: UV Risk
```

###### Handling Code
```
matrix.type('uv').send({
  'value': 0.56773,
  'risk': 'Low' }
);  
```

## Bar Chart
![Bar Chart](../img/ios/bar.png)
```
barChartTest:
  display: bar
  type: monitor
  keys: cpu, memory
  format: avg
  realtime: false
  refresh: 60
  label: Bar Chart
```

###### Handling Code
```
matrix.type('monitor').send({
  'cpu': 7.03,
  'memory': 2.30 }
);  
```

## Line Chart
![Line Chart](../img/ios/line.png)
```
lineChartTest:
  display: line
  type: monitor
  format: avg
  keys: cpu, memory
  realtime: true
  label: Line Chart
```

###### Handling Code
```
matrix.type('monitor').send({
  'cpu': 7.03,
  'memory': 2.30 }
);  
```

## Radar Chart
![Radar Chart](../img/ios/radar.png)
```
radarTest:
  display: radar
  type: emotions
  keys: happy,sad,disgust,surprised,confused,calm,angry
  label: Emotions
```

###### Handling Code
```
matrix.type('emotions').send({
  'happy': 67,
  'sad': 50,
  'disgust': 78,
  'surprised': 56,
  'confused': 86,
  'calm': 70,
  'angry': 60 }
);  
```

## Pie Chart
![Radar Chart](../img/ios/pie.png)
```
pieChartTest:
  display: pie-chart
  type: gender
  keys: women,men
  label: Gender
```

###### Handling Code
```
matrix.type('gender').send({
  'women': 76,
  'men': 45 }
);  
```

## Polar Chart
![Polar Chart](../img/ios/polar.png)
```
polarTest:
  display: polar
  type: emotions
  keys: happy,sad,disgust,surprised,confused,calm,angry
  label: Emotions
```

###### Handling Code
```
matrix.type('emotions').send({
  'happy': 67,
  'sad': 50,
  'disgust': 78,
  'surprised': 56,
  'confused': 86,
  'calm': 70,
  'angry': 60 }
);  
```

## Gauge
![Gauge](../img/ios/gauge.png)
```
gaugeTest:
  display: gauge
  type: detection
  keys: views
  min: 0
  max: 100
  label: 'Views'
```

###### Handling Code
```
matrix.type('detection').send({
  'views': 60,
  'impressions': 100 }
);  
```

## Indicator
![Indicator](../img/ios/indicator.png)
```
indicatorTest:
  display: indicator
  type: system
  keys: isOn
  label: 'Indicator Test'
```

###### Handling Code
```
matrix.type('system').send({
  'isOn': true}
);  
```

## Map
![Map](../img/ios/map.png)
```
mapTest:
  display: map
  type: location
  label: 'Map Test'
```

###### Handling Code
```
matrix.type('location').send({
  'latitude': 25.791632,
  'longitude': -80.1414447,
  'label': 'AdMobilize'}
);  
```

## Lists
![List](../img/ios/list.png)
```
listTest:
  display: list
  type: device
  keys: Hostname,Type,Platform,Arch
  label: Secret Information
```

###### Handling Code
```
matrix.type('device').send({
  'Hostname': 'h7n.domain',
  'Type': 'Darwin',
  'Platform': 'darwin',
  'Arch': 'x64'}
);  
```

## List Group

### Simple Group
![List Group](../img/listgroup.png)
```
info:
  display: list-group
  type: vehicleDetection
  keys: count
  format: count
  label: Total
```

###### Handling Code
```
matrix.type('vehicleDetection').send({
  'zoneId': 'zone1',
  'count': '4',
  'speed': '56'}
);  
```

### Group by Key
![List Group](../img/listgroupby.png)
```
info:
  display: list-group
  type: device
  keys: zone, count
  format: count
  groupby: zone
  label: Total
```

###### Handling Code
```
matrix.type('vehicleDetection').send({
  'zoneId': 'zone1',
  'count': '4',
  'speed': '56'}
);  
```

## Links
![Link](../img/link.png)
```
link:
  display: link
  label: "Link display"
  title: "Google"
  url: "https://www.google.com"
```

# Interactive (Controls)

## Input
### Single
![input](../img/ios/input.png)

```
  inputTest:
    control: input
    event: testInput
    value: 'type text'
    label: 'Test Input'
```

###### Handling Code
```
matrix.on('testInput', function(p){
 var text = p.value;
})
```

### Multiple
![button Map](../img/ios/inputMap.png)

```
  inputMapTest:
    control: input
    map:
      - event: testInput1
        value: first type text
      - event: testInput2
        value: second type text
    label: Test Input Map
```

###### Handling Code
```
matrix.on('testInput1', function(p){
 var text = p.value;
})

matrix.on('testInput2', function(p){
 var text = p.value;
})

```

## Buttons

### Single
![button](../img/ios/button.png)

```
  buttonTest:
    control: button
    event: buttonInfo
    value: Get Secret Information
    label: Hacking Buttons
```

###### Handling Code
```
matrix.on('buttonInfo', function(){
  // ...
})
```

### Multiple
![button Map](../img/ios/buttonMap.png)

```
  buttonMapTest:
    control: button
    map:
      - event: buttonUp
        value: amps+
      - event: buttonDown
        value: amps-
      - event: buttonStart
        value: begin
      - event: buttonStop
        value: end
      - event: buttonCapture
        value: capture
      - event: buttonSlow
        value: refresh+
      - event: buttonFast
        value: refresh-
    label: Matrix Activation Buttons
```

###### Handling Code
```
matrix.on('buttonUp', function(){
  // ...
})

matrix.on('buttonDown', function(){
  // ...
})

matrix.on('buttonStart', function(){
  // ...
})

matrix.on('buttonStop', function(){
  // ...
})

matrix.on('buttonCapture', function(){
  // ...
})

matrix.on('buttonSlow', function(){
  // ...
})

matrix.on('buttonFast', function(){
  // ...
})
```

## Switch

### Single
![switch](../img/ios/switch.png)
```
  switchTest:
    control: switch
    event: ledEnabledChanged
    value: Leds enabled
    label: Switch Test
```

###### Handling Code
```
matrix.on('ledEnabledChanged', function(p){
 var isOn = p.value;
})
```

### Multiple
![switch](../img/ios/switchMap.png)
```
  switchMapTest:
    control: switch
    map:
      - event: ledEnabledChanged
        value: Leds enabled
      - event: detectionEnabledChanged
        value: Detection Enabled
    label: Switch Map Test
```

###### Handling Code
```
matrix.on('ledEnabledChanged', function(p){
 var isOn = p.value;
})

matrix.on('detectionEnabledChanged', function(p){
 var isOn = p.value;
})
```

## Radio
![radio](../img/ios/radio.png)
```
  radioTest:
    control: radio
    map:
      - event: optionOneSelected
        value: Option One
      - event: optionTwoSelected
        value: Option Two
    label: Radio Test
```

###### Handling Code
```
matrix.on('optionOneSelected', function(p){
  // ...
})

matrix.on('optionTwoSelected', function(p){
  // ...
})
```

## Drop Downs
![DropDown](../img/ios/dropdown.png)
```
  dropDownTest:
    control: dropdown
    map:
      - event: optionOneSelected
        value: Option One
      - event: optionTwoSelected
        value: Option Two
    label: Dropdown Test
```

###### Handling Code
```
matrix.on('optionOneSelected', function(){
 //...
})

matrix.on('optionTwoSelected', function(){
 //...
})
```

## Range
![range](../img/ios/range.png)
```
  rangeTest:
    control: range
    event: rangeChanged
    min: 0
    max: 35
    label: Range Test
```

###### Handling Code
```
matrix.on('rangeChanged', function(p){
 var value = p.value;
})
```

## XY
![xy](../img/ios/xy.png)
```
  xyTest:
    control: xy
    event: xyChanging
    value: 'xy'
    xMax: 100
    yMax: 50
    label: Test XY
```

###### Handling Code
```
matrix.on('xyChanging', function(p){
 var x = p.value.x;
 var y = p.value.y;
})
```

## Radial
### Single
![radial](../img/ios/radial.png)

```
  radial:
    control: radial
    event: radialChanging
    label: Radial Test
```

###### Handling Code
```
matrix.on('radialChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
})
```

### Multiple
![radial](../img/ios/radialMap.png)

```
  radialMap:
    control: radial
    map:
    - event: radialRChanging
      value: right
    - event: radialLChanging
      value: left
    label: Radial Map Test
```

###### Handling Code
```
matrix.on('radialRChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
})

matrix.on('radialLChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
})
```

## Color
![color](../img/color.png) ![colorSelector](../img/colorSelector.png) 
```
  color:
    control: color
    event: colorChange
    value: 'color'
    label: 'Change MATRIX color'
```

###### Handling Code
```
matrix.on('colorChange', function(color){
  color = color.value;
  matrix.led(color).render();
});
```

# Responsive Data Flow
```
matrix.on('buttonInfo', function(){
  matrix.type('device').send({
    'os_hostname': os.hostname(),
    'os_type': os.type(),
    'os_platform': os.platform(),
    'os_arch': os.arch()
  });
})
```
When `buttonInfo` is triggered, respond with information with a type `device`.

The list looks for
```
widgets:
  list:
    type: device
```
The `list` widget displays information of type `device`.
