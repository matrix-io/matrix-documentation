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

> ⚠️FPGA source does not contain audio processing code⚠️

FPGA source code is located <a href="https://github.com/matrix-io/matrix-creator-fpga" target="_blank">here</a>.

## FPGA Flashing

Below is a guide on how to flash a premade user-provided FPGA bitstream onto the Xilinx Spartan-6 FPGA for the MATRIX Creator.

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
sudo apt-get install matrixio-creator-init
```

Reboot your device.

```language-bash
sudo reboot
```

Backup the stock `system_creator.bit` file.

```language-bash
sudo mv /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit /usr/share/matrixlabs/matrixio-devices/blob/system_creator_stock.bit
```

Copy your built `system_creator.bit` FPGA bitstream file to the blob folder.

```language-bash
sudo cp /path/to/your/file /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit
```

Now you can flash the FPGA.

Reset the FPGA.

```language-bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Flash the FPGA.

```language-bash
cd /usr/share/matrixlabs/matrixio-devices/
xc3sprog -c matrix_creator blob/system_creator.bit -p 1
```

You should receive the following (may vary due to user-provided file).

```language-bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

DNA is 0x99a9bca3325faafd
```

Reset the FPGA.

```language-bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Updating the `matrixio-creator-init` package will cause the stock FPGA bitstream to be flashed upon next boot.

You can stop `sudo apt-get upgrade` from automatically updating the `matrixio-creator-init` package with the following command.

```language-bash
sudo apt-mark hold matrixio-creator-init
```

Wait 8 seconds for your device to power off and unplug the power cable from your device.

```language-bash
sudo poweroff
```

Plug the power cable back into your device.

## Restore Original Firmware

To restore the original firmware, restore the stock `system_creator.bit` file in the blob folder.

```language-bash
sudo rm /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit
sudo cp /usr/share/matrixlabs/matrixio-devices/blob/system_creator_stock.bit /usr/share/matrixlabs/matrixio-devices/blob/system_creator.bit
```

Now you can flash the FPGA.

Reset the FPGA.

```language-bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Flash the FPGA.

```language-bash
cd /usr/share/matrixlabs/matrixio-devices/
xc3sprog -c matrix_creator blob/system_creator.bit -p 1
```

You should receive the following.

```language-bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

DNA is 0x99a9bca3325faafd
```

Reset the FPGA.

```language-bash
echo 18 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio18/direction
echo 1 > /sys/class/gpio/gpio18/value
echo 0 > /sys/class/gpio/gpio18/value
echo 1 > /sys/class/gpio/gpio18/value
```

Allow `sudo apt-get upgrade` to update the `matrixio-creator-init` package.

```language-bash
sudo apt-mark unhold matrixio-creator-init
```

Wait 8 seconds for your device to power off and unplug the power cable from your device.

```language-bash
sudo poweroff
```

Plug the power cable back into your device.