## Community

Please visit our community support forums at
<a href="http://community.matrix.one/" target="_blank">community.matrix.one</a>

## Reinstall MATRIX Init Package

If you experience strange behavior, reinstall the MATRIX init package.

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

### Check Raspberry Pi GPIO

If you experience strange behavior, check the Raspberry Pi GPIO.

```language-bash
sudo cat /sys/kernel/debug/gpio
```

You should receive the following.

```language-bash
gpiochip0: GPIOs 0-53, parent: platform/3f200000.gpio, pinctrl-bcm2835:
 gpio-18  (                    |sysfs               ) out hi
 gpio-24  (                    |sysfs               ) out hi
 gpio-25  (                    |sysfs               ) out hi
 gpio-26  (                    |sysfs               ) out hi
```

If `sysfs` above is replaced with `w1`, use raspi-config to disable the 1-Wire interface.

```language-bash
sudo raspi-config
```

Inside raspi-config, navigate to `Interfacing Options` >> `1-Wire` >> `NO`.

## Hardware Tests

These tests will check if your MATRIX Voice is functioning properly.

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
*** MATRIX Voice has a updated firmware
*** MATRIX Voice initial process has been launched
```

### FPGA Info

This program checks the fpga info.

```language-bash
sudo /usr/share/matrixlabs/matrixio-devices/fpga_info
```

You should receive the following.

```language-bash
INFO: [/dev/spidev0.0] was opened
FPGA IDENTIFY = 6032bad2
FPGA VERSION = 1000a
```

If you have the matrixio-kernel-modules installed, you should receive this instead.

```language-bash
INFO: [/dev/matrixio_regmap] was opened
FPGA IDENTIFY = 6032bad2
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
*** MATRIX Voice has a updated firmware
```

If you get `**** Could not program FPGA`, please <a href="https://community.matrix.one" target="_blank">contact us</a></h3>.

### Test Other Components

<a href="/matrix-hal/getting-started/installation-package/" target="_blank">Install MATRIX HAL</a> and test other components such as the microphone array using the <a href="/matrix-hal/examples/" target="_blank">MATRIX HAL examples</a>.