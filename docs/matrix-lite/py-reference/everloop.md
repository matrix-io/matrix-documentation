<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to control the LED array on your MATRIX Device.

## Import Statement
```language-js
from matrix_lite import led
```

### .length
Returns the size of the LED array on your MATRIX device.
```language-python
led.length
```

### .set()
Allows you to set the colors of each LED. A `string`, `object`, `tuple`, or `array` can be given to this function.

**String input**
```language-python
# Sets each LED to blue
led.set('blue')# color name
led.set('#0000ff')# Hex values

# Turns off each LED
led.set('black') # color name
led.set('#000000') # Hex values
```

**Object input**
```language-python
# Sets each LED to blue
led.set({'r': 0, 'g': 0, 'b': 255, 'w': 0})
led.set({'b': 255})

# Turns off each LED
led.set({})
```

**Tuple input**
```language-python
# Sets each LED to blue
led.set((0,0,255,0)) # Each RGBW value in a tuple must be defined

# Turns off each LED
led.set((0,0,0,0))
```

**Array Input**

Passing in an array allows you to set each individual LED color. However, passing an array that's larger than `led.length` will result in an error.
```language-python
# Basic array example
led.set(['red', 'gold', (255,0,255,0), {}, 'black', '#6F41C1', 'blue', {'g':255}])
```