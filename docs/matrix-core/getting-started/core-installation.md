<h2 style="padding-top: 0">Installing MATRIX CORE</h2>

>Make sure you have setup your
[MATRIX Creator](/matrix-creator/device-setup) or 
[MATRIX Voice](/matrix-voice/device-setup) before continuing.

## Installation
Before starting, ensure you have access to the terminal of your Raspberry Pi via an <a href="https://www.raspberrypi.org/documentation/remote-access/ssh/" target="_blank">SSH-session</a> or a connected screen, mouse, and keyboard. Then insert and run the following commands into your Raspberry Pi's terminal, one at a time.

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

Install the the MATRIX CORE packages.

```language-bash
sudo apt-get install matrixio-malos
```

Reboot your device.

```language-bash
sudo reboot
```

MATRIX CORE will now be running as a service each time your Raspberry Pi boots up.

These remaining commands will install <a href="http://zeromq.org/" target="_blank">ZeroMQ</a>.

```language-bash
echo "deb http://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/ ./" | sudo tee /etc/apt/sources.list.d/zeromq.list
wget https://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/Release.key -O- | sudo apt-key add
```

<br/>
## Next Steps
Now that you have MATRIX CORE and ZeroMQ installed, please take a look at Understanding CORE [here](understanding-core.md).

If you're already familiar, you can learn how to setup a programming language for communicating with CORE.  We currently have tutorials for the following languages:

* [Javascript](javascript-installation.md)
* [Python](python-installation.md)
* [Golang](golang-installation.md)

<br/>
## Helpful Information
<h3 style="padding-top: 0">Upgrading</h3>

If you need to upgrade your MATRIX CORE package at any time, please run the following commands on your Raspberry Pi.

```language-bash
sudo apt-get update
sudo apt-get upgrade
```
A reboot will be required after upgrading your packages.

```language-bash
sudo reboot
```

<h3 style="padding-top: 0">Stopping & Starting</h3>
If you need to manually stop MATRIX CORE use:

```language-bash
sudo pkill -9 malos
```

If you need to manually start MATRIX CORE again use:

```language-bash
malos &
```