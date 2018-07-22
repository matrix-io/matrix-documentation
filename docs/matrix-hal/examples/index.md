## MATRIX HAL Examples

### Download Examples

The following commands download and compile all the examples.

```language-bash
sudo apt-get install cmake g++ git
```

```language-bash
cd ~/
git clone https://github.com/matrix-io/matrix-hal-examples.git
cd matrix-hal-examples
mkdir build
cd build
cmake ..
make -j4
```

<h3 style="padding-top:0.6em;"><a href="everloop">Everloop</a></h3>
LED interface.

<h3 style="padding-top:0.6em;"><a href="humidity">Humidity</a></h3>
Humidity and temperature measurement.

<h3 style="padding-top:0.6em;"><a href="imu">IMU</a></h3>
Inertial Measurement Unit.

<h3 style="padding-top:0.6em;"><a href="pressure">Pressure</a></h3>
Pressure, altitude and temperature measurement.

<h3 style="padding-top:0.6em;"><a href="uv">UV</a></h3>
Ultraviolet light sensor.

<h3 style="padding-top:0.6em;"><a href="gpio">GPIO</a></h3>
General Purpose Input/Output.

<h3 style="padding-top:0.6em;"><a href="microphone">Microphone</a></h3>
Microphone Array.
