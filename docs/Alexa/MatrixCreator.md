## On this page

* [Overview](#overview)
* [Required Hardware](#required-hardware)
* [Step-by-step Guide](#lets-get-started)

---

## Overview

![](assets/matrix-creator-alexa.png)

This guide provides step-by-step instructions for setting up AVS on a **Raspberry Pi** with a [MATRIX Creator](https://creator.matrix.one/) hat. It demonstrates how to access and test AVS using our Java sample app (running on a Raspberry Pi), a Node.js server, and a third-party wake word engine using MATRIX mic array. You will use the Node.js server to obtain a Login with Amazon (LWA) authorization code by visiting a website using your Raspberry Pi's web browser.

For instructions on how to set it up on [Mac](Mac), [Linux](Linux) or [Windows](Windows), please see our [wiki]().

## Required hardware

Before you get started, let's review what you'll need.

1. **Raspberry Pi 3** (Recommended) or **Pi 2 Model B** (Supported)  - Buy at Amazon - [Pi 3](https://amzn.com/B01CD5VC92) or [Pi 2](http://amzn.com/B00T2U7R7I).
2. **MATRIX Creator** - Raspberry Pi does not have a built-in microphone, with MATRIX Creator mic array your obtain 8 mic for Alexa - [Buy MATRIX Creator](https://creator.matrix.one/#!/buy)
3. **Micro-USB power cable** for Raspberry Pi.
4. **Micro SD Card** (Minimum 8 GB) - You need an operating system to get started. NOOBS (New Out of the Box Software) is an easy-to-use operating system install manager for Raspberry Pi. The simplest way to get NOOBS is to buy an SD card with NOOBS pre-installed - [Raspberry Pi 8GB Preloaded (NOOBS) Micro SD Card](https://www.amazon.com/gp/product/B00ENPQ1GK/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1). Alternatively, you can download and install it on your SD card (follow instructions [here](#step-1-setting-up-your-pi)).
5. **External Speaker** with 3.5mm audio cable - [Buy on Amazon](http://amzn.com/B007OYAVLI)
6. A **USB Keyboard & Mouse**, and an external **HDMI Monitor** - we also recommend having a USB keyboard and mouse as well as an HDMI monitor handy if you're unable to [remote(SSH)](Setup-SSH-&-VNC) into your Pi.
7. Internet connection (Ethernet or WiFi)
8. (Optional) WiFi Wireless Adapter for Pi 2 ([Buy on Amazon](http://www.amazon.com/CanaKit-Raspberry-Wireless-Adapter-Dongle/dp/B00GFAN498/)).
   **Note:** Pi 3 has built-in WiFi.

For extra credit, we'll show you how to [remote(SSH)](Setup-SSH-&-VNC) into your device, eliminating the need for a monitor, keyboard and mouse - and how to tail logs for troubleshooting.

---

## Let's get started
The original Alexa on a Pi project required manual download of libraries/dependencies and updating a series of configuration files that were prone to human error. To make the process faster and easier, we’ve included an install script with the project that will take care of all the heavy lifting. Not only does this reduce setup time to less than an hour on a Raspberry Pi 3, it only requires developers to adjust three variables in a single install script -

### Step 1: Setting up your Pi
Configure your RaspberryPi like a original Alexa documentation, for this please completing steps: **1,2,3,4,5 and 6** from original documentation: [Raspberry Pi](Raspberry-Pi)

---

### Step 2: Override ALSA configuration
On your RaspberryPi home: `/home/pi` edit `.asoundrc` file and put this (If your prefer, make a backup):
``` javascript
pcm.!default
{
  type asym
  playback.pcm {
    type hw
    card 0
    device 0
  }
  capture.pcm {
    type file
    file "/tmp/matrix_micarray_channel_0"
    infile "/tmp/matrix_micarray_channel_0"
    format "raw"
    slave {
        pcm sc
    }
  }
}
```

---

### Step 3: Install MATRIX software and reboot
``` bash
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install libzmq3-dev xc3sprog matrix-creator-openocd wiringpi cmake g++ git;
sudo apt-get install matrix-creator-init matrix-creator-malos
sudo reboot
```

---

### Step 4: Run your web service, sample app and wake word engine
Return to [Raspberry Pi](Raspberry-Pi) documentation and execute **Step 7** but in the last terminal only choose `sensory` wake word engine with:
``` bash
cd ~/Desktop/alexa-avs-sample-app/samples
cd wakeWordAgent/src && ./wakeWordAgent -e sensory
``` 

---

### Step 5: Talk to Alexa
You can now talk to Alexa by simply using the wake word "Alexa". Try the following -

Say "Alexa", then wait for the beep. Now say "what's the time?"

Say "Alexa", then wait for the beep. Now say "what's the weather in Seattle?"

If you prefer, you can also click on the "Listen" button, instead of using the wake word. Click the "Listen" button and wait for the audio cue before beginning to speak. It may take a second or two before you hear the audio cue.

---

