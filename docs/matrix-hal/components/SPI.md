### SPI

The SPI bus is not enabled by default by Raspbian.

To enable it you can follow the next steps.

First, open raspi-config.

    sudo raspi-config

![open the interface](https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/1-open.png)

Then navigate the interface to activate the SPI bus. Go to advanced options.

![select advanced](https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/2-select-advanced.png)

Select SPI.

![select SPI](https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/3-select-spi.png)

Enable SPI.

![enable SPI](https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/4-enable.jpg)

Verify that SPI has been enabled.

![SPI enabled](https://storage.googleapis.com/packages.matrix.one/wiki-images/enable-spi/5-enabled.jpg)

Now you can exit raspi-config and SPI will be permanently enabled.