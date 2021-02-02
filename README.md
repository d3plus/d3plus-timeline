# d3plus-timeline

[![NPM Release](http://img.shields.io/npm/v/d3plus-timeline.svg?style=flat)](https://www.npmjs.org/package/d3plus-timeline) [![Build Status](https://travis-ci.org/d3plus/d3plus-timeline.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-timeline) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-timeline.svg?style=flat)](https://david-dm.org/d3plus/d3plus-timeline) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/)

An easy-to-use javascript timeline.

## Installing

If you use NPM, `npm install d3plus-timeline`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-timeline/releases/latest). You can also load d3plus-timeline as a standalone library or as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-timeline@1"></script>
<script>
  console.log(d3plus);
</script>
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

##### 
* [Timeline](#Timeline)

---

<a name="Timeline"></a>
#### **Timeline** [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L15)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](https://github.com/d3plus/d3plus-axis#Axis).


* [Timeline](#Timeline) ⇐ [<code>Axis</code>](https://github.com/d3plus/d3plus-axis#Axis)
    * [.render([*callback*])](#Timeline.render) ↩︎
    * [.buttonPadding([*value*])](#Timeline.buttonPadding) ↩︎
    * [.brushing([*value*])](#Timeline.brushing) ↩︎
    * [.brushFilter([*value*])](#Timeline.brushFilter) ↩︎
    * [.buttonAlign([*value*])](#Timeline.buttonAlign) ↩︎
    * [.buttonBehavior([*value*])](#Timeline.buttonBehavior) ↩︎
    * [.buttonHeight([*value*])](#Timeline.buttonHeight) ↩︎
    * [.handleConfig([*value*])](#Timeline.handleConfig) ↩︎
    * [.handleSize([*value*])](#Timeline.handleSize) ↩︎
    * [.on([*typename*], [*listener*])](#Timeline.on) ↩︎
    * [.selectionConfig([*value*])](#Timeline.selectionConfig) ↩︎
    * [.selection([*value*])](#Timeline.selection) ↩︎
    * [.snapping([*value*])](#Timeline.snapping) ↩︎


<a name="Timeline.render" href="#Timeline.render">#</a> Timeline.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L242)

Draws the timeline.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonPadding" href="#Timeline.buttonPadding">#</a> Timeline.**buttonPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L352)

If *value* is specified, sets the button padding and returns the current class instance. If *value* is not specified, returns the current button padding.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.brushing" href="#Timeline.brushing">#</a> Timeline.**brushing**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L362)

If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.brushFilter" href="#Timeline.brushFilter">#</a> Timeline.**brushFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L376)

If *value* is specified, sets the brush event filter and returns the current class instance. If *value* is not specified, returns the current brush event filter.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


```js
function() {
  return !event.button && event.detail < 2;
}
```


<a name="Timeline.buttonAlign" href="#Timeline.buttonAlign">#</a> Timeline.**buttonAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L386)

If *value* is specified, toggles the horizontal alignment of the button timeline. Accepted values are `"start"`, `"middle"` and `"end"`. If *value* is not specified, returns the current button value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonBehavior" href="#Timeline.buttonBehavior">#</a> Timeline.**buttonBehavior**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L396)

If *value* is specified, toggles the style of the timeline. Accepted values are `"auto"`, `"buttons"` and `"ticks"`. If *value* is not specified, returns the current button value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonHeight" href="#Timeline.buttonHeight">#</a> Timeline.**buttonHeight**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L406)

If *value* is specified, sets the button height and returns the current class instance. If *value* is not specified, returns the current button height.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.handleConfig" href="#Timeline.handleConfig">#</a> Timeline.**handleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L416)

If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.handleSize" href="#Timeline.handleSize">#</a> Timeline.**handleSize**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L426)

If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.on" href="#Timeline.on">#</a> Timeline.**on**([*typename*], [*listener*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L437)

Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.

| Param | Type |
| --- | --- |
| [*typename*] | <code>String</code> \| <code>Object</code> | 
| [*listener*] | <code>function</code> | 



<a name="Timeline.selectionConfig" href="#Timeline.selectionConfig">#</a> Timeline.**selectionConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L447)

If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.selection" href="#Timeline.selection">#</a> Timeline.**selection**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L457)

If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.snapping" href="#Timeline.snapping">#</a> Timeline.**snapping**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L467)

If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Tue, 02 Feb 2021 21:39:38 GMT</sub>
