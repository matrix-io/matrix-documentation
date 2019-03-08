<h2 style="padding-top:0">Install MATRIX HAL</h2>

MATRIX HAL is at the base of each MATRIX Lite library. This makes it a requirement to have it installed on your Raspberry Pi. Below are the installation instructions

**[Click Here To Install MATRIX HAL](../../matrix-hal/getting-started/)**

## Language Setup
<!-- JAVASCRIPT -->
<details open>
<summary style="font-size: 1.45rem; font-weight: 300;">JavaScript Setup</summary>

**Install Node.js**
```language-bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install node
```

**Create A Project.**
```language-bash
mkdir lite_js
cd lite_js
npm init -y
touch index.js
```

**Download the MATRIX-Lite-JS Package.**
```language-bash
npm install @matrix-io/matrix-lite --save
```

**See the [Next Steps](#next-steps)**

</details>

<!-- PYTHON -->
<details open>
<summary style="font-size: 1.45rem; font-weight: 300;">Python Setup</summary>

Python support is currently under development, but you can view its current progress through the GitHub repository that's linked below.

<a href="https://github.com/matrix-io/matrix-lite-py" target="_blank">matrix-lite-py <span style="color: orange">(***In Development***)</span></a>

</details>

## Next Steps
With your device now setup, you can visit our [Reference](reference/index.md) page to get started with MATRIX Lite.

While Python support is in development, the reference will only be for JavaScript.