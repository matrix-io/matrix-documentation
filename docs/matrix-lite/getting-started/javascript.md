<h2 style="padding-top:0">Prerequisite MATRIX HAL</h2>

<!-- MATRIX HAL is at the base of each MATRIX Lite library. This makes it a requirement to have it installed on your Raspberry Pi. Below are the installation instructions -->

> Make sure you have installed [MATRIX HAL](/matrix-hal/getting-started/), before continuing.

## JavaScript Setup

Install Node.js
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install node
```

Create A Project Folder.
```bash
mkdir lite_js
cd lite_js
npm init -y
touch index.js
```

Download the matrix-lite-js Package.
```bash
npm install @matrix-io/matrix-lite --save
```

<br/>
## Next Steps
With your device now setup, you can visit our [Reference](../js-reference) page to get started with MATRIX Lite.
