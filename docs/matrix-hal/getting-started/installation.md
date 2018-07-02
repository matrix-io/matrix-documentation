<h1 style="padding-top: 0">Installing HAL</h1>

## Prerequisites
>Make sure you have setup your 
[MATRIX Creator](/matrix-creator/device-setup) or 
[MATRIX Voice](/matrix-voice/device-setup) before continuing.

Before installing HAL, a few required MATRIX packages must be installed onto your MATRIX device.

Gain access to the terminal of your Raspberry Pi via an <a href="https://www.raspberrypi.org/documentation/remote-access/ssh/" target="_blank">SSH-session</a> or connect a screen, mouse, and keyboard. Once you've opened the terminal, insert and run the following commands one at a time:

```language-bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list

sudo apt-get update
sudo apt-get -y upgrade

sudo apt-get -y install matrixio-creator-init

sudo reboot
```
<br/>
<!-- Installation from package will not include the demos, while installation from source will. You must choose one of these HAL installation methods. -->


## HAL Installation
There are two different installations to choose from when installing HAL:

* `Package` - Installs the prebuilt HAL package.
* `Source` - Downloads and compiles HAL from source code, includes demos.


<details>
<summary style="font-weight:300;font-size:1.75rem;">Install HAL from package</summary>
>Make sure you installed the "matrixio-creator-init" package before continuing.
<br/>


```language-bash
sudo apt-get -y install libmatrixio-creator-hal libmatrixio-creator-hal-dev

sudo reboot
```
>Installing from package will place the header files in /usr/include/matrix_hal and the compiled library file in /usr/lib/libmatrix_creator_hal.so
</details>

<details>
<summary style="font-weight:300;font-size:1.75rem;">Install HAL from source</summary>
>Make sure you installed the "matrixio-creator-init" package before continuing.
<br/>


A few prerequisites are needed before you can build HAL from source.

```language-bash
sudo apt-get -y install cmake g++ git libfftw3-dev wiringpi libgflags-dev
```
<h3 style="padding-top:0">Clone and Build</h3>

To start working with HAL directly, you'll need to clone it and then build it. 

```language-bash
git clone https://github.com/matrix-io/matrix-creator-hal.git
cd matrix-creator-hal
mkdir build
cd build
cmake ..
make && sudo make install
```
>Installing from source will place the header files in /usr/include/matrix_hal/ and the compiled library file in /usr/lib/libmatrix_creator_hal.so
</details>

##Next Steps
Now that HAL is properly installed, learn how to create your own MATRIX programs [here](programs).