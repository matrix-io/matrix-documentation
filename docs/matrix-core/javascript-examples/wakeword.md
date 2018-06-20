<h2 style="padding-top:0">Wakeword</h2>
<h4 style="padding-top:0">Javascript Example</h4>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The Wakeword driver allows for:

* Reading custom wakewords created with <a href="http://www.speech.cs.cmu.edu/tools/lmtool-new.html" target="_blank">Sphinx Knowledge Base</a>.
* Notifications on which wakewords are heard.

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 60001
* `Error port`: 60003
* `Data update port`: 60004

## Code Example
The following sections show how to implement a connection to each of the Wakeword driver's ports. You can download this example <a href="https://github.com/matrix-io/matrix-core-examples/blob/master/javascript/wakeword.js" target="_blank">here</a>.

<!-- Setup -->
> Before moving on, please take a look at the Wakeword driver's protocol page and follow the [Installation](./../protocols/wakeword#http://localhost:8000/matrix-core/protocols/wakeword/#installation) & [Creating Custom Phrases](http://localhost:8000/matrix-core/protocols/wakeword/#creating-custom-phrases) sections.

<!-- Initial Variables -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Initial Variables</summary>
Before we go into connecting to each port, the variables defined below are needed in order to access the ZeroMQ and MATRIX Protocol Buffer libraries for Javascript. We also define a few helpful variables and the path for our <a href="http://www.speech.cs.cmu.edu/tools/lmtool-new.html" target="_blank">Sphinx Knowledge Base</a> files.
```language-javascript
var matrix_ip = '127.0.0.1';// Local Device IP
var matrix_wakeword_base_port = 60001; // Wakeword base port
var matrix_io = require('matrix-protos').matrix_io;// MATRIX Protocol Buffers
var zmq = require('zeromq');// Asynchronous Messaging Framework
const LM_PATH = 'INSERT_PATH_TO_YOUR_FILE.lm';// Language Model File
const DIC_PATH = 'INSERT_PATH_TO_YOUR_FILE.dic';// Dictation File
```
</details>

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
Here is where the configuration for our wakeword example goes. Once we connect to the **Base Port**, We will pass a configuration to the Wakeword driver. With this we can set our wakeword configurations.
```language-javascript
// Create a Pusher socket
var configSocket = zmq.socket('push');
// Connect Pusher to Base port
configSocket.connect('tcp://' + matrix_ip + ':' + matrix_wakeword_base_port /* config */);
// Create driver configuration
var config = matrix_io.malos.v1.driver.DriverConfig.create(
{ // Create & Set wakeword configurations
  wakeword: matrix_io.malos.v1.io.WakeWordParams.create({
    lmPath: LM_PATH,// Language model file path
    dicPath: DIC_PATH,// Dictation file path
    channel: matrix_io.malos.v1.io.WakeWordParams.MicChannel.channel8,// Desired MATRIX microphone
    enableVerbose: false// Enable verbose option
  })
});
// Send configuration to MATRIX device
configSocket.send(matrix_io.malos.v1.driver.DriverConfig.encode(config).finish());
console.log('Listening for wakewords');
```
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
Unlike other drivers, the Wakeword driver does not need a **Keep-alive Port**.

</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Connecting to the **Error Port** is optional, but highly recommended if you want to log any errors that occur within MATRIX CORE.
```language-javascript
// Create a Subscriber socket
var errorSocket = zmq.socket('sub');
// Connect Subscriber to Error port
errorSocket.connect('tcp://' + matrix_ip + ':' + (matrix_wakeword_base_port + 2));
// Connect Subscriber to Error port
errorSocket.subscribe('');
// On Message
errorSocket.on('message', function(error_message){
  console.log('Error received: ' + error_message.toString('utf8'));// Log error
});
```
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
A connection to the **Data Update Port** is then made to allow us to receive each custom phrase the Wakeword driver picks up.

```language-javascript
// Create a Subscriber socket
var updateSocket = zmq.socket('sub');
// Connect Subscriber to Base port
updateSocket.connect('tcp://' + matrix_ip + ':' + (matrix_wakeword_base_port + 3));
// Subscribe to messages
updateSocket.subscribe('');
// On Message
updateSocket.on('message', function(wakeword_buffer) {
  // Extract message
  var wakeWordData = matrix_io.malos.v1.io.WakeWordParams.decode(wakeword_buffer);
  // Log message
  console.log(wakeWordData);
  // Run actions based on the phrase heard
  switch(wakeWordData.wakeWord) {
    // CHANGE TO YOUR PHRASE
    case "MATRIX START":
      console.log('I HEARD MATRIX START!');
      break;
    // CHANGE TO YOUR PHRASE
    case "MATRIX STOP":
      console.log('I HEARD MATRIX STOP!');
      break;
  }
});
```
<h4>Data Output</h4>
The javascript object below is an example output you'll receive from the **Data Update Port**. All wakeword strings are capitalized.
```language-javascript
{
  WakeWordParams { wakeWord: 'MATRIX START' }
}
```
</details>