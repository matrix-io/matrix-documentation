## Matrix OS Troubleshooting

If you are running Matrix OS from your device, you will have access to more error messages.

### Lights are spinning, but don't stop

Exits with message
```
Device Error undefined
```
Solution. Run again with environment set.
```
NODE_ENV=rc node index.js
```
