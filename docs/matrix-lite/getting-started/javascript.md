<h2 style="padding-top:0">Prerequisite MATRIX HAL</h2>

<!-- MATRIX HAL is at the base of each MATRIX Lite library. This makes it a requirement to have it installed on your Raspberry Pi. Below are the installation instructions -->

> Make sure you have installed [MATRIX HAL](/matrix-hal/getting-started/), before continuing.

## JavaScript Setup

Install Node.js
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install 12
```

Create a project folder.
```bash
mkdir lite_js
cd lite_js
npm init -y
touch index.js
```

Download the matrix-lite-js package.
```bash
npm install @matrix-io/matrix-lite --save
```

## Creating An Application

Copy our Hello World example below into `index.js` to test your installation.

```js
const matrix = require("@matrix-io/matrix-lite");

let everloop = new Array(matrix.led.length);

let ledAdjust = 0.0;
if (everloop.length == 35) {
    ledAdjust = 0.51; // MATRIX Creator
} else {
    ledAdjust = 1.01; // MATRIX Voice
}

let frequency = 0.375;
let counter = 0.0;
let tick = everloop.length - 1;

setInterval(()=>{
    // Create rainbow
    for(i = 0; i < everloop.length; i++) {
        let led = {};
        led.r = Math.round(Math.max(0, (Math.sin(frequency*counter+(Math.PI/180*240))*155+100)/10));
        led.g = Math.round(Math.max(0, (Math.sin(frequency*counter+(Math.PI/180*120))*155+100)/10));
        led.b = Math.round(Math.max(0, (Math.sin(frequency*counter)*155+100)/10));

        counter += ledAdjust;

        everloop[i] = led;
    };

    // Slowly show rainbow
    if (tick != 0) {
        for (i = tick; i > 0; i--) {
            everloop[i] = {};
        }
        tick--;
    }

    matrix.led.set(everloop);

},35);
```

<h3 style="padding-top: 0">Running index.js</h3>
Once you have `index.js` ready, use the following command to run our rainbow Hello World. 
```bash
node index.js
```


<h3 style="padding-top: 0">Result</h3>
![](/matrix-lite/img/everloop_rainbow.gif)


<br/>
## Next Steps
With your device now setup, you can visit our [Reference](../js-reference) page to get started with MATRIX Lite.
