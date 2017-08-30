## Download and Prepare
> You need [NodeJS, and the Node Package Manager (npm)](https://nodejs.org/en/download/) installed on the Raspberry Pi.
```
git clone https://github.com/matrix-io/matrix-creator-malos;
cd matrix-creator-malos;
git submodule update --init;
cd src/js_test;
npm install;
```

### Examples
MATRIX CORE is the program that sits between the low level hardware layer and MATRIX OS. This program allows MATRIX OS to access the board hardware via ZeroMQ sockets. You can also use it directly, as it is done with the examples below. The The IPs used in the examples are 127.0.0.1. Remember to edit them if you're accessing the Creator from another host and not from the Raspberry itself.

### Drivers

```
node test_driver_info.js
```

### Continue
1. Try the rest of the [JavaScript](../examples/jstests.md) or [Python](../examples/pytests.md) tests.
1. Write and run your own CORE-enabled software by using our [Reference](../reference/index.md) documentation.