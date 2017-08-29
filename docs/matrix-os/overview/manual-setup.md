## Manual Start
MOS is a managed environment for running IoT applications. If you want more control and information, you can run MOS manually. 

### Headless Access
#### Enable SSH Access
The latest version of Raspbian enables SSH via the presence of a `SSH` file in the `/boot` partition. Add this file, then you can access your Pi via `ssh pi@IP.ADD.RES.S`. 

#### Find your Pi IP
Run to output the IP address for any Pi's on your local network.
```
arp -a | grep b8:27:eb
```


### Device Boot Behavior
MATRIX OS uses `systemd` to automatically start on boot. If you want more control over when MATRIX OS starts or stops, you will need to login to your device, and run MOS directly.

You can disable/enable MOS starting on boot with the following.
```
# don't start on boot
sudo systemctl disable matrix-os
# start on boot
sudo systemctl enable matrix-os
```

### Find & Start MATRIX OS
If you didn't [install](../getting-started/installation), MOS execution is managed by `systemd` and is located at `/usr/share/admobilize/matrix-os`

```
pi@raspberrypi:~ $ cd /usr/share/admobilize/matrix-os
node index.js
```

#### Launch Options
`START_APP` - start this application after launch is finished

`NODE_ENV` - set to `dev` to point at dev environments, default `production`

`DEBUG` - set to `*` to see all messages, be careful when posting these publicly because they contain secrets

`MATRIX_DEVICE_ID` - id from the cli device registration

`MATRIX_DEVICE_SECRET` - secret from the cli device registration

`SUN_MODE` - set to true to enable the white LEDs and luminance calculations. Such brightness.

You can save any of these as environment variables to `~/.bash_profile` and they will be automatically available when you ssh in. To add these to a MOS which is launched on device boot, you will have to add an `Environment=` line to `/lib/systemd/system/matrix-os.service` for each launch option you want to enable.

### Heed warning
Applications need to be registered with the platform before they will run successfully inside MOS. After the initial installation or deployment of an application, you can make changes directly on the device, or work locally and `scp` changes. Of course, it is often much easier to just `matrix deploy`.
