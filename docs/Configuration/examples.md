# MatrixOS Config Widget examples

# Layout
![Screens](img/screens.png)
```
screens:
  - - digitTest
    - labelTest
  - - barChartTest
    - lineChartTest
  - - radarChartTest
    - gaugeTest
  - - listTest
```

# Displays

## Digit
![Digit](img/ios/digit.png)
```
digitTest:
  display: digit
  type: monitor
  key: cpu
  format: round
  label: cpu
```

## Label
![Label](img/ios/label.png)
```
labelTest:
  display: label
  type: uv
  key: risk
  label: UV Risk
```

## Bar Chart
![Bar Chart](img/ios/bar.png)
```
barChartTest:
  display: bar
  type: monitor
  format: avg
  keys: cpu, memory
  realtime: false
  refresh 60
  label: Bar Chart
```

## Line Chart
![Line Chart](img/ios/line.png)
```
lineChartTest:
  display: line
  type: monitor
  format: avg
  keys: cpu, memory
  realtime: true
  label: Line Chart
```

## Radar Chart
![Radar Chart](img/ios/radar.png)
```
radarTest:
  display: radar
  type: emotions
  keys: happy,sad,disgust,surprised,confused,calm,angry
  label: Emotions
```

## Pie Chart
![Radar Chart](img/ios/pie.png)
```
pieChartTest:
  display: pie-chart
  type: gender
  keys: women,men
  label: Gender
```

## Polar Chart
![Polar Chart](img/ios/polar.png)
```
polarTest:
  display: polar
  type: emotions
  keys: happy,sad,disgust,surprised,confused,calm,angry
  label: Emotions
```

## Gauge
![Gauge](img/ios/gauge.png)
```
gaugeTest:
  display: gauge
  type: face
  keys: views
  label: 'Views'
```

## Indicator
![Indicator](img/ios/indicator.png)
```
indicatorTest:
  display: indicator
  type: system
  keys: isOn
  label: 'Indicator Test'
```

## Map
![Map](img/ios/map.png)
```
mapTest:
  display: map
  label: 'Map Test'
  type: locations
```

## Lists
![List](img/ios/list.png)
```
listTest:
  type: device
  keys: Hostname,Type,Platform,Arch
  display: list
  label: Secret Information
```
## List Group

### Simple Group
![List Group](img/listgroup.png)
```
info:
  type: device
  keys: count
  display: list-group
  format: count
  label: Total
```

### Group by Key
![List Group](img/listgroupby.png)
```
info:
  type: device
  keys: zone, count
  groupby: zone
  format: count
  display: list-group
  label: Total
```

# Interactive

## Input
### Single
![input](img/ios/input.png)

```
label: 'Test Input'
control: input
event: testInput
value: 'type text'
```

###### Handling Data
```
matrix.on('testInput', function(p){
 var text = p.value;
})
```

### Multiple
![button Map](img/ios/inputMap.png)

```
  inputMapTest:
    label: Test Input Map
    control: input
    map:
      - event: testInput1
        value: first type text
      - event: testInput2
        value: second type text
```

###### Handling Data
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
![button](img/ios/button.png)

```
  buttonTest:
    label: Hacking Buttons
    control: button
    event: buttonInfo
    value: Get Secret Information
```

###### Handling Code
```
matrix.on('buttonInfo', function(){
  // ...
})
```

### Multiple
![button Map](img/ios/buttonMap.png)

```
  buttonMapTest:
    label: Matrix Activation Buttons
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
![switch](img/ios/switch.png)
```
  switchTest:
    label: Switch Test
    control: switch
    event: ledEnabledChanged
    value: Leds enabled
```

###### Handling Data
```
matrix.on('ledEnabledChanged', function(p){
 var isOn = p.value;
})
```

### Multiple
![switch](img/ios/switchMap.png)
```
  switchMapTest:
    label: Switch Map Test
    control: switch
    map:
      - event: ledEnabledChanged
        value: Leds enabled
      - event: detectionEnabledChanged
        value: Detection Enabled
```

###### Handling Data
```
matrix.on('ledEnabledChanged', function(p){
 var isOn = p.value;
})

matrix.on('detectionEnabledChanged', function(p){
 var isOn = p.value;
})
```

## Radio
![radio](img/ios/radio.png)
```
  radioTest:
    label: Radio Test
    control: radio
    map:
      - event: optionOneSelected
        value: Option One
      - event: optionTwoSelected
        value: Option Two
```

###### Handling Data
```
matrix.on('optionOneSelected', function(p){
  // ...
})

matrix.on('optionTwoSelected', function(p){
  // ...
})
```

## Drop Downs
![DropDown](img/ios/dropdown.png)
```
  dropDownTest:
    label: Dropdown Test
    control: dropdown
    map:
      - event: optionOneSelected
        value: Option One
      - event: optionTwoSelected
        value: Option Two
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
![range](img/ios/range.png)
```
  rangeTest:
    label: Range Test
    control: range
    event: rangeChanged
    min: 0
    max: 35
```

###### Handling Data
```
matrix.on('rangeChanged', function(p){
 var value = p.value;
})
```

## XY
![xy](img/ios/xy.png)
```
  xyTest:
    control: xy
    label: Test XY
    trigger: xyChanging
    value: 'xy'
    xMax: 100
    yMax: 50
```

###### Handling Data
```
matrix.on('xyChanging', function(p){
 var x = p.value.x;
 var y = p.value.y;
})
```

## Radial
### Single
![radial](img/ios/radial.png)

```
  radial:
    control: radial
    label: Radial Test
    event: radialChanging
```

###### Handling Data
```
matrix.on('radialChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
})
```

### Multiple
![radial](img/ios/radialMap.png)

```
  radialMap:
    control: radial
    label: Radial Map Test
    map:
    - event: radialRChanging
      value: right
    - event: radialLChanging
      value: left
```

###### Handling Data
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
