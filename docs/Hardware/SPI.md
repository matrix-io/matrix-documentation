## SPI

The SPI bus is not enabled by default by Raspbian.

To enable it you can follow the next steps.

First, open raspi-config.

    sudo raspi-config

[[https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/1-open.png|alt=open the interface]]

Then navigate the interface to activate the SPI bus. Go to advanced options.

[[https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/2-select-advanced.png|alt=select advanced]]

Select SPI.

[[https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/3-select-spi.png|alt=select SPI]]

Enable SPI.

[[https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/4-enable.jpg|alt=enable SPI]]

Verify that SPI has been enabled.

[[https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/5-enabled.jpg|alt=SPI enabled]]

Now you can exit raspi-config and SPI will be permanently enabled.

This allows you to play with the [Everloop LED Array And IMU](Everloop LED Array And IMU).
