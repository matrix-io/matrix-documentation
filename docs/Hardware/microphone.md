### Microphone

#### 1. Mic Array on MATRIX Creator
<a href="https://github.com/matrix-io/matrix-documentation/blob/yc/improving_mic_doc/docs/Hardware/mic_position.png?raw=true"><img src="https://github.com/matrix-io/matrix-documentation/blob/yc/improving_mic_doc/docs/Hardware/mic_position.png?raw=true" align="center"  ></a>

##### Position [x,y] of each mic in the array:

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


##### Connection to the FPGA 

from the [creator.ucf](https://github.com/matrix-io/matrix-creator-fpga/blob/master/creator_core/creator.ucf) :


| Mic  |   FPGA pin  |   PDM_Data  |  
| ---- | ----------- | ----------- |  
|  M1  |     P45     | pdm_data<0> |
|  M2  |     P46     | pdm_data<1> |
|  M3  |     P47     | pdm_data<2> |
|  M4  |     P58     | pdm_data<3> |
|  M5  |     P59     | pdm_data<4> |
|  M6  |     P64     | pdm_data<5> |
|  M7  |     P65     | pdm_data<6> |
|  M8  |     P44     | pdm_data<7> |
|  CLK |     P47     | pdm_clk     |

##### Audio specs:

Sample Rate: 16 kHz
Bit Depth: 16 bit

**Note**: An option for setting higher sample rates will be released soon.  Please keep in touch in the community announcements channel http://community.matrix.one/c/announcements.


##### Microphones Datasheet:

[MP34DB02 - MEMS audio sensor omnidirectional digital microphone](http://www.st.com/content/ccc/resource/technical/document/datasheet/57/af/88/31/7b/59/4f/77/DM00111225.pdf/files/DM00111225.pdf/jcr:content/translations/en.DM00111225.pdf) 

#### 2. How to get microphone data from C++

You can use our lower software layer in C++ calle HAL () (Hardware Abstraction Layer) to read data from the microphones.

##### Getting and Compiling HAL
    git clone https://github.com/matrix-io/matrix-creator-hal.git
    cd matrix-creator-hal 
    mkdir build && cd build
    cmake ..
    make

##### Example code

In the following example gets all the samples collected by the fpga in the buffer.  

    ... 
    int main() {
        hal::WishboneBus bus;
        bus.SpiInit();
        hal::MicrophoneArray mics;
        mics.Setup(&bus);
        std::valarray<float> magnitude(mics.Channels());

        mics.SetGain(8);
        std::cout << "M1\t" << "M2\t" << "M3\t" << "M4\t" << "M5\t" << "M6\t" << "M7\t" << "M8\t" << std::endl;

        while (true) {
            mics.Read();
            magnitude = 0.0;
            for (unsigned int s = 0; s < mics.NumberOfSamples(); s++) {
                for (unsigned int c = 0; c < mics.Channels(); c++) {
                  magnitude[c] += mics.At(s, c);
                }
                for (auto& m : magnitude) {
                  m = m / (float)mics.NumberOfSamples();
                  std::cout <<  abs(m) << "\t";
                }
              std::cout << std::endl;
            }
        }
        return 0;
    }

#### 3. Example demo apps for mics

The demo apps are in the folder `matrix-creator-hal/demos/` . They are built with HAL. To run them go to the demo folder :

    cd build/demos
    ./mic_demo

note: You can play with the demos to learn how to use HAL, and them use them as starting points for your own apps.

##### mic_demo
This demo maps each mic audio input to one specific led on the Everloop. You can make sounds close to the MATRIX Creator and see how the LEDs turn green when a sound is detected. Also the demo prints in the terminal the audio as numbers, e.g.:

    cd build/demos
    ./mic_demo
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

##### mic_energy
This demo is similar but instead of mapping the mic's audio individually takes all channels and maps the average of all mics. It maps at the same time in all LEDs and creates a very voice responsive red light. This demos does not print anything on the terminal.

    cd build/demos
    ./mic_energy

##### micarray_recorder
This demo records audio from all 8 channels (0-7) and the beamforming channel (channel 8) to raw files located in the same folder. After you launching the demo you will have these files:
    
    cd build/demos
    ./micarray_recorder

The default example records audio to raw files for 10 seconds and then stops. After recording the files are on the same folder `/demos` :

    cd build/demos
    ls | grep raw
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

##### direction_of_arrival_demo

This demo shows a first implementation of direction of arrival detection. It shows the direction of arrival using the LEDs and also prints the result angle in the terminal. To test it run the demo and make sounds from different directions to the MATRIX Creator board to see how. 

    ./direction_of_arrival_demo
    azimutal angle = 0, polar angle = 0, mic = 0
    azimutal angle = 0, polar angle = 0, mic = 0
    azimutal angle = -157.5, polar angle = 18, mic = 2
    azimutal angle = -157.5, polar angle = 18, mic = 2
    azimutal angle = -157.5, polar angle = 18, mic = 2
    azimutal angle = 22.5, polar angle = 36, mic = 6
    azimutal angle = -157.5, polar angle = 54, mic = 2
    azimutal angle = -157.5, polar angle = 72, mic = 2
    azimutal angle = -157.5, polar angle = 72, mic = 2

#### Record, Convert and Play sounds.

##### Update and upgrade Raspbian

    sudo apt-get update
    sudo apt-get upgrade

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