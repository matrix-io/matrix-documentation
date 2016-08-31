Once you have installed the [required software](getting-started) you can program the FPGA. This will allow you to play with the everloop LED array.

First, get the firmware.

    wget http://packages.matrix.one/matrix-creator-firmware/firmware-0.8.tar.gz
    tar xzvf firmware-0.8.tar.gz

Then flash the firmware using the [xc3sprog](https://github.com/matrix-io/xc3sprog/) program that should be installed on the Raspberry.

    sudo xc3sprog -c matrix_pi firmware-0.8/blob/system.bit -p 1

Sample result:

    $ sudo xc3sprog -c matrix_pi firmware-0.8/blob/system.bit -p 1
    XC3SPROG (c) 2004-2011 xc3sprog project $Rev: 774 $ OS: Linux
    Free software: If you contribute nothing, expect nothing!
    Feedback on success/failure/enhancement requests:
    	http://sourceforge.net/mail/?group_id=170565 
    Check Sourceforge for updates:
    	http://sourceforge.net/projects/xc3sprog/develop
    
    DNA is 0x39c620e4bfe15bfd

Questions? Post them on [raspberrypi.stackexchange.com](http://raspberrypi.stackexchange.com)! Use the tag #matrix-creator