## Getting Started
HAL is the lowest-level abstraction for the MATRIX Creator drivers. You can interface directly with HAL, or use the higher level components like MALOS, and the MATRIX OS itself.

```
# pre-requisites
sudo apt-get install cmake g++ git

# clone examples
git clone https://github.com/matrix-io/matrix-creator-hal
cd matrix-creator-hal
mkdir build
cd build
cmake ..
make && sudo make install
cd demos

# run an example
./everloop_demo

# check out the rest of the examples
ls -l
```
