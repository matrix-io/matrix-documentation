## Creating a Dashboard

> Before attempting this example, you should have [CLI](../overview/cli.md) installed and are familiar with [application `create` and `deploy`](app-create.md) and [data types](../overview/data.md).

> For more details about what is covered in this example, please read about [widgets](../reference/widgets/) and [sensors](../reference/sensors/)

Dashboards serve two primary purposes:

1. Presenting data patterns over time.
1. Communicating with applications.

### Make application

```bash
$ matrix create ezDash
# enter details
$ cd ezDash
```

### Configure application

#### Send data

Data is sent and sorted via it's structure which is defined in `dataTypes`. In this example `motd` is the `type` of data which is parsed for a given key `msg` in the dashboard.

```yaml
dataTypes:
  motd:
    msg : string
```

#### Widget Definition

Define a widget named `message` that holds options defining which data to display.

```yaml
widgets: 
  message: 
    display: label
    type: motd
    key: msg
```

#### Add to layout

`message` is the widget name to add to the `screens` layout definition.
```yaml
screens:
  - message
```

#### Final Configuration File

```yaml
# config.yaml

dataTypes:
  motd:
    msg : string

widgets: 
  message: 
    type: motd
    key: msg

screens:
  - message
```

### Application to send a Basic Message

Here, we use the dataType `motd`, and send an object with a `msg` key to display in the dashboard.
```js
# app.js
matrix.type('motd').send({msg: 'hello to dashboard'});
```

### Layout 

### Charting Realtime Data

### Controls

### Starting the App
