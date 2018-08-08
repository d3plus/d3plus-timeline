[width]: 400
[height]: 100

# Changing Styles

There are a few methods in d3plus-timeline that allow style changes. Use [.handleConfig( )](https://github.com/d3plus/d3plus-timeline#Timeline.handleConfig) to modify attributes of the brush handles and [.shapeConfig( )](https://github.com/d3plus/d3plus-axis#Axis.shapeConfig) to modify the configuration of each tick shape:

```js
new d3plus.Timeline()
  .handleConfig({
    fill: "red",
    stroke: "black"
  })
  .buttonBehavior("ticks")
  .shapeConfig({
    height: 6,
    fill: "red",
    stroke: "blue",
    width: 4
  })
  .render();
```

*If you want to change the style of shapes, you must to set `.buttonBehavior("ticks")` for correct behavior in Timeline. Currently "buttons" method doesn't support with `shapeConfig`.
