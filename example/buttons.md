# Adding buttons
Use [.buttonBehavior( )](https://github.com/d3plus/d3plus-timeline#Timeline.buttonBehavior) to modify style of the timeline. Accepted values are "buttons" and "ticks". 

```js
new d3plus.Timeline()
  .domain([2001, 2010])
  .buttonBehavior("buttons")
  .render();
```