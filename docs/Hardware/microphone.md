First check the [Getting started](Getting-Started)

Update and upgrade the raspbian

    sudo apt-get update
    sudo apt-get upgrade


Install _Alsa tools_ and the _sox_ utility

    sudo apt-get install sox alsa-utils 

Run the volumen control

    alsamixer

Install and compile the MATRIX Creator's hardware abstraction layer

    git clone https://github.com/matrix-io/matrix-creator-hal.git
    cd matrix-creator-hal 
    mkdir build && cd build
    cmake ..
    make

Run capture and check the recorded files
    cd demos
    ./micarray_recorder
    ls -1 *raw

Convert the audio

    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_0.raw channel_0.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_1.raw channel_1.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_2.raw channel_2.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_3.raw channel_3.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_4.raw channel_4.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_5.raw channel_5.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_6.raw channel_6.wav
    sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_7.raw channel_7.wav


Play the wave file (i.e. audio from channel 0)

    aplay channel_0.wav

