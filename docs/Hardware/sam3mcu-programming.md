# Sam3 MCU Programmingm

Once you have installed the [required software](matrix-creator-quickstart) you can program the SAM3 MCU. The MCU is used to read the sensors.

This firmware is free software and [you can compile it yourself](compile-sam3-free-firmware). Here we describe the process of compiling the shipped firmware.

First, get the firmware.

    wget http://packages.matrix.one/matrix-creator-firmware/firmware-0.8.tar.gz
    tar xzvf firmware-0.8.tar.gz

Then flash the firmware using the [openocd](https://github.com/matrix-io/matrix-creator-openocd) program that should be installed on the Raspberry (with the package matrix-creator-openocd).

Then execute the following commands as root.

    echo 18 > /sys/class/gpio/export
    echo out > /sys/class/gpio/gpio18/direction
    echo 1 > /sys/class/gpio/gpio18/value
    echo 0 > /sys/class/gpio/gpio18/value
    echo 1 > /sys/class/gpio/gpio18/value

Now you can program the firmware.

    cd firmware-0.8
    sudo openocd -f cfg/sam3s.cfg

Example output:

    $ sudo openocd -f cfg/sam3s.cfg
    Open On-Chip Debugger 0.10.0-dev-00283-g7223cae-dirty (2016-07-15-08:36)
    Licensed under GNU GPL v2
    For bug reports, read
	    http://openocd.org/doc/doxygen/bugs.html
    BCM2835 GPIO config: tck = 17, tms = 4, tdi = 22, tdo = 27
    BCM2835 GPIO config: trst = 18
    trst_only separate trst_push_pull
    adapter speed: 512 kHz
    Warn : em357.bs: nonstandard IR value
    Warn : Specify TAP 'sam3n.cpu.cpu' by name, not number 3
    Info : BCM2835 GPIO JTAG/SWD bitbang driver
    Info : JTAG only mode enabled (specify swclk and swdio gpio to add SWD mode)
    Info : clock speed 512 kHz
    Info : JTAG tap: em357.cpu tap/device found: 0x3ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x3)
    Info : JTAG tap: em357.bs tap/device found: 0x069aa62b (mfg: 0x315 (Ember Corporation), part: 0x69aa, ver: 0x0)
    Info : JTAG tap: xc6sxl4.fpga.fpga tap/device found: 0x24000093 (mfg: 0x049 (Xilinx), part: 0x4000, ver: 0x2)
    Info : JTAG tap: sam3n.cpu.cpu tap/device found: 0x4ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x4)
    Error: xc6sxl4.fpga.fpga: IR capture error; saw 0x35 not 0x11
    Warn : Bypassing JTAG setup events due to errors
    Info : sam3n.cpu: hardware has 6 breakpoints, 4 watchpoints
    sam3n.cpu: target state: halted
    target halted due to debug-request, current mode: Thread
    xPSR: 0x61000000 pc: 0x00402560 psp: 0x20000800
    #0 : at91sam3 at 0x00400000, size 0x00020000, buswidth 0, chipwidth 0
    	#  0: 0x00000000 (0x4000 16kB) not protected
    	#  1: 0x00004000 (0x4000 16kB) not protected
    	#  2: 0x00008000 (0x4000 16kB) not protected
    	#  3: 0x0000c000 (0x4000 16kB) not protected
    	#  4: 0x00010000 (0x4000 16kB) not protected
    	#  5: 0x00014000 (0x4000 16kB) not protected
    	#  6: 0x00018000 (0x4000 16kB) not protected
    	#  7: 0x0001c000 (0x4000 16kB) not protected
    flash 'at91sam3' found at 0x00400000
    Error: Invalid ACK (6) in DAP response
    Error: Failed to read memory at 0x400e0a0c
    Error: SAM3: Error performing Erase & Write page @ phys address 0x00400800
    wrote 38620 bytes from file blob/ch.bin to flash bank 0 at offset 0x00000000 in 1.256279s (30.021 KiB/s)
    Info : JTAG tap: em357.cpu tap/device found: 0x3ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x3)
    Info : JTAG tap: em357.bs tap/device found: 0x069aa62b (mfg: 0x315 (Ember Corporation), part: 0x69aa, ver: 0x0)
    Info : JTAG tap: xc6sxl4.fpga.fpga tap/device found: 0x24000093 (mfg: 0x049 (Xilinx), part: 0x4000, ver: 0x2)
    Info : JTAG tap: sam3n.cpu.cpu tap/device found: 0x4ba00477 (mfg: 0x23b (ARM Ltd.), part: 0xba00, ver: 0x4)
    Error: xc6sxl4.fpga.fpga: IR capture error; saw 0x35 not 0x11
    Warn : Bypassing JTAG setup events due to errors
    Warn : Only resetting the Cortex-M core, use a reset-init event handler to reset any peripherals or configure     hardware srst support.
    shutdown command invoked

Flashing succeeded if you get the line "wrote 38620 bytes from file blob/ch.bin to flash bank 0 at offset 0x00000000 in 1.256279s (30.021 KiB/s)" in the previous output. A small LED next to the SAM3 MCU should start flashing once per second.

If flashing fails, please retry the flashing command.

[Sample video](https://www.youtube.com/watch?v=K4TU3eBAOns)

Questions? Post them on raspberrypi.stackexchange.com! Use the tag #matrix-creator
