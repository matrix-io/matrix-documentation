<h2 style="padding-top:0">FPGA</h2>
<h4 style="padding-top:0">Flashing Guide</h4>

> ⚠️Modifying FPGA source may have unintended consequences⚠️

### Device Compatibility

<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The FPGA handles:

- GPIO output
- UART for Zigbee and Z-Wave
- Connections between board components
- Microphone processing (not provided in source code)

## FPGA Source

FPGA source code is located <a href="https://github.com/matrix-io/matrix-creator-fpga" target="_blank">here</a>.

## Verilog Cheat Sheet

For refreshers on FPGA Verilog HDL syntax and concepts, check out <a href="https://github.com/matrix-io/matrix-creator-fpga/blob/master/verilogCheatSheet.md" target="_blank">this</a> cheat sheet.

## FPGA Flashing

Below is a guide on how to flash a premade user-provided FPGA bitstream onto the Xilinx Spartan-6 FPGA for the MATRIX Creator.

We first need to install a few prerequisites.

Add the MATRIX repository and key.

```bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
```

Update your repository and packages.

```bash
sudo apt-get update
sudo apt-get upgrade
```

Install the required packages.

```bash
sudo apt-get install matrixio-creator-init
```

Reboot your device.

```bash
sudo reboot
```

Backup the stock `system_creator.bit` file.

```bash
sudo mv /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit /usr/share/matrixlabs/matrixio-devices/blob/system_creator_stock.bit
```

Copy your built `system_creator.bit` FPGA bitstream file to the blob folder.

```bash
sudo cp /path/to/your/file /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit
```

Now you can flash the FPGA.

Reset the FPGA.

```bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Flash the FPGA.

```bash
cd /usr/share/matrixlabs/matrixio-devices/
xc3sprog -c matrix_creator blob/system_creator.bit -p 1
```

You should receive the following (may vary due to user-provided file).

```bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

DNA is 0x99a9bca3325faafd
```

Reset the FPGA.

```bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Updating the `matrixio-creator-init` package will cause the stock FPGA bitstream to be flashed upon next boot.

You can stop `sudo apt-get upgrade` from automatically updating the `matrixio-creator-init` package with the following command.

```bash
sudo apt-mark hold matrixio-creator-init
```

Power off your device.

```bash
sudo poweroff
```

Wait until the green led on your Raspberry Pi blinks 10 times, then unplug the power cable from your Raspberry Pi.

Plug the power cable back into your Raspberry Pi.

## Restore Original Firmware

To restore the original firmware, restore the stock `system_creator.bit` file in the blob folder.

```bash
sudo rm /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit
sudo cp /usr/share/matrixlabs/matrixio-devices/blob/system_creator_stock.bit /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit
```

Now you can flash the FPGA.

Reset the FPGA.

```bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Flash the FPGA.

```bash
cd /usr/share/matrixlabs/matrixio-devices/
xc3sprog -c matrix_creator blob/system_creator.bit -p 1
```

You should receive the following.

```bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

DNA is 0x99a9bca3325faafd
```

Reset the FPGA.

```bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Allow `sudo apt-get upgrade` to update the `matrixio-creator-init` package.

```bash
sudo apt-mark unhold matrixio-creator-init
```

Power off your device.

```bash
sudo poweroff
```

Wait until the green led on your Raspberry Pi blinks 10 times, then unplug the power cable from your Raspberry Pi.

Plug the power cable back into your Raspberry Pi.