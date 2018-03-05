# MATRIX Ecosystem Overview

##### Objective: Hardware shouldn't be hard

The MATRIX Ecosystem was created to make powerful hardware projects very approachable for software developers. The pillars of MATRIX, computer vision, hardware interfaces, distributed internet communication, and data-driven end-user clients, are all programming disciplines which require years for an individual to master, or for a team to build a solution around.

MATRIX adds powerful capabilities to your Raspberry Pi, depending on your background and the kind of application you want to write, you may prefer to integrate with different layers. The documentation is organized according to these layers:

* [MATRIX OS Docs](/#matrix-open-system) (⚠️ UNDER MAINTENANCE)
* [MATRIX CORE Docs](/#matrix-core)
* [MATRIX HAL Docs](/#matrix-hal)

![MATRIX Ecosystem Overview](img/overview-diagram.png)

## MATRIX Open System

Top-level application and connection layer integrating with MATRIX hardware via **MATRIX CORE**.

[Read more about MATRIX OS](matrix-os/overview/)

## MATRIX CORE

Abstraction layer for HAL. Hosts a ZeroMQ + Protobuf communication layer which makes device information accessible via high-level interfaces. Supports 40+ different languages, C++, Python, Ruby, PHP, Java, etc. 

[Read more about MATRIX CORE](matrix-core/index.md)

## MATRIX HAL

C++ drivers for sensors and available components. Tooling for accessing the FPGA and microcontrollers on the MATRIX device.

[Read more about MATRIX HAL](matrix-hal/index.md)

## What do you need to get started?

* [Raspberry Pi](https://www.raspberrypi.org)
    * Supported Versions: Raspberry Pi B+ or newer and all Raspberry Pi Zero's
* [MATRIX Creator](https://creator.matrix.one) or [MATRIX Voice](https://voice.matrix.one)

## Support

* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)
* Submit documentation issues or improvements at [matrix-io/matrix-documentation](https://github.com/matrix-io/matrix-documentation)

