# Widgets

A comprehensive overview coming soon. See [examples](examples.md) for now.

## Data Handling
The dashboard holds a central data store which the widgets receive data from.

Default operation is for a widget to be updated with data in real time.

This is represented with an option, `push`.

```
//to disable realtime updates
widgets:
  testWidget:
     push: false
```

The alternative is to refresh the widget against the data, say if you wanted to refresh a graph every minute

```
//to disable realtime updates
widgets:
  testWidget:
     push: false
     pull: true
     refresh: 60
```
