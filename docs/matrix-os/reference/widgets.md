<h2 style="padding-top:0">Widgets</h2>
> You should have familiarity with [Data Types](data-types.md) and [Dashboard](dashboard.md) before exploring further. 

Widgets are what allow you to visualize and or control your MATRIX applications through the MATRIX Dashboard.

<br/>
## Widget Configuration
Each widget requires certain options to be defined before they can properly show on the dashboard. The list below will go through each available option for `widgets`.
<h4 style="padding-top:0">Widget Types</h4>

* **Display Widgets** - Displays data from an application.
* **Control Widgets** - Sends real-time events to an application.

<h4 style="padding-top:0">All Widget Options</h4>
* `label` - Optional display title for widget.
* `size` - Optional percentage value for a widget's width (**25**, **50**, **75**, etc..).

>`widgets` can only have either a `display` or `control` option when choosing a widget type.

<h4 style="padding-top:0">Display Widget Options</h4>
Display widgets, like tables, charts and value outputs are only concerned with what data to display and how to display it.

`display` - Which display widget to load

* `type` - Select type from a defined data type (see [Sending Data](data-types.md) ).
* `key`/`keys` - Select key or keys being used from  `type`.
* `format` - Filter the data. choose from `count`, `sum`, `avg`, `percent`, `max`, `min`, `fixed`, `round`.
* `realtime` - Defaults to **true**. Use the `refresh` option for manual updates.
* `refresh` - How many seconds between data refresh. use with `realtime` set to **false**. 

<h4 style="padding-top:0">Interactive Widget Options</h4>
Interactive widgets, like buttons, switches, and controllers are meant to send data from the MATRIX Dashboard to your MATRIX app.

`control` - Which control widget option load

* `trigger` - The event to listen for in your application ( see [Reference > Crosstalk](crosstalk.md))
* `value` - On button widgets, what text should be in the button
* `map` - On button widgets, a collection of `value: trigger` where value is the button text, and trigger is the event fired

<br/>
## Display widgets
Indicated via a `display` option.

Each example will show how to configure their respective widget. `screens` and `dataTypes` will be left up to you to configure.

<!-- BAR WIDGET -->
<details>
<summary>`bar` - bar chart</summary>
![Bar Chart](../img/ios/bar.png)
```language-yaml
#config.yaml
widgets:
  barChartTest:
    display: bar
    type: monitor
    keys: cpu, memory
    format: avg
    realtime: false
    refresh: 60
    label: Bar Chart
```
```language-javascript
//send data through app.js
matrix.type('monitor').send({
  'cpu': 7.03,
  'memory': 2.30 
});  
```
</details>

<!-- DIGIT WIDGET -->
<details>
<summary>`digit` - numerical</summary>
![Digit](../img/ios/digit.png)
```language-yaml
#config.yaml
widgets:
  digitTest:
    display: digit
    type: monitor
    key: cpu
    format: round
    label: cpu
```
```language-javascript
//send data through app.js
matrix.type('monitor').send({
  'cpu': 2.4,
  'memory': 5.4 
});  
```
</details>

<!-- RADAR WIDGET -->
<details>
<summary>`radar` - radar chart</summary>
![Radar Chart](../img/ios/radar.png)
```language-yaml
#config.yaml
widgets:
  radarTest:
    display: radar
    type: emotions
    keys: happy,sad,disgust,surprised,confused,calm,angry
    label: Emotions
```
```language-javascript
//send data through app.js
matrix.type('emotions').send({
  'happy': 67,
  'sad': 50,
  'disgust': 78,
  'surprised': 56,
  'confused': 86,
  'calm': 70,
  'angry': 60 
});  
```
</details>

<!-- LINE WIDGET -->
<details>
<summary>`line` - line chart</summary>
![Line Chart](../img/ios/line.png)
```language-yaml
#config.yaml
widgets:
  lineChartTest:
    display: line
    type: monitor
    format: avg
    keys: cpu, memory
    realtime: true
    label: Line Chart
```
```language-javascript
//send data through app.js
matrix.type('monitor').send({
  'cpu': 7.03,
  'memory': 2.30 
});  
```
</details>

<!-- LIST WIDGET -->
<details>
<summary>`list` - data table</summary>
![List](../img/ios/list.png)
```language-yaml
#config.yaml
widgets:
  listTest:
    display: list
    type: device
    keys: Hostname,Type,Platform,Arch
    label: Secret Information
```
```language-javascript
//send data through app.js
matrix.type('device').send({
  'Hostname': 'h7n.domain',
  'Type': 'Darwin',
  'Platform': 'darwin',
  'Arch': 'x64'
});  
```
</details>

