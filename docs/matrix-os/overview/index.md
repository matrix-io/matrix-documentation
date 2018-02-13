# Overview

⚠️ **CURRENTLY UNDER MAINTENANCE** Find out more information [here](../matrix-os/).

MATRIX Open System (MOS) is open source software for hosting IoT applications. MATRIX Open System runs on node.js, and initially, applications will be written in JavaScript, however, as we finish writing SDKs, other languages will be supported. Python is first up.

## Applications

Fundamentally, MATRIX OS applications logically connect hardware with machine learning abstractions. In this way, you can connect the output from a computer vision system to drive real-world behavior in the form of hardware signaling. You can also use third party API's and integrations, such as IFTTT to further customize your application, for yourself, or for end-users.

Read more at [Overview > Applications](applications.md)

## Dashboard

MOS applications optionally include a dashboard for exploring data.

Read more at [Overview > Dashboard](dashboard.md)

## Configuration
In order to make MOS applications flexible, powerful, and discoverable, each application has an associated file, `config.yaml` which sets the meta information needed for an application to execute safely and consistently.

Read more at [Overview > Configuration](configuration.md)

## Command Line Interface
Along with mobile applications and the dashboard, the Command Line Interface (CLI) enables you to manage your MATRIX device and associated applications. If you want to develop MATRIX OS applications, you need to use the CLI to manage different aspects of the development lifecycle. 

Read more at [Overview > Command Line Interface](cli.md)

## Sending Data

MATRIX devices will only externally store data if it is explicitly sent via an application. If you want to use MATRIX Dashboard components to work with your data, it will need to be exported using the `send` command.

Read more at [Overview > Sending Data](data.md)

## Application Publishing

You can freely publish MATRIX applications to the MATRIX App store. 

Read more at [Overview > Publishing](publishing.md)

## Manual Setup

If you want to install MOS from scratch, start here.

Read more at [Manual Setup](manual-setup.md)
