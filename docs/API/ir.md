### Sending IR Commands as a remote control
We will offer a more precise way to send and recieve information over IR. Right now, we have implemented remote emulation.

Find the remote you want to use at the [LIRC Remote Table](http://lirc-remotes.sourceforge.net/remotes-table.html).

Open the `.conf` file and take note of the `codes`. These will replicate a button press and blast a signal out the IR transmitters. 

### Example
```
matrix.ir('SONY', 'RM-833').send('KEY_POWER')
```
