# d3plus-timeline

[![NPM Release](http://img.shields.io/npm/v/d3plus-timeline.svg?style=flat)](https://www.npmjs.org/package/d3plus-timeline)
[![Build Status](https://travis-ci.org/d3plus/d3plus-timeline.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-timeline)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-timeline.svg?style=flat)](https://david-dm.org/d3plus/d3plus-timeline)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

An easy-to-use javascript timeline.

## Installing

If you use NPM, `npm install d3plus-timeline`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-timeline/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-timeline.v0.2.full.min.js"></script>
```

[width]: 400
[height]: 100

## Getting Started

A d3plus timeline extends the functionality of a [d3plus-axis](https://github.com/d3plus/d3plus-axis) by also allowing user to select a given time period using a one-dimensional [d3-brush](https://github.com/d3/d3-brush). Here is all you need to do in order to create a d3plus timeline:

```js
new d3plus.Timeline()
  .domain([2001, 2010])
  .render();
```


[<kbd><img src="/example/getting-started.png" width="400px" /></kbd>](https://d3plus.org/examples/d3plus-timeline/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-timeline/getting-started/) to view this example live on the web.


### More Examples

 * [Changing Styles](http://d3plus.org/examples/d3plus-timeline/change-style/)

## API Reference
<a name="Timeline"></a>

### Timeline ⇐ <code>Axis</code>
**Kind**: global class  
**Extends:** <code>Axis</code>  

* [Timeline](#Timeline) ⇐ <code>Axis</code>
    * [.handleConfig([*value*])](#Timeline.handleConfig)
    * [.handleSize([*value*])](#Timeline.handleSize)
    * [.on([*typename*], [*listener*])](#Timeline.on)
    * [.selectionConfig([*value*])](#Timeline.selectionConfig)
    * [.selection([*value*])](#Timeline.selection)

<a name="Timeline.handleConfig"></a>

#### Timeline.handleConfig([*value*])
If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.

**Kind**: static method of <code>[Timeline](#Timeline)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Timeline.handleSize"></a>

#### Timeline.handleSize([*value*])
If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.

**Kind**: static method of <code>[Timeline](#Timeline)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>6</code> | 

<a name="Timeline.on"></a>

#### Timeline.on([*typename*], [*listener*])
Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.

**Kind**: static method of <code>[Timeline](#Timeline)</code>  

| Param | Type |
| --- | --- |
| [*typename*] | <code>String</code> &#124; <code>Object</code> | 
| [*listener*] | <code>function</code> | 

<a name="Timeline.selectionConfig"></a>

#### Timeline.selectionConfig([*value*])
If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.

**Kind**: static method of <code>[Timeline](#Timeline)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Timeline.selection"></a>

#### Timeline.selection([*value*])
If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.

**Kind**: static method of <code>[Timeline](#Timeline)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> &#124; <code>Date</code> &#124; <code>Number</code> &#124; <code>String</code> | 



###### <sub>Documentation generated on Mon, 31 Oct 2016 20:50:44 GMT</sub>
