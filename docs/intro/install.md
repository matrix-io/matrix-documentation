### Creator Software Installation

Welcome to the MATRIX Creator! To enjoy your new board you’ll need to set it up. First, you need to have Raspbian installed on your Raspberry Pi. If you don’t have it, you can [download](https://www.raspberrypi.org/downloads/raspbian/) it and [follow the instructions](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

Then you need to install the software that will allow you to program the MATRIX Creator. To do it, you need to configure APT in the **MATRIX Creator**. The following steps should do it:

    echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list

Now update the package list.

    sudo apt-get update

Then you can install the required packages.

    sudo apt-get install matrix-creator-init matrix-creator-malos cmake g++ git

**Now reboot the Raspberry Pi**. After rebooting the FPGA and the SAM3 MCU will be programmed for you automatically.
That is, after *every* reboot the FPGA will be programmed for you with the default firmware and you will be able to [play with the EverLoop LEDs](3.-HAL---Everloop-LED-Array-And-IMU).

If you wish, you can also learn more about [how to program the FPGA](fpga-programming).

Questions? Post them on [raspberrypi.stackexchange.com](http://raspberrypi.stackexchange.com)! Use the tag #matrix-creator
