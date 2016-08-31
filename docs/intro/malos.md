# Matrix Abstraction Layer for OS

MALOS provides a [ZeroMQ](http://zeromq.org/) messaging layer. The intended target for this layer is [MatrixOS](http://github.com/matrix-io/matrix-os).

## Install the most recent version

To use it make sure that you have the most recent version installed:

    apt-get update
    apt-get install matrix-creator-malos

## Running malos

And then run it. You should see an output like the following one:

    $ malos
    **************
    MALOS starting
    **************

    You can query specific driver info using port 20012.
    Registered driver IMU with port 20013.
    Registered driver Humidity with port 20017.
    Registered driver Everloop with port 20021.

## Details

MALOS gives you direct access to the hardware devices, and each device has four ZeroMQ (ZMQ) sockets:

1. Base port (for instance 20013). ZMQ PULL channel used for device configuration (if configuration is required, most devices have a default configuration).
2. (base_port + 1) is used as a keep-alive channel. This channel is used to tell the driver that it should keep sending updates to MATRIX OS. Each driver has a configurable time interval that tells it how often it should expect keep-alive messages. If an amount of time bigger than the interval elapses without keepalives, the driver will stop sending updates.
3. (base_port + 2) is used as error channel. ZMQ PUSH. If an error occurs, it will be sent in this channel.
4. (base_port + 3) is used to send device updates. ZMQ PUSH. Clients will normally listen on this port for updates.

It's important to note that **more than one program** can subscribe to the **error channel** and the **device updates channel**. This is achieved thanks to the PUB/SUB model of ZMQ.

In this [Node.js example](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_imu.js) you can see all the channels used. If you want to run it you need to edit the IP address (and maybe the port depending on the device base-port mapping.

## Example - Query device list

This [Node.js example](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_driver_info.js) shows how you can query the device list and some capabilities. This program uses a ZMQ RPC call.

To run the file, you need to edit the `creator_ip` to match the IP of the Raspberry PI and the first port printed when the command malos is started (20012 in the sample session shown above).

This is what the output looks like:

    $ nodejs test_driver_info.js
    { info:
       [ { driver_name: 'IMU',
           base_port: 20013,
           provides_updates: true,
           delay_between_updates: 1000,
           needs_pings: true,
           timeout_after_last_ping: 5000,
           notes_for_human: 'Provides yaw/pitch/roll. Check Imu message (protocol buffer)' },
         { driver_name: 'Humidity',
           base_port: 20017,
           provides_updates: true,
           delay_between_updates: 1000,
           needs_pings: true,
           timeout_after_last_ping: 5000,
           notes_for_human: 'Provides humidity and temperature. Check Humidity message (protocol buffer)' },
         { driver_name: 'Everloop',
           base_port: 20021,
           provides_updates: false,
           delay_between_updates: 1000,
           needs_pings: false,
           timeout_after_last_ping: 5000,
           notes_for_human: 'Write-only. There are 35 leds. Values range from 0 to 255. Check message EverloopImage (protocol buffer)' } ] }

## Everloop demo

Once MALOS is operational, you can run the [Everloop LED array demo](https://github.com/matrix-io/matrix-creator-malos/blob/master/src/js_test/test_everloop.js). Remember to edit the IP address of your Raspberry PI.

For the impatient, here is a video of what this demo does: [https://youtu.be/b0n2-hzFgcY](https://youtu.be/b0n2-hzFgcY).
