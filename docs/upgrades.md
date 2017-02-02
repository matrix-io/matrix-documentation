## Support
* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)
* Submit documentation issues or improvements at [matrix-io/matrix-documentation](https://github.com/matrix-io/matrix-documentation)

## Upgrade

Because we are currently in Alpha stage, we are constantly updating and releasing new versions of our debian packages. To keep up to date, please regularly run:

#### MATRIX Creator Packages
```
sudo apt-get update && sudo apt-get upgrade
sudo shutdown -r now //sudo reboot
```

#### MATRIX OS

###### Bypass Automatic Upgrades
The MATRIX OS upgrades packages, and systems, automagically on initialization. If you would like to bypass this, set the `NO_UPGRADE` environment flag to true.
```
NO_UPGRADE=true node index.js
```

###### Manual Upgrades
On your Raspberry Pi, execute the following commands to make sure your hardware is up to date manually.
```
cd matrix-os
git checkout master
git pull
npm install
npm upgrade matrix-app-config-helper matrix-firebase matrix-node-sdk matrix-eventfilter
git submodule update --init
```

#### MATRIX CLI
On your PC, Linux, or Mac computer, you can update your Command Line Tools by just making sure you have installed the latest.
```
sudo npm install matrix-cli -g
```