<!-- LIST-GROUP WIDGET -->
<details>
<summary>`list-group` - grouped data table</summary>
**Simple Group**
![List Group](../img/listgroup.png)
```language-yaml
#config.yaml
widgets:
  info:
    display: list-group
    type: vehicleDetection
    keys: count
    format: count
    label: Total
```
```language-javascript
//send data through app.js
matrix.type('vehicleDetection').send({
  'zoneId': 'zone1',
  'count': '4',
  'speed': '56'
});  
```

**Group By Key**
![List Group](../img/listgroupby.png)
```language-yaml
#config.yaml
widgets:
  info:
    display: list-group
    type: device
    keys: zone, count
    format: count
    groupby: zone
    label: Total
```
```language-javascript
//send data through app.js
matrix.type('vehicleDetection').send({
  'zoneId': 'zone1',
  'count': '4',
  'speed': '56'
});  
```
</details>

<!-- PIE-CHART WIDGET -->
<details>
<summary>`pie-chart` - pie chart</summary>
![Radar Chart](../img/ios/pie.png)
```language-yaml
#config.yaml
widgets:
  pieChartTest:
    display: pie-chart
    type: gender
    keys: women,men
    label: Gender
```
```language-javascript
//send data through app.js
matrix.type('gender').send({
  'women': 76,
  'men': 45 
});  
```
</details>

<!-- POLAR WIDGET -->
<details>
<summary>`polar` - polar area chart</summary>
![Polar Chart](../img/ios/polar.png)
```language-yaml
#config.yaml
widgets:
  polarTest:
    display: polar
    type: emotions
    keys: happy,sad,disgust,surprised,confused,calm,angry
    label: Emotions
```
```language-javascript
//send data through app.js
matrix.type('emotions').send({
  'happy': 67,
  'sad': 50,
  'disgust': 78,
  'surprised': 56,
  'confused': 86,
  'calm': 70,
  'angry': 60 
});  
```
</details>

<!-- LABEL WIDGET -->
<details>
<summary>`label` - string display</summary>
![Label](../img/ios/label.PNG)
```language-yaml
#config.yaml
widgets:
  labelTest:
    display: label
    type: uv
    key: risk
    label: UV Risk
```
```language-javascript
//send data through app.js
matrix.type('uv').send({
  'value': 0.56773,
  'risk': 'Low' 
});  
```
</details>

<!-- GAUGE WIDGET -->
<details>
<summary>`gauge` - gauge </summary>
![Gauge](../img/ios/gauge.png)
```language-yaml
#config.yaml
widgets:
  gaugeTest:
    display: gauge
    type: detection
    keys: views
    min: 0
    max: 100
    label: 'Views'
```
```language-javascript
//send data through app.js
matrix.type('detection').send({
  'views': 60,
  'impressions': 100 
});  
```
</details>

<!-- INDICATOR WIDGET -->
<details>
<summary>`indicator` -  light indicator on/off</summary>
![Indicator](../img/ios/indicator.png)
```language-yaml
#config.yaml
widgets:
  indicatorTest:
    display: indicator
    type: system
    keys: isOn
    label: 'Indicator Test'
```
```language-javascript
//send data through app.js
matrix.type('system').send({
  'isOn': true
});  
```
</details>

<!-- MAP WIDGET -->
<details>
<summary>`map` - google maps</summary>
![Map](../img/ios/map.png)
```language-yaml
widgets:
  mapTest:
    display: map
    type: location
    label: 'Map Test'
```
```language-javascript
//send data through app.js
matrix.type('location').send({
  'latitude': 25.791632,
  'longitude': -80.1414447,
  'label': 'Admobilize'
});  
```
</details>

<!-- LINK WIDGET -->
<details>
<summary>`link` - link to a destination (URL)</summary>
![Link](../img/link.png)
```language-yaml
widgets:
  link:
    display: link
    label: "Link display"
    title: "Google"
    url: "https://www.google.com"
```
</details>

<br/>
## Control Widgets
Indicated via a `control` option.

Each example will show how to configure their respective widget. `screens` and `dataTypes` will be left up to you to configure.

<!-- INPUT WIDGET -->
<details>
<summary>`input` - input field, single or multiple</summary>

**Single Inputs**
![input](../img/ios/input.png)
```language-yaml
#config.yaml
widgets:
  inputTest:
    control: input
    event: testInput
    value: 'type text'
    label: 'Test Input'
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('testInput', function(p){
 var text = p.value;
})
```

**Multiple Inputs**
![button Map](../img/ios/inputMap.png)
```language-yaml
#config.yaml
  inputMapTest:
    control: input
    map:
      - event: testInput1
        value: first type text
      - event: testInput2
        value: second type text
    label: Test Input Map
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('testInput1', function(p){
 var text = p.value;
})

matrix.on('testInput2', function(p){
 var text = p.value;
})
```
</details>

