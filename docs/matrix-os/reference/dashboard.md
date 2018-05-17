<h2 style="padding-top:0">Dashboard</h2>
> You should have familiarity with [Configuration Files](configuration.md) before exploring further. 

The MATRIX Dashboard is an online interface that can manage each of your MATRIX devices and applications. The dashboard itself consists of `widgets` which are defined in the [configuration file](configuration.md), `config.yaml`. Widgets provide representation for data coming from a MATRIX application and they can provide controls for users to modify how a MATRIX application operates. Each application can have its own dashboard view.

View your Dashboard <a href="https://dash.matrix.one/" target="_blank">here</a>.

## Screens
Screens are where we define the placement of `widgets` on the dashboard (consists of rows and columns). Adding `screens` to your `config.yaml` file will require you to specify your widget names and dashboard placements. Below are some examples of how to defines your screens.

* `--` New row.
* `-` New column.

```language-yaml
screens:
  #Row 1 has 2 Columns
  - - myTopLeftWidget
    - myTopRightWidget
```
```language-yaml
screens:
  #Row 1 has 2 Columns
  - - myTopLeftWidget
    - myTopRightWidget
  #Row 2 has 3 Columns
  - - myBottomLeftWidget
    - myBottomMiddleWidget
    - myBottomRightWidget
```
Each `screens` item looks for a `widgets` item with the same name to show on the dashboard. The following example shows how to properly define these.

![](img/dashboard-example.png)

```language-yaml
screens:
  - - startButton
    - readDeviceSensors

widgets:
  startButton:
    control: button
    event: buttonInfo
    value: START
    label: Turn LEDs On
  readDeviceSensors:
    control: switch
    event: sensorsEnabled
    value: Sensors Enabled
    label: Send Sensor Data
```

<br/>
## Widgets
Now that you know how to display widgets, learn which `widgets` are available in the dashboard and how to configure them [here](../reference/widgets.md).