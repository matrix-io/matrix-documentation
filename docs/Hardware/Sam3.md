# SAM3 Firmware Flash

This firmware is used to read the sensors. You can build it in your host machine, and then copy the resulting binary to the Raspberry Pi.

First, you need to compile the firmware. You can do it in the Rasbperry Pi (if you have enough space available) or in your host machine if you want to do it faster.

```
apt-get install gcc-arm-none-eabi
git clone https://github.com/matrix-io/matrix-creator-mcu
cd  matrix-creator-mcu/creator && make
```

Now copy build/ch.bin to the Rasbperry Pi (if you didn't build there) and [flash it](sam3mcu-programming). In order to flash it you need to replace the file blob/ch.bin (or edit the cfg/sam3s.cfg configuration file).

And only then you can flash the SAM3 firmware.

```
sudo openocd -f cfg/sam3s.cfg
```

Questions? Post them on raspberrypi.stackexchange.com! Use the tag #matrix-creator