<!-- BUTTON WIDGET -->
<details>
<summary>`button` - button, single or multiple</summary>

**Single Buttons**
![button](../img/ios/button.png)
```language-yaml
#config.yaml
widgets:
  buttonTest:
    control: button
    event: buttonInfo
    value: Get Secret Information
    label: Hacking Buttons
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('buttonInfo', function(){
  // ...
});
```

**Multiple Buttons**
![button Map](../img/ios/buttonMap.png)
```language-yaml
#config.yaml
widgets:
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
```language-javascript
//Cross-Talk event from dashboard
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
</details>

<!-- SWITCH WIDGET -->
<details>
<summary>`switch` - switch, single or multiple</summary>

**Single Switch**
![switch](../img/ios/switch.png)
```language-yaml
#config.yaml
widgets:
  switchTest:
    control: switch
    event: ledEnabledChanged
    value: Leds enabled
    label: Switch Test
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('ledEnabledChanged', function(p){
 var isOn = p.value;
})
```
**Multiple Switches**
![switch](../img/ios/switchMap.png)
```language-yaml
#config.yaml
widgets:
  switchMapTest:
    control: switch
    map:
      - event: ledEnabledChanged
        value: Leds enabled
      - event: detectionEnabledChanged
        value: Detection Enabled
    label: Switch Map Test
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('ledEnabledChanged', function(p){
 var isOn = p.value;
});

matrix.on('detectionEnabledChanged', function(p){
 var isOn = p.value;
});
```
</details>


<!-- RADIO WIDGET -->
<details>
<summary>`radio` - radio, single or multiple</summary>
![radio](../img/ios/radio.png)
```language-yaml
#config.yaml
widgets:
  radioTest:
    control: radio
    map:
      - event: optionOneSelected
        value: Option One
      - event: optionTwoSelected
        value: Option Two
    label: Radio Test
```

```language-javascript
//Cross-Talk event from dashboard
matrix.on('optionOneSelected', function(p){
  // ...
})

matrix.on('optionTwoSelected', function(p){
  // ...
})
```
</details>

<!-- DROPDOWN WIDGET -->
<details>
<summary>`dropdown` - dropdown menu</summary>
![DropDown](../img/ios/dropdown.png)
```language-yaml
#config.yaml
widgets:
  dropDownTest:
    control: dropdown
    map:
      - event: optionOneSelected
        value: Option One
      - event: optionTwoSelected
        value: Option Two
    label: Dropdown Test
```

```language-javascript
//Cross-Talk event from dashboard
matrix.on('optionOneSelected', function(){
 //...
})

matrix.on('optionTwoSelected', function(){
 //...
})
```
</details>

<!-- RANGE WIDGET -->
<details>
<summary>`range` - range slider</summary>
![range](../img/ios/range.png)
```language-yaml
#config.yaml
widgets:
  rangeTest:
    control: range
    event: rangeChanged
    min: 0
    max: 35
    label: Range Test
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('rangeChanged', function(p){
 var value = p.value;
});
```
</details>

<!-- XY WIDGET -->
<details>
<summary>`xy` - track pad</summary>
![xy](../img/ios/xy.png)
```language-yaml
#config.yaml
widgets:
  xyTest:
    control: xy
    event: xyChanging
    value: 'xy'
    xMax: 100
    yMax: 50
    label: Test XY
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('xyChanging', function(p){
 var x = p.value.x;
 var y = p.value.y;
});
```
</details>

<!-- RADIAL WIDGET -->
<details>
<summary>`radial` - joystick, single or multiple</summary>

**Single Radial**
![radial](../img/ios/radial.png)

```language-yaml
#config.yaml
widgets:
  radial:
    control: radial
    event: radialChanging
    label: Radial Test
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('radialChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
})
```
**Multiple Radials**
![radial](../img/ios/radialMap.png)

```language-yaml
#config.yam
widgets:
  radialMap:
    control: radial
    map:
    - event: radialRChanging
      value: right
    - event: radialLChanging
      value: left
    label: Radial Map Test
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('radialRChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
});

matrix.on('radialLChanging', function(p){
 var x = p.value.x; //from -1 to 1
 var y = p.value.y; //from -1 to 1
});
```
</details>

<!-- COLOR WIDGET -->
<details>
<summary>`color` - color picker</summary>
![color](../img/color.png) ![colorSelector](../img/colorSelector.png) 
```language-yaml
#config.yaml
widgets:
  color:
    control: color
    event: colorChange
    value: 'color'
    label: 'Change MATRIX color'
```
```language-javascript
//Cross-Talk event from dashboard
matrix.on('colorChange', function(color){
  color = color.value;
  matrix.led(color).render();
});
```
</details>