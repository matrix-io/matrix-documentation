<h2 style="padding-top:0">GPIO</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

The microphone array can be used for audio input.


### Initial Setup

To begin working with the microphone array you need to include these header files.

```language-cpp
#include "matrix_hal/microphone_array.h"
#include "matrix_hal/microphone_core.h"
#include "matrix_hal/matrixio_bus.h"
```

You'll also need to setup the `MatrixIOBus` for hardware communication.

```language-cpp
matrix_hal::MatrixIOBus bus; // Create a bus object for hardware communication
if (!bus.Init()) return false; // Initializes bus
```

Now we will create our `MicrophoneArray` and `MicrophoneCore` object.

```language-cpp
matrix_hal::MicrophoneArray mics; // Create MicrophoneArray object
mics.Setup(&bus); // Specify the MatrixIOBus object that MicrophoneArray will use

hal::MicrophoneCore mic_core(mics); // Create MicrophoneCore object
mic_core.Setup(&bus); // Specify the MatrixIOBus object that MicrophoneCore will use
```

### Microphone Parameters

To set sampling rate:

```language-cpp
mics.SetSamplingRate(sampling_rate); // (uint32_t sampling_frequency)
```

To set gain:

```language-cpp
mics.SetGain(gain); // (uint16_t gain)
```

ShowConfiguration method outputs current configuration to console.

```language-cpp
mics.ShowConfiguration();

// Output:

Audio Configuration:
Sampling Frequency: sampling_freq
Gain : gain
```

To set 128 tap FIR Filter:

```language-cpp
mic_core.SelectFIRCoeff(&FIR_bandpass[0]); // (FIRCoeff *FIR_coeff)

// FIRCoeff struct
struct FIRCoeff {
  uint32_t rate_;
  std::valarray<int16_t> coeff_;
};
```

### Microphone Record

```language-cpp
int16_t buffer[mics.Channels() + 1]
                [mics.SamplingRate() + mics.NumberOfSamples()];

  mics.CalculateDelays(0, 0, 1000, 320 * 1000); //optional for beamforming

  std::ofstream os[mics.Channels() + 1];

  for (uint16_t c = 0; c < mics.Channels() + 1; c++) {
    std::string filename = "mic_" + std::to_string(mics.SamplingRate()) +
                           "_s16le_channel_" + std::to_string(c) + ".raw";
    os[c].open(filename, std::ofstream::binary);
  }

 uint32_t samples = 0;
  for (int s = 0; s < seconds_to_record; s++) {
    while (true) {
      mics.Read(); /* Reading 8-mics buffer from de FPGA */

      /* buffering */
      for (uint32_t s = 0; s < mics.NumberOfSamples(); s++) {
        for (uint16_t c = 0; c < mics.Channels(); c++) { /* mics.Channels()=8 */
          buffer[c][samples] = mics.At(s, c);
        }
        buffer[mics.Channels()][samples] = mics.Beam(s);
        samples++;
      }

      /* write to file */
      if (samples >= mics.SamplingRate()) {
        for (uint16_t c = 0; c < mics.Channels() + 1; c++) {
          os[c].write((const char *)buffer[c], samples * sizeof(int16_t));
        }
        samples = 0;
        break;
      }
    }
  }
```

### Reference
