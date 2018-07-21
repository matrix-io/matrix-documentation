<h2 style="padding-top:0">FPGA</h2>
<h4 style="padding-top:0">Flashing Guide</h4>

> ⚠️Modifying FPGA source may have unintended consequences⚠️

### Device Compatibility

<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The FPGA handles:

- GPIO output
- Connections between board components
- Microphone processing (not provided in source code)

## FPGA Source

> ⚠️FPGA source does not contain audio processing code⚠️

FPGA source code is located <a href="https://github.com/matrix-io/matrix-voice-fpga" target="_blank">here</a>.

## FPGA Flashing

Below is a guide on how to flash a premade user-provided FPGA bitstream onto the Xilinx Spartan-6 FPGA for the MATRIX Voice.

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

Copy your built `system_voice.bit` FPGA bitstream file to the blob folder.
 
```language-bash
sudo mv /usr/share/matrixlabs/matrixio-devices/blob/system_voice.bit /usr/share/matrixlabs/matrixio-devices/blob/system_voice_stock.bit
sudo cp /path/to/your/file /usr/share/matrixlabs/matrixio-devices/blob/system_voice.bit
```

Now you can flash the FPGA.

Reset the FPGA.

```language-bash
echo 26 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio26/direction  
echo 1 > /sys/class/gpio/gpio26/value  
echo 0 > /sys/class/gpio/gpio26/value  
echo 1 > /sys/class/gpio/gpio26/value
```

Flash the SPI Flash bootloader onto FPGA.

```language-bash
xc3sprog -c matrix_voice blob/bscan_spi_s6lx9_ftg256.bit
```

You should receive the following (may vary due to user-provided file).

```language-bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

DNA is 0xf9d61a1ecbb64401
```

Flash the SPI Flash.

```language-bash
xc3sprog -c matrix_voice -I blob/system_voice.bit
```

You should receive the following (may vary due to user-provided file).

```language-bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

JEDEC: c2 20 0x17 0xc2
Found Macronix MX25L Device, Device ID 0x2017
256 bytes/page, 262144 pages = 67108864 bytes total
Verify: Success!
```

Reset the FPGA.

```language-bash
echo 26 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio26/direction  
echo 1 > /sys/class/gpio/gpio26/value  
echo 0 > /sys/class/gpio/gpio26/value  
echo 1 > /sys/class/gpio/gpio26/value
```

Reboot your device.

```language-bash
sudo reboot
```

## Restore Original Firmware

To restore the original firmware, restore the stock `system_voice.bit` file in the blob folder.

```language-bash
sudo rm /usr/share/matrixlabs/matrixio-devices/blob/system_voice.bit
sudo mv /usr/share/matrixlabs/matrixio-devices/blob/system_voice_stock.bit /usr/share/matrixlabs/matrixio-devices/blob/system_voice.bit
```

Now you can flash the FPGA.

Reset the FPGA.

```language-bash
echo 26 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio26/direction  
echo 1 > /sys/class/gpio/gpio26/value  
echo 0 > /sys/class/gpio/gpio26/value  
echo 1 > /sys/class/gpio/gpio26/value
```

Flash the SPI Flash bootloader onto FPGA.

```language-bash
xc3sprog -c matrix_voice blob/bscan_spi_s6lx9_ftg256.bit
```

You should receive the following.

```language-bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

DNA is 0xf9d61a1ecbb64401
```

Flash the SPI Flash.

```language-bash
xc3sprog -c matrix_voice -I blob/system_voice.bit
```

You should receive the following.

```language-bash
XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
Free software: If you contribute nothing, expect nothing!
Feedback on success/failure/enhancement requests:
        http://sourceforge.net/mail/?group_id=170565
Check Sourceforge for updates:
        http://sourceforge.net/projects/xc3sprog/develop

JEDEC: c2 20 0x17 0xc2
Found Macronix MX25L Device, Device ID 0x2017
256 bytes/page, 262144 pages = 67108864 bytes total
Verify: Success!
```

Reset the FPGA.

```language-bash
echo 26 > /sys/class/gpio/export 2>/dev/null
echo out > /sys/class/gpio/gpio26/direction  
echo 1 > /sys/class/gpio/gpio26/value  
echo 0 > /sys/class/gpio/gpio26/value  
echo 1 > /sys/class/gpio/gpio26/value
```

Reboot your device.

```language-bash
sudo reboot
```