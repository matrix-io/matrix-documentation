## Dependencies

```
sudo apt-get install cmake g++ git
git clone https://github.com/matrix-io/matrix-creator-hal.git
```

## Build
To start working with HAL directly, you'll need to run `sudo make install` to get the build running. 

```
$ mkdir build
$ cd build
$ cmake ..
$ make && sudo make install
[100%] Built target matrix_creator_hal
Install the project...
-- Install configuration: ""
-- Up-to-date: /usr/local/lib/libmatrix_creator_hal.a
-- Installing: /usr/local/include/matrix_hal/creator_memory_map.h
-- Installing: /usr/local/include/matrix_hal/everloop.h
-- Installing: /usr/local/include/matrix_hal/humidity_data.h
-- Installing: /usr/local/include/matrix_hal/imu_sensor.h
-- Installing: /usr/local/include/matrix_hal/pressure_data.h
-- Installing: /usr/local/include/matrix_hal/dummy_data.h
-- Installing: /usr/local/include/matrix_hal/everloop_image.h
-- Installing: /usr/local/include/matrix_hal/humidity_sensor.h
-- Installing: /usr/local/include/matrix_hal/matrix_driver.h
-- Installing: /usr/local/include/matrix_hal/pressure_sensor.h
-- Installing: /usr/local/include/matrix_hal/dummy_sensor.h
-- Installing: /usr/local/include/matrix_hal/gpio_control.h
-- Installing: /usr/local/include/matrix_hal/imu_data.h
-- Installing: /usr/local/include/matrix_hal/microphone_array.h
-- Installing: /usr/local/include/matrix_hal/wishbone_bus.h
```

### Continue
1. Do [Hello World](./hello-world.md)
1. Try out the [hardware demos](../examples/hardware-demos.md) available inside the `demos` directory.
1. Write and run your own HAL abstraction layer by using our [Reference](../reference.md) documentation.
