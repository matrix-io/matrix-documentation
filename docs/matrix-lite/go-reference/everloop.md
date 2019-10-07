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

### led

???+ summary ".length"
    Returns the number of LEDs on a MATRIX device.
    ```go
    m.Led.Length
    ```
???+ summary ".RGBW{}"

    ```go
    // RGBW is used to represent the color of an LED
    purple := m.RGBW{R: 255, G: 0, B:255, W:0}
    ```

???+ summary ".set()"
    Allows you to set the colors of each LED. A `string`, `RGBW struct`, `slice` or `array` can be given to this function.

    ```go
    // Valid ways to set each LED
    m.Led.Set("blue")
    m.Led.Set(matrix.RGBW{0, 0, 255, 0})
    ```

    Passing in an array allows you to set each individual LED color. However, passing an array that's larger than `led.length` will result in an error.
    ```go
    // Slice
    m.Led.Set([]string{"red", "gold", "black", "purple"})

    // Slice with different data types
    m.Led.Set([]interface{}{"red", "", matrix.RGBW{}, "black", matrix.RGBW{G: 255}})

    // Array
    m.Led.Set([5]string{"red", "gold", "black", "purple"})
    ```
  
???+ example "Everloop Examples"

    ```go tab="LEDs blue"
    package main

    import "github.com/matrix-io/matrix-lite-go"

    func main() {
        m := matrix.Init()
        // A single string or RGBW sets all LEDs
        // Below are different ways of expressing a color (number values are from 0-255)
        m.Led.Set("blue")
        m.Led.Set(matrix.RGBW{0, 0, 255, 0})
    }
    ```

    ```go tab="LEDs off"
    package main

    import "github.com/matrix-io/matrix-lite-go"

    func main() {
        m := matrix.Init()
        m.Led.Set("black")
        m.Led.Set("")
        m.Led.Set("invalid color names will default to black")
        m.Led.Set(matrix.RGBW{})
    }
    ```

    ```go tab="Moving blue LED"
    package main

    import (
        "time"
        
        "github.com/matrix-io/matrix-lite-go"
    )

    func main() {
        m := matrix.Init()

        // It's recommended to use Slices so that m.Led.Length can be used
        everloop := make([]matrix.RGBW, m.Led.Length)
        everloop[0] = matrix.RGBW{B: 100}

        for {
            lastLed := everloop[0]
            everloop = everloop[1:]
            everloop = append(everloop, lastLed)

            m.Led.Set(everloop)
            time.Sleep(50 * time.Millisecond)
        }
    }
    ```

    ```go tab="Rainbow"
    package main

    import (
        "math"
        "time"

        "github.com/matrix-io/matrix-lite-go"
    )

    func main() {
        m := matrix.Init()
        everloop := make([]matrix.RGBW, m.Led.Length)

        ledAdjust := 0.0
        if len(everloop) == 35 {
            ledAdjust = 0.51 // MATRIX Creator
        } else {
            ledAdjust = 1.01 // MATRIX Voice
        }

        frequency := 0.375
        counter := 0.0
        tick := len(everloop) - 1

        for {
            // Create rainbow
            for i, led := range everloop {
                led.R = uint8(math.Max(0, (math.Sin(frequency*counter+(math.Pi/180*240))*155+100)/10))
                led.G = uint8(math.Max(0, (math.Sin(frequency*counter+(math.Pi/180*120))*155+100)/10))
                led.B = uint8(math.Max(0, (math.Sin(frequency*counter)*155+100)/10))

                counter += ledAdjust

                everloop[i] = led
            }

            // Slowly show rainbow
            if tick != 0 {
                for i := tick; i > 0; i-- {
                    everloop[i] = matrix.RGBW{}
                }
                tick--
            }

            m.Led.Set(everloop)
            time.Sleep(35 * time.Millisecond)
        }
    }
    ```