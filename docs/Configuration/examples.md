# MatrixOS Config Widget examples

# Layout
![Screens](img/screens.png)
```
screens:
  - - cpu
    - memory
```

# Displays

## Value
![Value](img/value.png)
```
cpu:
  type: monitor
  key: cpu
  display: digit
  format: round
  label: cpu
```

## Bar Chart
![Bar Chart](img/bar.png)
```
barChart:
  type: monitor
  keys: cpu, memory
  display: bar
  label: Bar Chart
```

## Radar Chart
![Radar Chart](img/radar.png)
```
radarTest:
  type: monitor
  keys: cpu,memory
  display: radar
  label: radarTest
```

## Line Chart
![Line Chart](img/line.png)
```
cpuChart:
  type: monitor
  keys: cpu,memory
  display: line
  label: CPU Chart
```

## Lists
![List](img/secret.png)
```
info:
  type: device
  display: list-group
  label: Secret Information
```

# Interactive

## Buttons

### Single
![1 Button](img/1but.png)
```
buttonTest:
  label: Hacking Buttons
  control: button
  trigger: buttonInfo
  value: Get Secret Information
```
###### Handling Code
```
matrix.on('buttonInfo', function(){
  // ...
})
```
`trigger` in the config file, is the event name (`buttonInfo`) handled.


### Multiple
![Multi Button](img/nbut.png)
```
buttonsTest:
  label: Matrix Activation Buttons
  control: button
  map:
    'amps+': buttonUp
    'amps-': buttonDown
    begin : buttonStart
    end : buttonStop
    capture : buttonSample
    'refresh+' : buttonSlow
    'refresh-' : buttonFast
```
###### Handling Code
```
 matrix.on('buttonStop', function(){
   //...
})

 matrix.on('buttonStart', function(){
   //...
 })

 matrix.on('buttonSample', function () {
   //...
 })
```
## Drop Downs
![DropDown](img/drop.png)
```
dropDown:
  control: dropdown
  map:
    test1: doTest1
    test2: doTest2
  label: dropdown test
```
###### Handling Code
```
matrix.on('doTest1', function(){
 //...
})


matrix.on('doTest2', function(){
 //...
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
list:
  type: device
```
which tells it to display information with type `device`.
