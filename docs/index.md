# Getting Started
This documentation is for MATRIX Creator and MATRIX OS.
________
![Matrix Creator](http://packages.matrix.one/wiki-images/general-assets/hand-small.png)
## Setup

### Installing Dependencies
* [Installing required device software](intro/install.md)

### Installing MALOS
* [How to Implement the Everloop LED array](intro/hal.md) -- Using HAL C++ hardware abstraction layer.
* [Installing MALOS Interface](intro/malos.md) -- Using Node.js and MALOS (Matrix Abstraction Layer for OS).

## Hardware

### FPGA and SAM3 MCU
These will be programmed for you at boot after you follow the [getting started](install) session, but here is the documentation that you need in case you want to program them yourself.
* [FPGA programming](Hardware/fpga.md)
* [SAM3 flash](Hardware/Sam3.md)
* [SAM3 MCU firmware programming](Hardware/sam3mcu-programming.md)

### Reference
* [Overview](Reference/overview.md)
* [Expansion connector pinout](Reference/pinout.md)
* [Firmware for the SAM3S MCU](https://github.com/matrix-io/matrix-creator-mcu)
________
## Installing MATRIX OS

[MATRIX OS](http://github.com/matrix-io/matrix-os)

MATRIX OS is a device and language agnostic approach towards building IoT applications which can utilize sensors, integrations, external API's and powerful computer vision, to drive real world behavior.

All the hardware is abstracted away, so you don't have to worry about reading voltages.
All the infrastructure is provided, so you can easily gather data from hundreds of devices in real time.

### Overview
* [CLI](CLI/overview.md) - Manage your devices and apps through the CLI
* [Config](Configuration/overview.md) - App configuration informs device permissions, dashboards, data storage, app meta information and service integrations
* [API](API/overview.md) - MatrixOS syntax and examples

### Language Support
MATRIX OS currently supports JavaScript. Next on the list is Python.
________
## Support

* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)

### Feedback
We at AdMobilize have spent tens of thousands of hours making this for you. Please let us know your thoughts and feedback.
