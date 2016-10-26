## Troubleshooting

Starting MOS from your device, you will have access to more error messages with `DEBUG=*,-engine*,-Component*` prepended to the commands presented below. `engine`, refers to `engine.io`, sockets, and `Component`, is very verbose hardware communications, disable these filters as necessary.

### Test apps

`sensorTest` - tests all sensors
`ledTest` - tests the led

### Lights are spinning, but don't stop

Exits with message
```
Device Error undefined
```
Solution. Run again with environment set.
```
NODE_ENV=rc node index.js
```
