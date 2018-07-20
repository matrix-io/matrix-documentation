## Community

Please visit our community support forums at
<a href="http://community.matrix.one/" target="_blank">community.matrix.one</a>

## Check Installed MATRIX Packages

Run the following command on your Raspberry Pi's terminal to see the currently installed MATRIX packages. 
```language-bash
dpkg -l | grep matrix
```

## Reinstall MATRIX HAL

If you experience strange behavior, reinstall MATRIX HAL.

Uninstall the `libmatrixio-creator-hal` and `libmatrixio-creator-hal-dev` package.

```language-bash
sudo apt-get --purge remove libmatrixio-creator-hal libmatrixio-creator-hal-dev
```

Uninstall HAL built from source.

```language-bash
sudo rm -rf /usr/local/include/matrix_hal
sudo rm -rf /usr/local/lib/libmatrix_creator_hal.so
```

Reboot your device.

```language-bash
sudo reboot
```

Install MATRIX HAL from [package](/matrix-hal/getting-started/installation-package) or from [source](/matrix-hal/getting-started/installation-source).