Still working out the precise API for this. Stay tuned.


`matrix.zigbee.light(1).color(hue, time)`
`matrix.zigbee.light(1).colorSpin(hue, time, direction)`
`matrix.zigbee.light(1).colorMove(hueDelta, time, direction)`
`matrix.zigbee.light(1).off()`
`matrix.zigbee.light(1).on()`
`matrix.zigbee.light(1).saturation()`
`matrix.zigbee.light(1).level()`

compose your objects
```
var frontDoor = matrix.zigbee.light( lights[1].id );
frontDoor.color('blue', 100);
```



### List Networks
List the networks available to connect to.
### List Appliances
List the appliances available on the network.
### List Objects
List the available objects within the appliance.
### Object Status
List the current status of an object.
### Object Properties
#### Update
Update an object property.
#### Retrieve
Retrieve an object property.
### Inject
