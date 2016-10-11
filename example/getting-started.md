[width]: 400
[height]: 100

# Getting Started

A d3plus timeline extends the functionality of a [d3plus-axis](https://github.com/d3plus/d3plus-axis) by also allowing user to select a given time period using a one-dimensional [d3-brush](https://github.com/d3/d3-brush). Here is all you need to do in order to create a d3plus timeline:

```js
new d3plus.Timeline()
  .domain([2001, 2010])
  .render();
```
