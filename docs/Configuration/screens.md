# Screens

Screens are used to represent the location of the widgets on the dashboard. 

The widgets will be layout on the web Dashboard throughtout the row from left to right, according to the list. `- -` represent the first widget of the row and `-` represent each of the following widgets on the same row. On the mobile apps, it will show one widget under the other.


```
screens:
  # Row 1
  - - oneWidget
  # Row 2 
  - - firstWidget
    - secondWidget
  # Row 3
  - - leftWidget
    - middleWidget
    - otherWidget
    - rightWidget
  
```

For widgets definition and sizing refer to [Widgets](widgets.md).