### Sending IR Commands as a remote control
Currently,  we have implemented remote emulation. We will offer a more precise way to send and recieve information over IR.

Find the remote you want to emulate at the [LIRC Remote Table](http://lirc-remotes.sourceforge.net/remotes-table.html).

Open the `.conf` file and take note of the `codes`. Sending these through MATRIX OS via `matrix.ir().send()` will replicate a button press and blast a signal out the IR transmitters. 

### matrix.ir( brand, model )

This tells your device to lookup a definition for the remote and use those values for the IR transmission.


### Example
```
matrix.ir('SONY', 'RM-833').send('KEY_POWER')
```
