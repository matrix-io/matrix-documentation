## Installing Node.js
This setup will go through how to install <a href="https://nodejs.org/en/" target="_blank">Node.js</a> and the dependencies needed to create a Node application that can communicate with MATRIX CORE.

Run the following commands on your MATRIX device(Raspberry Pi) to install <a href="https://github.com/creationix/nvm" target="_blank">Node Version Manager</a> which will then be used to install version `8.6` of Node.js.
> Its **strongly** recommended to use version `8.6` of Node.js
```language-bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install 8.6
```

<br/>
## Creating A Node.js Application
<h3 style="padding-top: 0">Making Your Project Directory</h3>
Use the following commands to initialize a Node project folder, in the home directory `~/` of your MATRIX device.
```language-bash
cd ~/
mkdir matrix-core-projects
cd matrix-core-projects
npm init
```

<h3 style="padding-top: 0">Installing npm Packages for ZMQ and Protocol Buffers</h3>
The next commands install the ZMQ and MATRIX Protocol Buffers npm packages to use in your Node app.
```language-bash
npm install zmq --save
npm install matrix-protos --save
```

<!-- ## Download and Prepare CORE
```language-bash
git clone https://github.com/matrix-io/matrix-creator-malos
cd matrix-creator-malos
cd src/js_test
npm install
``` -->

<br/>
## Check If Everything Works
