<h2 style="padding-top:0">ALSA Microphones</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">
<img class="creator-compatibility-icon" src="../../../img/voice-icon.svg">

## Overview
The following sections will go over how to read microphone data from your MATRIX device. Note the code below isn't actually part of MATRIX Lite, but a downloadable library that allows us to easily access ALSA microphones.

### Dependencies
Install the MATRIX Kernel Modules.<br/>

- Follow **Option1** or **Option2**: <a href="https://github.com/matrix-io/matrixio-kernel-modules/blob/master/README.md#option-1-package-installation" target="_blank">https://github.com/matrix-io/matrixio-kernel-modules</a>.

Install portaudio.
```bash
sudo apt install portaudio19-dev 
```

Install pyaudio.
```bash
sudo python3 -m pip install pyaudio
```

Configure your Pi's asound.conf file.

!!! bug "Due to the linux kernel being recently updated, the playback rate for the Raspberry Pi must be set to `16000`. Add the following **highlighted** line to `/etc/asound.conf`"   
    ```bash hl_lines="5"
    pcm.speaker {
      type plug
      slave {
        pcm "hw:0,0"
        rate 16000
      }
    }
    ```

### Recording Example
Below is a simple example that shows you how to create an audio recording with pyaudio.
Visit the <a href="https://people.csail.mit.edu/hubert/pyaudio/docs/#id1" target="_blank">pyaudio documentation</a> for a complete overview.

!!! example "recordFile.py"
    Be sure to run the example with `python3`

    ```python
    import pyaudio
    import wave

    # recording configs
    CHUNK = 2048
    FORMAT = pyaudio.paInt16
    CHANNELS = 8
    RATE = 96000
    RECORD_SECONDS = 5
    WAVE_OUTPUT_FILENAME = "output.wav"

    # create & configure microphone
    mic = pyaudio.PyAudio()
    stream = mic.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("* recording")

    # read & store microphone data per frame read
    frames = []
    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("* done recording")

    # kill the mic and recording
    stream.stop_stream()
    stream.close()
    mic.terminate()

    # combine & store all microphone data to output.wav file
    outputFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    outputFile.setnchannels(CHANNELS)
    outputFile.setsampwidth(mic.get_sample_size(FORMAT))
    outputFile.setframerate(RATE)
    outputFile.writeframes(b''.join(frames))
    outputFile.close()
    ```

    Once recorded, you can play the audio through the Pi's audio jack with:
    ```bash
    # raise the output volume to max
    amixer set PCM 100%
    
    # play the file
    aplay output.wav
    ```