<h2 style="padding-top:0">Everloop</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections below will go over how to control the LED array on your MATRIX Device.

## Import Statement
```py
from matrix_lite import led
```

### led

???+ summary ".length"
    Returns the number of LEDs on a MATRIX device.
    ```py
    led.length
    ```

???+ summary ".set()"
    Allows you to set the colors of each LED. A `string`, `object`, `tuple` or `array` can be given to this function.

    ```py
    led.set('blue') # color name
    led.set('#0000ff') # hex values
    led.set({'r':0, 'g':0, 'b':255, 'w':0 }) # object
    led.set((0,0,255,0)) # tuple
    ```

    Passing in an array allows you to set each individual LED color. However, passing an array that's larger than `led.length` will result in an error.
    ```py
    led.set(['red', 'gold', (255,0,255,0), {}, 'black', '#6F41C1', 'blue', {'g':255}])
    ```

???+ example "Everloop Examples"

    ```py tab="LEDs blue"
    from matrix_lite import led
    # A single string or object sets all LEDs
    # Below are different ways of expressing the color blue (number values are from 0-255)
    led.set('blue')
    led.set('#0000ff')
    led.set({'r':0, 'g':0, 'b':255, 'w':0 }) # objects can set white
    led.set((0,0,255,0)) # tuples can set white
    ```

    ```py tab="LEDs off"
    from matrix_lite import led
    # Each line below is a valid way of turning the LEDs off
    led.set('black')
    led.set([])
    led.set()
    led.set({})
    ```

    ```py tab="Moving blue LED"
    from matrix_lite import led
    import time

    everloop = ['black'] * led.length
    everloop[0] = {'b':100}

    while True:
        everloop.append(everloop.pop(0))
        led.set(everloop)
        time.sleep(0.050)
    ```

    ```py tab="Rainbow"
    from matrix_lite import led
    from time import sleep
    from math import pi, sin

    everloop = ['black'] * led.length

    ledAdjust = 0.0
    if len(everloop) == 35:
        ledAdjust = 0.51 # MATRIX Creator
    else:
        ledAdjust = 1.01 # MATRIX Voice

    frequency = 0.375
    counter = 0.0
    tick = len(everloop) - 1

    while True:
        # Create rainbow
        for i in range(len(everloop)):
            r = round(max(0, (sin(frequency*counter+(pi/180*240))*155+100)/10))
            g = round(max(0, (sin(frequency*counter+(pi/180*120))*155+100)/10))
            b = round(max(0, (sin(frequency*counter)*155+100)/10))

            counter += ledAdjust

            everloop[i] = {'r':r, 'g':g, 'b':b}

        # Slowly show rainbow
        if tick != 0:
            for i in reversed(range(tick)):
                everloop[i] = {}
            tick -= 1

        led.set(everloop)

        sleep(.035)
    ```