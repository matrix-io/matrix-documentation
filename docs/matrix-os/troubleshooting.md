## Community
Please visit our community support forums at
<a href="http://community.matrix.one/" target="_blank">community.matrix.one</a>

<br/>
## MOS DEBUG Mode
Run MOS, with the following command, in order to enable debug mode.
```language-bash
DEBUG=*,-engine*,-Component* node index
```

<!-- ### Lights are spinning, but don't stop

Exits with message
```
Device Error undefined
```
Solution. Run again with correct environment set. Users and made in `dev` environment do not cross over to `production`.
```
NODE_ENV =dev node index.js
``` -->

<!-- ### MATRIX Vision Services not working
Messages appear when `malos_eye` is running, and hardware is not properly installed. Please shut off device, firmly reconnect the camera connection, and restart.
```
VIDIOC_STREAMON: Invalid argument
VIDIOC_STREAMON: Invalid argument

Message received: gesture error: Could not read frame
Message received: gesture error: 1, Could not send update for GESTURE driver.

select timeout
select timeout
select timeout
select timeout
``` -->