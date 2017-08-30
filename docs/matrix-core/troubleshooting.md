
### Check MATRIX CORE Services are Running

Run the following command on your Raspberry Pi to confirm your MATRIX Services are running.
```
$ ps aux | grep 'malos'
```

This should return something along the lines of:
```
root       445  0.0  0.6 126240  5964 ?        Ssl  16:51   0:00 /usr/bin/malos_eye
root       449  5.3  0.8 853204  8352 ?        Ssl  16:51   4:41 /usr/bin/malos
```

### Running Services Manually

If your services are not listed as shown above, you can run them manually using the following terminal commands:

```
# Running MATRIX CORE Sensors & Comm. Services
$ malos

# Running MATRIX CORE Vision Services
$ malos_eye
```

### Stopping Services

```
# Stopping the services altogether

$ pkill -9 malos
$ pkill -9 malos_eye
```

### Support
* Post questions or comments on [community.matrix.one](http://community.matrix.one/)
* Post package issues on github under [matrix-io](https://github.com/matrix-io)
* Submit documentation issues or improvements at [matrix-io/matrix-documentation](https://github.com/matrix-io/matrix-documentation)