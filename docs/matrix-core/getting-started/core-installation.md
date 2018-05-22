<h1 style="padding-top: 0">Installing MATRIX CORE</h1>

>Make sure you have setup your 
[MATRIX Creator](/matrix-creator/device-setup) or 
[MATRIX Voice](/matrix-voice/device-setup) before continuing.

## Installation
Before being able to program in MATRIX CORE, ensure you have access to the terminal of your Raspberry Pi via an <a href="https://www.raspberrypi.org/documentation/remote-access/ssh/" target="_blank">SSH-session</a> or a connected screen, mouse, and keyboard. Then insert the following commands to be inputted into your Raspberry Pi's terminal. This installs the MATRIX CORE package.

```language-bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install matrixio-malos
sudo reboot
```

MATRIX CORE should now be running each time your Raspberry Pi boots.

<br/>
## Upgrading

If you need to upgrade your MATRIX CORE package at any time, please run the following commands and restart your Raspberry Pi.

```language-bash
sudo apt-get update;
sudo apt-get upgrade;
sudo shutdown -r now;
```
<br/>
## Stopping & Starting
To manually stop MATRIX CORE use:

```language-bash
sudo pkill -9 malos
```

To manually start MATRIX CORE again use:

```language-bash
malos &
```

<br/>
## Next Steps
Learn about what protocols you should expect in MATRIX CORE [here](/matrix-core/getting-started/protocol.md).