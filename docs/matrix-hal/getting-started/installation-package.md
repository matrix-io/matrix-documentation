## Installing HAL From Package

> Make sure you have setup your
> [MATRIX Creator](/matrix-creator/device-setup) or
> [MATRIX Voice](/matrix-voice/device-setup) before continuing.

Before starting, ensure you have access to the terminal of your Raspberry Pi via an <a href="https://www.raspberrypi.org/documentation/remote-access/ssh/" target="_blank">SSH-session</a> or connect a screen, mouse, and keyboard. Once you've opened the terminal, insert and run the following commands one at a time.

```language-bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list

sudo apt-get update
sudo apt-get upgrade
```

The next command will install the MATRIX HAL packages.

```language-bash
sudo apt-get install matrixio-creator-init libmatrixio-creator-hal libmatrixio-creator-hal-dev
```

After commands are complete a reboot is required.

```language-bash
sudo reboot
```

MATRIX HAL header files are installed in `/usr/include/matrix_hal` and the compiled MATRIX HAL library file is installed in `/usr/lib/libmatrix_creator_hal.so`

## Next Steps

Now that HAL is properly installed, learn how to create and compile your own MATRIX programs [here](programs).
