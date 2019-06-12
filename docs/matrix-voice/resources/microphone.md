## Microphone Array on MATRIX Voice
![Mic Position](../img/mic_voice_position.png)

## Usage
<h3 style="padding-top:0;">Driver installation</h3>
Follow the instructions below for allowing your MATRIX Voice to register as a microphone for your Raspberry Pi.
```bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
sudo apt-get update
sudo apt-get upgrade
```
A reboot will be required after the MATRIX packages above are installed.
```bash
sudo reboot
```
The next commands will install the MATRIX kernel modules, overriding the stock Raspbian kernel.
```bash
sudo apt install matrixio-kernel-modules
```
A second reboot will be required.
```bash
sudo reboot
```
<h3 style="padding-top:0;">Check If Everything Works</h3>
Your Raspberry Pi should now treat your MATRIX Voice as a regular microphone. You can test this by using the following commands to record and play a 5 second long audio file on your Raspberry Pi.
> Be sure to have something connected to the Raspberry Pi's audio output.
```batch
arecord recording.wav -f S16_LE -r 16000 -d 5
aplay recording.wav
```

<h3 style="padding-top:0;">ALSA Configuration</h3>
The microphones can be grabbed using ALSA. Multiple libraries that support ALSA use these configurations to read microphone data with ALSA.

Device name - `hw:2,0`

Rates(Hz) - `8000` `12000` `16000` `22050` `24000` `32000` `44100` `48000`

Channels for each microphone - `1` `2` `3` `4` `5` `6` `7` `8`

## Audio specs

**Sample Rate:** 8 to 96 kHz

**Bit Depth:** Signed 16 bit

<h3 style="padding-top:0;">Position [x,y] of each mic in the array (mm)</h3>

| Mic  |      X      |      Y      |  
| ---- | ----------- | ----------- |  
|  M1  |    00.00    |     0.00    |
|  M2  |   -38.13    |     3.58    |
|  M3  |   -20.98    |    32.04    |
|  M4  |    11.97    |    36.38    |
|  M5  |    35.91    |    13.32    |
|  M6  |    32.81    |   -19.77    |
|  M7  |     5.00    |   -37.97    |
|  M8  |   -26.57    |   -27.58    |

<h3 style="padding-top:0;">Connection to the FPGA</h3>

| Mic  |   FPGA pin  |   PDM_Data  |  
| ---- | ----------- | ----------- |  
|  M1  |     E6      | pdm_data<0> |
|  M2  |     B8      | pdm_data<1> |
|  M3  |     A8      | pdm_data<2> |
|  M4  |     C7      | pdm_data<3> |
|  M5  |     A7      | pdm_data<4> |
|  M6  |     A6      | pdm_data<5> |
|  M7  |     B6      | pdm_data<6> |
|  M8  |     A5      | pdm_data<7> |
|  CLK |     B5      | pdm_clk     |
