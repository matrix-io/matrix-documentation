<h2 style="padding-top:0">Sending Data From MATRIX Devices</h2>
<!-- object, string, float, integer, boolean -->
> You should have familiarity with [Configuration Files](configuration.md) and [Widgets](widgets.md) before exploring further.

The MATRIX Dashboard's **display widgets** all require you to define `dataTypes` in your `config.yaml` file. `widgets` can only ready values from defined `dataTypes`. Your MATRIX app can push to these values with the `matrix.send` method.

## Data Types
`dataTypes` can be thought of as javascript objects. Each data type can contain multiple values known as **keys**. These **keys** can hold the following values.

* `string` - can be defined as: `string` or `str` or `s`
* `integer` - can be defined as: `integer` or `int` or `i`
* `float` - can be defined as: `float` or `fl` or `f`
* `boolean` - can be defined as: `b` or `bool` or `boolean`;

<h3 style="padding-top:0">Creating Datatypes</h3>
In order to create your `dataTypes`, a *type* needs to be specified. Once created, your *type* needs at least one *key* to be able to hold data.
```language-yaml
# How to structure
dataTypes:
  type1:
    key1: string or integer or float or boolean
    key2: string or integer or float or boolean
  type2:
    key1: string or integer or float or boolean
```
```language-yaml
# Example
dataTypes:
  location:
    latitude: float
    longitude: float
  statusAlert:
    currentStatus: string
```
> We do not currently support changing dataTypes for newer versions of an application. If you need to change `dataTypes` after an application is published on the MATRIX App Store, please release a new application until we can address this issue.

<br/>
## Sending Data

Once your `dataTypes` are defined, you can begin to send data to the MATRIX Dashboard in real-time. The code below shows an example of how to have your `app.js` and `config.yaml` configured for updating `dataTypes` by using `matrix.send()`.

```language-yaml
# config.yaml
dataTypes:
  location:
    latitude: float
    longitude: float
```

```language-js
// app.js
matrix.send({
  'latitude': 40.285519,
  'longitude': -76.650589
})
```

<br/>
## Widgets
Learn how to use [widgets](widgets.md) to see how you can use `dataTypes` to display real-time information on your MATRIX Dashboard.