#### Microphone

##### 1. Mic Array Position

<a href="https://github.com/matrix-io/matrix-documentation/blob/yc/improving_mic_doc/docs/Hardware/mic_position.jpg"><img src="https://github.com/matrix-io/matrix-documentation/blob/yc/improving_mic_doc/docs/Hardware/mic_position.jpg" align="right" width="500" ></a>

| Mic  |      X      |      Y      |  
| ---- | ----------- | ----------- |  
|  M1  |  20.0908795 | -48.5036755 |
|  M2  | -20.0908795 | -48.5036755 |
|  M3  | -48.5036755 | -20.0908795 |
|  M4  | -48.5036755 |  20.0908795 |
|  M5  | -20.0908795 |  48.5036755 |
|  M6  |  20.0908795 |  48.5036755 |
|  M7  |  48.5036755 |  20.0908795 |
|  M8  |  48.5036755 | -20.0908795 |


    {20.0908795, -48.5036755},  /* M1 */
    {-20.0908795, -48.5036755}, /* M2 */
    {-48.5036755, -20.0908795}, /* M3 */
    {-48.5036755, 20.0908795},  /* M4 */
    {-20.0908795, 48.5036755},  /* M5 */
    {20.0908795, 48.5036755},   /* M6 */
    {48.5036755, 20.0908795},   /* M7 */
    {48.5036755, -20.0908795}   /* M8 */

##### 2. Using microphones from the Hardware Abstraction Layer (HAL) 

##### Update and upgrade Raspbian
    sudo apt-get update
    sudo apt-get upgrade

##### Compiling and installing HAL
    git clone https://github.com/matrix-io/matrix-creator-hal.git
    cd matrix-creator-hal 
    mkdir build && cd build
    cmake ..
    make
##### Running demos

Go to the demo folder and run one of the mic demos, e.g :

    cd build/demos
    ./mic_demo

##### Available mic demos: 

*__mic_demo__*
This demo maps each mic audio input to one specific led on the Everloop. You can make sounds close to the MATRIX Creator and see how the LEDs turn green when a sound is detected. Also the demo prints in the terminal the audio as numbers, e.g.:

    ...
    0   0   0   0   0   0   0   0   
    0   0   0   0   0   0   0   0   
    6   6   6   6   6   4   5   6   
    3   6   4   4   2   2   2   2   
    0   0   0   0   0   0   0   0   
    0   0   0   0   0   0   0   0   
    0   0   0   0   0   0   0   0   
    3   5   5   4   4   4   5   4   
    5   6   6   6   6   5   6   5   
    1   0   1   2   2   1   1   1   
    0   1   1   1   1   1   1   1   
    0   1   1   0   1   0   0   0   
    ...

__*mic_energy*__
This demo is similar but instead of mapping the mic's audio individually takes all channels and maps the average of all mics. It maps at the same time in all LEDs and creates a very voice responsive red light. This demos does not print anything on the terminal.

__*micarray_recorder*__
This demo records audio from all 8 (0-7) channels and the beamforming channel (channel 8) to raw files located in the same folder. After you launching the demo you will have these files:
    
    mic_16000_s16le_channel_0.raw
    mic_16000_s16le_channel_1.raw
    mic_16000_s16le_channel_2.raw
    mic_16000_s16le_channel_3.raw
    mic_16000_s16le_channel_4.raw
    mic_16000_s16le_channel_5.raw
    mic_16000_s16le_channel_6.raw
    mic_16000_s16le_channel_7.raw
    mic_16000_s16le_channel_8.raw

note: The data in the raw files is written in `int16_t`. 

__*direction_of_arrival_demo*__

This demo shows a first implementation of direction of arrival detection. It shows the direction of arrival using the LEDs and also prints the result angle in the terminal.

#### Convert and play recorded sounds 


##### Install _Alsa tools_ and the _sox_ utility

    sudo apt-get install sox alsa-utils 

##### Run the volume control

    alsamixer

##### Run capture and check the recorded files

    cd demos
    ./micarray_recorder
    ls -1 *raw

##### Convert the audio

    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_0.raw channel_0.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_1.raw channel_1.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_2.raw channel_2.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_3.raw channel_3.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_4.raw channel_4.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_5.raw channel_5.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_6.raw channel_6.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_7.raw channel_7.wav


##### Play the wav file (i.e. audio from channel 0)

    aplay channel_0.wav



