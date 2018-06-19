<h2 style="padding-top:0">Wakeword</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The Wakeword driver allows for:

* Reading custom wakewords created with <a href="http://www.speech.cs.cmu.edu/tools/lmtool-new.html" target="_blank">Sphinx Knowledge Base</a>.
* Notifications on which wakewords are heard.

<h3 style="padding-top:0">Available ZeroMQ Ports</h3>

* `Base port`: 60001
* `Keep-alive port`: 60002
* `Error port`: 60003
* `Data update port`: 60004

## Installation
In order to use MATRIX CORE wakeword, you must install the following on your MATRIX device.

Install the **MATRIX Kernel** modules.
```language-bash
sudo apt install matrixio-kernel-modules
```
Install the **MATRIX CORE Wakeword Package**.
```language-bash
sudo apt install matrixio-malos-wakeword
```
Perform a **reboot** before moving on.
```language-bash
sudo reboot
```

## Creating Custom Phrases
To create custom phrases, you must upload a .txt file to <a href="http://www.speech.cs.cmu.edu/tools/lmtool-new.html" target="_blank">Sphinx Knowledge Base</a> and download the files it gives you in response.

Below is an example text file that has each phrase separated by a line break. Once this is uploaded to the Sphinx Knowledge base, you will receive the necessary language and dictation file you need to use the Wakeword Driver.

```
matrix start action
matrix stop action
matrix ring red
matrix ring blue
matrix ring green
matrix ring clear
```

## Protocol

<!-- Base PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Base Port</summary>
This port accepts three configurations for communicating with the Wakeword driver. 

* `delay_between_updates` - controls the output speed of messages from the **Data Update port**. 

* `timeout_after_last_ping` - stops sending messages from the **Data Update port** if nothing has been sent to the **Keep-alive port** after the specified amount of seconds.

* `wakeword` - the wakeword configuration that's created from a `WakeWordParams` message.

```language-protobuf
message DriverConfig {
  // Delay between updates in seconds
  float delay_between_updates = 1;
  // Timeout after last ping
  float timeout_after_last_ping = 2;
  // Wakeword service configuration
  matrix_io.malos.v1.io.WakeWordParams wakeword = 12;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/master/matrix_io/malos/v1/driver.proto" target="_blank">here</a>.

`WakeWordParams` 

* `MicChannel` - Desired MATRIX device microphone to use.

* `lm_path` - File path for language model.

* `dic_path` - File path for dictation.

* `enable_verbose` - Boolean to send output to stdout.

* `stop_recognition` - Stop Pocket Sphinx service.

```language-protobuf
message WakeWordParams {
  // Mic channels
  enum MicChannel {
    channel0 = 0;
    channel1 = 1;
    channel2 = 2;
    channel3 = 3;
    channel4 = 4;
    channel5 = 5;
    channel6 = 6;
    channel7 = 7;
    channel8 = 8;
  }
  // Desired mic channel
  MicChannel channel = 2;

  // http://www.speech.cs.cmu.edu/tools/lmtool-new.html
  // Language model path
  string lm_path = 3;
  // dictionary path from lmtool
  string dic_path = 4;

  // enable pocketsphinx verbose mode
  bool enable_verbose = 5;

  // stop recognition service
  bool stop_recognition = 6;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
</details>

<!-- Keep-alive PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Keep-alive Port</summary>
This driver needs keep-alive messages in order to send data to your application. It's recommended to send an empty string `""` because the contents of a keep-alive message are never read.
</details>

<!-- Error PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Error Port</summary>
Applications can subscribe to this port to receive driver related errors.
</details>

<!-- Data Update PORT -->
<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">Data Update Port</summary>
Applications can subscribe to this port for Everloop data. The output will be a serialized message of type `EverloopImage` with the following information.

```language-protobuf
// The led array.
message WakeWordParams {
  // Wake Word
  string wake_word = 1;
}
```
View the defined message <a href="https://github.com/matrix-io/protocol-buffers/blob/65397022e73ac98ec2b217937f133a9eefbd8f01/matrix_io/malos/v1/io.proto" target="_blank">here</a>.
</details>