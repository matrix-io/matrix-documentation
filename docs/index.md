# MATRIX Ecosystem Overview

The MATRIX Ecosystem was created to make powerful hardware projects very approachable for software developers. The pillars of MATRIX, computer vision, hardware interfaces, distributed internet communication, and data-driven end-user clients, are all programming disciplines which require years for an individual to master, or for a team to build a solution around.

MATRIX adds powerful capabilities to your Raspberry Pi, depending on your background and the kind of application you want to write, you may prefer to integrate with different layers. The documentation is organized according to these layers:

* [MATRIX Ecosystem Overview](/#overview)
* [MATRIX OS Docs](/#matrix-open-system)
* [MATRIX CORE Docs](/#matrix-core)
* [MATRIX HAL Docs](/#matrix-hal)

<a name="overview"></a>
![MATRIX Ecosystem Overview](img/overview-diagram.png "Logo Title Text 1")

## MATRIX Open System
Top-level application management layer which integrates with the MATRIX Creator hardware via **MATRIX CORE**.

[Read more about MATRIX Applications](matrix-os/overview/)

## MATRIX CORE
Abstraction layer for HAL. Hosts the ZeroMQ + Protobuf communication layer which makes the sensors accessible via high-level interfaces. Supports 40+ different languages, C++, Python, Ruby, PHP, Java, etc. 

[Read more about MATRIX CORE](matrix-core/index.md)

## MATRIX HAL
C++ drivers for sensors and available components. Tooling for accessing the FPGA and microcontrollers on the MATRIX device.

[Read more about MATRIX HAL](matrix-hal/index.md)

## What do you need to get started?
* Raspberry Pi 2/3 & 8GB SD Card
* MATRIX Creator

## Support
* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)
* Submit documentation issues or improvements at [matrix-io/matrix-documentation](https://github.com/matrix-io/matrix-documentation)

## MATRIX Requirements
* [Raspberry Pi](https://www.raspberrypi.org)
* [MATRIX Creator](https://creator.matrix.one)

