<h2 style="padding-top:0">Prerequisite MATRIX HAL</h2>

> Make sure you have installed [MATRIX HAL](/matrix-hal/getting-started/), before continuing.

## Go Setup

Install Go.
```bash
sudo apt-get install golang
```

Create a project folder.
```langauge-bash
mkdir lite_go
cd lite_go
go mod init myapp
touch main.go
```

Download the matrix-lite-go package.
```bash
go get -u github.com/matrix-io/matrix-lite-go
```

## Creating An Application

Copy our Hello World example below into the `main.go` to test your installation.

```go
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

<h3 style="padding-top: 0">Running main.go</h3>
Once you have `main.go` ready, use the following command to our rainbow Hello World. 
```
go run main.go
```


<h3 style="padding-top: 0">Result</h3>
![](/matrix-lite/img/everloop_rainbow.gif)

<br/>
## Next Steps
With your device now setup, you can visit our [Reference](../go-reference) page to get started with MATRIX Lite.
