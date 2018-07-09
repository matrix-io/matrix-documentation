<h2 style="padding-top:0">Microphone Array</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">
<img class="voice-compatibility-icon" src="../../img/voice-icon.svg">

## Overview

The microphone array interface supports:

* Accepting input from individual microphones
* Accepting input from beamformed microphone

## References

Below is the overview of the microphone array implementation. Code examples can be found [here](/matrix-hal/examples/microphone).

These header files are required to use the microphone array.

```language-cpp
// Interfaces with microphone array
#include "matrix_hal/microphone_array.h"
// Enables using FIR filter with microphone array
#include "matrix_hal/microphone_core.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"
```

<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">MicrophoneArray</summary>
`MicrophoneArray` is a required **object** that contains functions to interface with the microphone array .

```language-cpp
// Create MicrophoneArray object
matrix_hal::MicrophoneArray microphone_array;
```

The functions below are part of `MicrophoneArray`.

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Setup</summary>
`Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device.

```language-cpp
// Function declaration in header file
void Setup(MatrixIOBus *bus);
```

```language-cpp
// Set microphone_array to use MatrixIOBus bus
microphone_array.Setup(&bus);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Read</summary>
`Read` is a **function** that outputs microphone array data to the `delayed_data_` array and the `beamformed_` array in the `MicrophoneArray` object.

```language-cpp
// Function declaration in header file
bool Read();
```

```language-cpp
// Reading 8-mics buffer from the FPGA
microphone_array.Read();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.SamplingRate</summary>
`SamplingRate` is a **function** that returns the `sampling_frequency_` value in the `MicrophoneArray` object.

```language-cpp
// Function declaration in header file
uint32_t SamplingRate() { return sampling_frequency_; }
```

```language-cpp
// Return the stored sampling rate
uint32_t SamplingRate = microphone_array.SamplingRate();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Gain</summary>
`Gain` is a **function** that returns the `gain_` value in the `MicrophoneArray` object.

```language-cpp
// Function declaration in header file
uint16_t Gain() { return gain_; }
```

```language-cpp
// Return the stored gain
uint32_t Gain = microphone_array.Gain();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.SetSamplingRate</summary>
`SetSamplingRate` is a **function** that sets the `sampling_frequency_` value in the `MicrophoneArray` object and sends it to the microphone array.

```language-cpp
// Function declaration in header file
bool SetSamplingRate(uint32_t sampling_frequency);
```

```language-cpp
// Set the sampling rate
microphone_array.SetSamplingRate(sampling_rate);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.SetGain</summary>
`SetGain` is a **function** that sets the `gain_` value in the `MicrophoneArray` object and sends it to the microphone array.

```language-cpp
// Function declaration in header file
bool SetGain(uint16_t gain);
```

```language-cpp
// Set the gain
microphone_array.SetGain(gain);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.GetSamplingRate</summary>
`GetSamplingRate` is a **function** that gets the sampling rate value from the microphone array and saves it in the `MicrophoneArray` object as value `sampling_frequency_`.

```language-cpp
// Function declaration in header file
bool GetSamplingRate();
```

```language-cpp
// Update sampling_frequency_ from microphone array
microphone_array.GetSamplingRate();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.GetGain</summary>
`GetGain` is a **function** that gets the gain value from the microphone array and saves it in the `MicrophoneArray` object as value `gain_`.

```language-cpp
// Function declaration in header file
bool GetGain();
```

```language-cpp
// Update gain_ from microphone array
microphone_array.GetGain();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.ReadConfValues</summary>
`ReadConfValues` is a **function** that runs both the `GetGain` and `GetSamplingRate` functions. 
This updates the `gain_` and the `sampling_frequency_` values in the `MicrophoneArray' object with values from the microphone array.

```language-cpp
// Function declaration in header file
void ReadConfValues();
```

```language-cpp
// Update values from microphone array
microphone_array.ReadConfValues();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.ShowConfiguration</summary>
`ShowConfiguration` is a **function** that outputs the `gain_` and `sampling_frequency_` values in the `MicrophoneArray' object.

```language-cpp
// Function declaration in header file
void ShowConfiguration();
```

```language-cpp
// Output `gain_` and `sampling_frequency_` values
microphone_array.void ShowConfiguration();

```language-cpp
// Style of output
std::cout << "Audio Configuration: " << std::endl;
std::cout << "Sampling Frequency: " << sampling_frequency_ << std::endl;
std::cout << "Gain : " << gain_ << std::endl;
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Channels</summary>
`Channels` is a **function** that returns the number of microphone channels.

```language-cpp
// Function declaration in header file
uint16_t Channels() { return kMicrophoneChannels; }
```

```language-cpp
// Return the number of channels
uint16_t Channels = microphone_array.Channels();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.NumberOfSamples</summary>
`NumberOfSamples` is a **function** that returns the number of samples.

```language-cpp
// Function declaration in header file
uint32_t NumberOfSamples() {
    return kMicarrayBufferSize / kMicrophoneChannels;
  }
