With the following instructions you will be able to run demos for the Everloop LED Array and for the IMU. These demos make use of the [hardware abstraction layer](https://github.com/matrix-io/matrix-creator-hal/tree/master/cpp/driver).

[[http://packages.matrix.one/wiki-images/general-assets/hand-small.png|alt=MATRIX Creator]]

If you followed the [getting started](getting-started) steps the [FPGA](fpga-programming) and the [SAM3 MCU](sam3mcu-programming) should be programmed and ready. Also, [SPI should have been enabled for you](enable-spi).

Thus you can just get the required source code and build it:

    git clone https://github.com/matrix-io/matrix-creator-hal.git
    cd matrix-creator-hal
    mkdir build && cd build
    cmake .. && make

If the project built with no issues you can run the demos. The demos run for ever, you can terminate them with Control+C.

Spinning leds ( [video](https://www.youtube.com/watch?v=0cEtEyCdVI4) ):

    demos/everloop_demo

Arc demo ( [video](https://www.youtube.com/watch?v=1UFFT1JSw4Q) ) :

    demos/arc_demo

Compass demo:

    demos/compass_demo

    yaw = -116.006	roll = 3.19588	pitch = 0.370596
    yaw = -116.577	roll = 3.61794	pitch = 0.210613
    yaw = -115.649	roll = 3.64227	pitch = 0.334733
    yaw = -115.468	roll = 3.34762	pitch = 0.42658
    yaw = -116.423	roll = 3.49536	pitch = 0.566351

Microphones:

    demos/mic_demo

    52	29	54	74	74	49	39	60
    60	31	52	46	41	55	68	70
    60	44	55	43	53	68	62	62
    45	17	69	54	18	38	74	67

    (You get one value for each microphone)

Questions? Post them on [raspberrypi.stackexchange.com](http://raspberrypi.stackexchange.com)! Use the tag #matrix-creator
