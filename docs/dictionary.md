## Glossary
The dictionary will describe all components of the system.

#### MATRIX Open Source (MATRIX OS)
Top-level application layer which integrates into the MATRIX Creator hardware, and Raspberry Pi. 

#### MATRIX Command Line Interface (MATRIX CLI)
Command Line Interface that integrates into the top-level MATRIX OS. Built to allow quick application development and application management on the Raspberry Pi.

#### CORE
C++ abstraction layer for HAL. Hosts the ZeroMQ communication layer which makes the sensors accessible via high-level interfaces. 

#### CORE Eye
C++ Computer Vision Framework.

#### Hardware Abstraction Layer (HAL)
C++ drivers for sensors and available components.

#### Applications
An application is a service running inside of a container on a physical or simulated instance of a device. Driven by MATRIX OS.

#### Devices
A device is a physical or simulated instance of the hardware. Determined by the MATRIX OS.

#### Cross-Talk
Event-based triggers that can occur across applications, and/or devices.