```

```language-cpp
// Return the number of samples
uint16_t SampleAmount = microphone_array.NumberOfSamples();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.At</summary>
`At` is a **function** that returns microphone data from the `delayed_data_` array. The `Read` function populates the `delayed_data_` array.

```language-cpp
// Function declaration in header file
int16_t &At(int16_t sample, int16_t channel) {
    return delayed_data_[sample * kMicrophoneChannels + channel];
  }
```

```language-cpp
// Return a single sample
int16_t sample = microphone_array.At(s, c);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Beam</summary>
`Beam` is a **function** that returns beamformed microphone data from the `beamformed_` array. The `Read` function populates the `beamformed_` array.

```language-cpp
// Function declaration in header file
int16_t &Beam(int16_t sample) { return beamformed_[sample]; }
```

```language-cpp
// Return a single sample
int16_t sample = microphone_array.Beam(s);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.CalculateDelays</summary>
`CalculateDelays` is a **function** that calculates and sets up delays for beamforming.

```language-cpp
// Function declaration in header file
void CalculateDelays(float azimutal_angle, float polar_angle,
                       float radial_distance_mm = 100.0,
                       float sound_speed_mmseg = 320 * 1000.0);
```

```language-cpp
// Calculate and set up beamforming delays
microphone_array.CalculateDelays(0, 0, 1000, 320 * 1000);
```
</details>

</details>

<details open>
<summary style="font-size: 1.75rem; font-weight: 300;">MicrophoneCore</summary>
`MicrophoneCore` is an optional **object** that contains functions to enable using a <a href="https://en.wikipedia.org/wiki/Finite_impulse_response" target="_blank">FIR</a> filter with microphone array. It accepts a `MicrophoneArray` object in it's constructor.

```language-cpp
// Constructor declaration in header file
MicrophoneCore(MicrophoneArray &microphone_array);
```

```language-cpp
// Create MicrophoneCore object
matrix_hal::MicrophoneCore microphone_core(microphone_array);
```

The functions below are part of `MicrophoneCore`.

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.Setup</summary>
`Setup` is a **function** that takes a `MatrixIOBus` object as a parameter and sets that object as the bus to use for communicating with MATRIX device. It also sets up the FIR filter by calling `SelectFIRCoeff(&FIR_default[0])`.

```language-cpp
// Function declaration in header file
void Setup(MatrixIOBus *bus);
```

```language-cpp
// Set microphone_core to use MatrixIOBus bus
microphone_core.Setup(&bus);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.SetFIRCoeff</summary>
`SetFIRCoeff` is a **function** that sends the `fir_coeff_` array in the `MicrophoneCore` object to the FPGA.

```language-cpp
// Function declaration in header file
bool SetFIRCoeff();
```

```language-cpp
// Sends fir_coeff_ to FPGA
microphone_core.SetFIRCoeff();
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.SetCustomFIRCoeff</summary>
`SetCustomFIRCoeff` is a **function** that sets the `fir_coeff_` array in the `MicrophoneCore` object.

If input is valid then the function also calls `SetFIRCoeff` to send the `fir_coeff_` array in the `MicrophoneCore` object to the FPGA.

```language-cpp
bool SetCustomFIRCoeff(const std::valarray<int16_t> custom_fir);
```

```language-cpp
// Sets fir_coeff_ to custom_fir
microphone_core.SetCustomFIRCoeff(custom_fir);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">.SelectFIRCoeff</summary>
`SelectFIRCoeff` is a **function** that sets the `fir_coeff_` array in the `MicrophoneCore` object. 

If input is valid then the function also calls `SetFIRCoeff` to send the `fir_coeff_` array in the `MicrophoneCore` object to the FPGA.

This function accepts a FIRCoeff struct, which is defined below.

```language-cpp
// FIRCoeff definition in header file
struct FIRCoeff {
  uint32_t rate_;
  std::valarray<int16_t> coeff_;
};
```

```language-cpp
bool SelectFIRCoeff(FIRCoeff *FIR_coeff);
```

```language-cpp
// Sets fir_coeff_ from FIR_default[0]
microphone_core.SelectFIRCoeff(&FIR_default[0]);
```
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 300;">Provided FIR Filters</summary>
A FIR filter is provided in `matrix_hal/microphone_core_fir.h`.

This filter provided is in the form of a FIRCoeff struct, which is defined below.

```language-cpp
// FIRCoeff definition in header file
struct FIRCoeff {
  uint32_t rate_;
  std::valarray<int16_t> coeff_;
};
```

To use the provided FIR filter the `SelectFIRCoeff` function is used to set it, then the `SetFIRCoeff` function is used to send it to the FPGA.

```language-cpp
// Sets fir_coeff_ from FIR_default[0]
microphone_core.SelectFIRCoeff(&FIR_default[0]);
// Sends FIR filter in fir_coeff_ to FPGA
microphone_core.SetFIRCoeff();
```
</details>

</details>