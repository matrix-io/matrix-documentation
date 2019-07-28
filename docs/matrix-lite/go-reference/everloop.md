<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to control the LED array on your MATRIX Device.

## Import Statement
```go
import ("github.com/matrix-io/matrix-lite-go")
```

!!! tip "MATRIX Initialization"
    `.Init` will contain an `Led` struct to call the functions below
    ```go
    m := matrix.Init()
    ```

### .Length
Returns the size of the LED array on your MATRIX device.
```go
m.Led.Length
```

### .Set()
Allows you to set the colors of each LED. A `string`, `RGBW struct`, `slice` or `array` can be given to this function.

**String input**
```go
// Turn LEDs blue
m.Led.Set("blue")

// Valid ways to turn LEDs off
m.Led.Set("black")
m.Led.Set("")
m.Led.Set("invalid color names will default to black")
```

**RGBW Struct input**
```go
// Turn LEDs blue
m.Led.Set(matrix.RGBW{0, 0, 10, 0})

// Turn LEDs off
m.Led.Set(matrix.RGBW{})
```

**Slice & Array Input**

Passing in an a slice or array allows you to set each individual LED color. However, passing anything that's larger than `Led.Length` will result in an error. It's recommended to use slices so that `Led.Length` can be used as the size.
```go
// Slice
m.Led.Set([]string{"red", "gold", "black", "purple"})

// Slice with different data types
m.Led.Set([]interface{}{"red", "", matrix.RGBW{}, "black", matrix.RGBW{G: 255}})

// Array
m.Led.Set([5]string{"red", "gold", "black", "purple"})
```