## Installing MATRIX HAL From Source

> Make sure you have setup your
> [MATRIX Creator](/matrix-creator/device-setup) or
> [MATRIX Voice](/matrix-voice/device-setup) before continuing.

Before starting, ensure you have access to the terminal of your Raspberry Pi via an <a href="https://www.raspberrypi.org/documentation/remote-access/ssh/" target="_blank">SSH-session</a> or connect a screen, mouse, and keyboard. Once you've opened the terminal, insert and run the following commands.

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

Install the MATRIX init package and tools needed to build MATRIX HAL.

```language-bash
sudo apt-get install cmake g++ git libfftw3-dev wiringpi libgflags-dev matrixio-creator-init
```

Clone, build, and install MATRIX HAL.

```language-bash
cd ~/
git clone https://github.com/matrix-io/matrix-creator-hal.git
cd matrix-creator-hal
mkdir build
cd build
cmake ..
make -j4 && sudo make install
```

Reboot your device.

```language-bash
sudo reboot
```

## Helpful Information

MATRIX HAL header files are installed in `/usr/local/include/matrix_hal`. 

The compiled MATRIX HAL library file is installed in `/usr/local/lib/libmatrix_creator_hal.so`.

## Next Steps

Now that MATRIX HAL is properly installed, learn how to create and compile your own MATRIX programs [here](programs).
