# Welcome to the MATRIX documentation

![Matrix Creator](http://packages.matrix.one/wiki-images/general-assets/hand-small.png)

This documentation is for MATRIX Creator and MATRIX OS.

## Creator Getting Started

### Base Install
* [Installing required device software](intro/install.md)

### Step Two

#### Low Level Software
* [How to Implement the Everloop LED array](intro/hal.md) -- Using HAL C++ hardware abstraction layer.

#### High Level Software
* [Installing MALOS Interface](intro/malos.md) -- Using Node.js and MALOS (Matrix Abstraction Layer for OS).

## Hardware

### FPGA and SAM3 MCU
These will be programmed for you at boot after you follow the [getting started](2.-Getting-Started) session, but here is the documentation that you need in case you want to program them yourself.
* [FPGA programming](Hardware/fpga.md)
* [SAM3 flash](Hardware/Sam3.md)
* [SAM3 MCU firmware programming](Hardware/sam3mcu-programming.md)


### Reference
* [Overview](Reference/overview.md)
* [Expansion connector pinout](Reference/pinout.md)
* [Firmware for the SAM3S MCU](https://github.com/matrix-io/matrix-creator-mcu)

## Support

Post them on [raspberrypi.stackexchange.com](http://raspberrypi.stackexchange.com)! Use the tag #matrix-creator

Or post to our own forums

[community.matrix.one](http://community.matrix.one/)

# MatrixOS Documentation

[MATRIX OS](http://github.com/matrix-io/matrix-os)

MatrixOS is a device and language agnostic approach towards building IoT applications which can utilize sensors, integrations, external API's and powerful computer vision, to drive real world behavior.

All the hardware is abstracted away, so you don't have to worry about reading voltages.
All the infrastructure is provided, so you can easily gather data from hundreds of devices in real time.

## Overview
[CLI](CLI/overview.md) - Manage your devices and apps through the CLI

[Config](Configuration/overview.md) - App configuration informs device permissions, dashboards, data storage, app meta information and service integrations

[API](API/overview.md) - MatrixOS syntax and examples

## Language Support
Currently, MatrixOS supports JavaScript. Next on the list is Python.

### Feedback
We at AdMobilize have spent tens of thousands of hours making this for you. Please let us know your thoughts and feedback.
