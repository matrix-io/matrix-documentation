## Prerequisites
>Make sure you have setup your 
[MATRIX Creator](/matrix-creator/device-setup) or 
[MATRIX Voice](/matrix-voice/device-setup) before continuing.

<h3 style="padding-top:0;">Software</h3>
* <a href="https://nodejs.org/en/" target="_blank">Node.js</a>
* Command Line Interface:
    * macOS: Terminal
    * Windows: <a href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" target="_blank">Putty</a>
    * Linux: Terminal

## Computer Installation & Account Registration
<!-- <h3 style="padding-top:0;">Setting Up Your Computer</h3> -->
>We recommend running the following commands on your Desktop/Laptop and not on your Raspberry Pi.

MOS contains a CLI (Command Line Interface) tool for controlling and managing your MATRIX devices. To install the tool, execute the following command in your personal computer's terminal.

`npm install -g matrix-cli`

Once installed, the CLI tool needs to be configured by registering and then logging into a MATRIX Labs account.

`matrix register`

`matrix login` 

With an account logged into the CLI tool, you can now register your MATRIX device. This will prompt you to enter a name and description for the device.

`matrix register device`

After the device is created, a set of unique login credentials will be generated for you. Save these credentials because they are necessary to link your MATRIX Labs account to your MATRIX device. Below is an example of the generated credentials.

```bash
export MATRIX_DEVICE_ID=dc7a1a71be2d
export MATRIX_DEVICE_SECRET=08629018e9d77h15i5n0t4r3alz0f06cd4f7e5544272b
```

<!-- <h3 style="padding-top:0;">Set up your Raspberry Pi</h3> -->
## Raspberry Pi Setup
Access the terminal of your Raspberry Pi via an SSH-session or connect a screen, mouse, and keyboard. Then run the following command to install MOS on the Raspberry Pi. Make sure you install MOS in the home directory. A reboot will occur when the installation is finished.

```bash
cd /~
curl https://raw.githubusercontent.com/matrix-io/matrix-creator-quickstart/master/install.sh | sh
```

```bash
    #REMOVE THIS BEFORE PUSHING
    name: appName
    settings:
    apiKey: 'entersomethingokay'
```

<h3 style="padding-top:0;">Linking Device To MATRIX Labs Account</h3>
To properly link your MATRIX device to your MATRIX Labs account, you need to create a file named **.envrc** in the home directory of the Raspberry Pi and then populate it with the device credentials you saved earlier. To create the **.envrc** file and add the device credentials, use the nano command below and paste your device credentials within the terminal editor. When you’re done, press **Ctrl+X**.

`nano ~/.envrc`

With the **.envrc** file created, you need to make the credentials within visible to the shell by running the command below. MOS will then be able to read it and properly register your MATRIX device.

`source ~/.envrc`

 Start MOS with the following command!

`node ~/matrix-os/index.js`

>Use these commands each time you want to run MOS<br/>**Starting MOS on boot is coming soon**

>`source ~/.envrc`

>`node ~/matrix-os/index.js`

##Check if everything works
Open the terminal on your Desktop/Laptop's Command Line Tool and type the following command with the device name you set. This selects the Matrix device you want to interact with.

`matrix use {deviceName}`

Once your device is selected, run the following to see if everything so far has installed properly.

`matrix install HelloWorld`

`matrix start HelloWorld`

You should now see a rainbow LED sequence of our everloop on your Matrix Device. Everything is now properly installed on your MATRIX Device! Use the following command to stop the app and learn how to create your own [here](/index).

`matrix stop HelloWorld`

> When an app is stopped, the LEDs will keep the last color they were set to until set to a different color.