### Installation

MATRIX OS applications are an independent process running on a device. They communicate with the MatrixOS core via IPC which is largely event driven. This makes sense for sensors, because just like a REST call, we are waiting for a data point.

The approach we have chosen for this is to use JavaScript callbacks which look like this.

```
someFunction(function callback(data){})
```
What this means is that we execute `function callback()` at a determined time inside of `someFunction()`.

This permits MatrixOS applications to respond to events, such as sensor information, CV detection, or external events as they happen.

### Thinking in Events
While you can write a `main()` and loop it's execution, most of the power in the MatrixOS is in listening for certain conditions to be met, and then performing an action.

### Heed Warning
Not all of this API is built and functional yet. We have endeavored to supply warning messages where there are implementation gaps. Use `matrix log` for more info about your running apps.
