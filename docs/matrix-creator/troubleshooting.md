## Community

Please visit our community support forums at
<a href="http://community.matrix.one/" target="_blank">community.matrix.one</a>

## Reinstall MATRIX Init Package and Reflash FPGA and MCU

If you experience strange behavior, reinstall the MATRIX init package and reflash FPGA and MCU.

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

> FPGA will be reflashed with stock firmware.

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

> MCU will be reflashed with stock firmware.

Now you can flash the MCU.

```language-bash
cd /usr/share/matrixlabs/matrixio-devices/
sudo openocd -f cfg/sam3s_rpi_sysfs.cfg
```

The last part of the `openocd` flashing command output should be the following.

```language-bash
flash 'at91sam3' found at 0x00400000
wrote 36636 bytes from file blob/ch.bin to flash bank 0 at offset 0x00000000 in 4.665386s (7.669 KiB/s)
Info : JTAG tap: em358.cpu tap/device found: 0x3ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x3)
Info : JTAG tap: em357.bs tap/device found: 0x069aa62b (mfg: 0x315 (Ember Corporation), part: 0x69aa, ver: 0x0)Info : JTAG tap: xc6sxl4.fpga.fpga tap/device found: 0x24000093 (mfg: 0x049 (Xilinx), part: 0x4000, ver: 0x2)
Info : JTAG tap: sam3n.cpu.cpu tap/device found: 0x4ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x4)
Warn : Only resetting the Cortex-M core, use a reset-init event handler to reset any peripherals or configure hardware srst support.
shutdown command invoked
```

Reboot your device.

```language-bash
sudo reboot
```

## Reinstall MATRIX Kernel Modules

If you experience strange behavior, reinstall the MATRIX kernel modules.

Uninstall the `matrixio-kernel-modules` package.

```language-bash
sudo apt-get --purge remove matrixio-kernel-modules
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

Install the `matrixio-kernel-modules` package.

```language-bash
sudo apt-get install matrixio-kernel-modules
```

Reboot your device.

```language-bash
sudo reboot
```

## Check Raspberry Pi GPIO

If you experience strange behavior, check the Raspberry Pi GPIO.

```language-bash
sudo cat /sys/kernel/debug/gpio
```

You should receive the following.

```language-bash
gpiochip0: GPIOs 0-53, parent: platform/3f200000.gpio, pinctrl-bcm2835:
 gpio-4   (                    |sysfs               ) in  hi
 gpio-16  (                    |sysfs               ) out lo
 gpio-17  (                    |sysfs               ) in  hi
 gpio-18  (                    |sysfs               ) out hi
 gpio-19  (                    |sysfs               ) out hi
 gpio-20  (                    |sysfs               ) out hi
 gpio-21  (                    |sysfs               ) out hi
 gpio-22  (                    |sysfs               ) in  lo
 gpio-23  (                    |sysfs               ) out hi
 gpio-27  (                    |sysfs               ) in  hi
```

If `sysfs` above is replaced with `w1`, use raspi-config to disable the 1-Wire interface.

```language-bash
sudo raspi-config
```

Inside raspi-config, navigate to `Interfacing Options` >> `1-Wire` >> `NO`.

## Hardware Tests

These tests will check if your MATRIX Creator is functioning properly.

We first need to install matrixio-creator-init, which handles the flashing of FPGA.

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

Install the MATRIX init package.

```language-bash
sudo apt-get install matrixio-creator-init
```

Reboot your device.

```language-bash
sudo reboot
```

### Matrix Init Script

After the reboot, run the matrix init script manually.

```language-bash
sudo /usr/share/matrixlabs/matrixio-devices/matrix-init.bash
```

You should receive the following.

```language-bash
**** MATRIX Creator FPGA has been programmed!
INFO: [/dev/spidev0.0] was opened
FPGA IDENTIFY = 5c344e8
FPGA VERSION = 1000a
*** MATRIX Creator initial process has been launched
*** Running the program instead of the bootloader
EM358 MCU was programmed before. Not programming it again.
Running the program instead of the bootloader
SAM3 MCU was programmed before. Not programming it again.
```

If you have the matrixio-kernel-modules installed, you should receive this instead.

```language-bash
**** MATRIX Creator FPGA has been programmed!
INFO: [/dev/matrixio_regmap] was opened
FPGA IDENTIFY = 5c344e8
FPGA VERSION = 1000a
*** MATRIX Creator initial process has been launched
*** Running the program instead of the bootloader
EM358 MCU was programmed before. Not programming it again.
Running the program instead of the bootloader
SAM3 MCU was programmed before. Not programming it again.
```

### FPGA Info

This program checks the fpga info.

```language-bash
sudo /usr/share/matrixlabs/matrixio-devices/fpga_info
```

You should receive the following.

```language-bash
INFO: [/dev/spidev0.0] was opened
FPGA IDENTIFY = 5c344e8
FPGA VERSION = 1000a
```

If you have the matrixio-kernel-modules installed, you should receive this instead.

```language-bash
INFO: [/dev/matrixio_regmap] was opened
FPGA IDENTIFY = 5c344e8
FPGA VERSION = 1000a
```

### FPGA Flash

If you don’t get the proper FPGA info you will need to run the FPGA flashing process.

```language-bash
cd /usr/share/matrixlabs/matrixio-devices/
sudo ./fpga-program.bash
```

You should receive the following.

```language-bash
**** MATRIX Creator FPGA has been programmed!
INFO: [/dev/spidev0.0] was opened
FPGA IDENTIFY = 5c344e8
FPGA VERSION = 1000a
```

If you have the matrixio-kernel-modules installed, you should receive this instead.

```language-bash
**** MATRIX Creator FPGA has been programmed!
INFO: [/dev/matrixio_regmap] was opened
FPGA IDENTIFY = 5c344e8
FPGA VERSION = 1000a
```

If you get `**** Could not program FPGA`, please <a href="https://community.matrix.one" target="_blank">contact us</a></h3>.

### Test Other Components

<a href="/matrix-hal/getting-started/installation-package/" target="_blank">Install MATRIX HAL </a> and test other components such as the microphone array using the <a href="/matrix-hal/examples/" target="_blank">MATRIX HAL examples</a>.