<h2 style="padding-top:0">Microprocessor (MCU)</h2>
<h4 style="padding-top:0">Flashing Guide</h4>

> ⚠️Modifying MCU source may have unintended consequences⚠️

### Device Compatibility

<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The MCU handles:

- Interfacing with and processing sensor data
- Calculating Yaw, Pitch, Roll

## MCU Flashing

Below is a guide on how to flash modified source onto the Atmel SAM3S MCU for the MATRIX Creator.

For this guide, the source code will be modified to disable the blue blinking led (labeled D48 on board), which is controlled by the MCU.

![](/matrix-creator/img/mcu_d48_led.jpg)

We first need to install a few prerequisites.

Add the MATRIX repository and key.

```language-bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
```

Update your repository and packages.

```language-bash
sudo apt-get update
sudo apt-get upgrade
```

Install the required packages.

```language-bash
sudo apt-get install matrixio-creator-init git gcc-arm-none-eabi
```

Reboot your device.

```language-bash
sudo reboot
```

Then, clone the MCU source repo.

```language-bash
cd ~/
git clone https://github.com/matrix-io/matrix-creator-mcu.git
```

Edit the file `matrix-creator-mcu/creator/main.cpp`, commenting out line 82. This change disables the blue blinking led.

![](/matrix-creator/img/mcu_led_modify.png)

Then build the modified MCU source.

```language-bash
cd matrix-creator-mcu/creator
make
```

Copy the built `ch.bin` file to the blob folder.
 
```language-bash
sudo cp ./build/ch.bin /usr/share/matrixlabs/matrixio-devices/blob/ch.bin
```

Now you can flash the MCU.

```language-bash
cd /usr/share/matrixlabs/matrixio-devices/
sudo openocd -f cfg/sam3s_rpi_sysfs.cfg
```

The last part of the `openocd` flashing command output should be the following.

```language-bash
...
flash 'at91sam3' found at 0x00400000
wrote 36636 bytes from file blob/ch.bin to flash bank 0 at offset 0x00000000 in 4.665386s (7.669 KiB/s)
Info : JTAG tap: em358.cpu tap/device found: 0x3ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x3)
Info : JTAG tap: em357.bs tap/device found: 0x069aa62b (mfg: 0x315 (Ember Corporation), part: 0x69aa, ver: 0x0)Info : JTAG tap: xc6sxl4.fpga.fpga tap/device found: 0x24000093 (mfg: 0x049 (Xilinx), part: 0x4000, ver: 0x2)
Info : JTAG tap: sam3n.cpu.cpu tap/device found: 0x4ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x4)
Warn : Only resetting the Cortex-M core, use a reset-init event handler to reset any peripherals or configure hardware srst support.
shutdown command invoked
```

## Restore Original Firmware

To restore the original firmware reinstall the required MATRIX packages.

Uninstall the `matrixio-creator-init` package.

```language-bash
sudo apt-get --purge remove matrixio-creator-init
```

Reboot your device.

```language-bash
sudo reboot
```

Add the MATRIX repository and key.

```language-bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
```

Update your repository and packages.

```language-bash
sudo apt-get update
sudo apt-get upgrade
```

Install the `matrixio-creator-init` package.

```language-bash
sudo apt-get install matrixio-creator-init
```

Reboot your device.

```language-bash
sudo reboot
```

Upon reboot the `matrixio-creator-init` package will flash the MCU.