# d3plus-timeline

An easy-to-use javascript timeline.

## Installing

If using npm, `npm install d3plus-timeline`. Otherwise, you can download the [latest release from GitHub](https://github.com/d3plus/d3plus-timeline/releases/latest) or load from a [CDN](https://cdn.jsdelivr.net/npm/d3plus-timeline@1).

```js
import modules from "d3plus-timeline";
```

d3plus-timeline can be loaded as a standalone library or bundled as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-timeline@1"></script>
<script>
  console.log(d3plus);
</script>
```

## Examples

Live examples can be found on [d3plus.org](https://d3plus.org/), which includes a collection of example visualizations using [d3plus-react](https://github.com/d3plus/d3plus-react/). These examples are powered by the [d3plus-storybook](https://github.com/d3plus/d3plus-storybook/) repo, and PRs are always welcome. :beers:

## API Reference

##### 
* [Timeline](#Timeline)

---

<a name="Timeline"></a>
#### **Timeline** [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L16)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](https://github.com/d3plus/d3plus-axis#Axis).


* [Timeline](#Timeline) ⇐ [<code>Axis</code>](https://github.com/d3plus/d3plus-axis#Axis)
    * [.render([*callback*])](#Timeline.render) ↩︎
    * [.buttonPadding([*value*])](#Timeline.buttonPadding) ↩︎
    * [.brushing([*value*])](#Timeline.brushing) ↩︎
    * [.brushFilter([*value*])](#Timeline.brushFilter) ↩︎
    * [.brushMin([*value*])](#Timeline.brushMin) ↩︎
    * [.buttonAlign([*value*])](#Timeline.buttonAlign) ↩︎
    * [.buttonBehavior([*value*])](#Timeline.buttonBehavior) ↩︎
    * [.buttonHeight([*value*])](#Timeline.buttonHeight) ↩︎
    * [.handleConfig([*value*])](#Timeline.handleConfig) ↩︎
    * [.handleSize([*value*])](#Timeline.handleSize) ↩︎
    * [.on([*typename*], [*listener*])](#Timeline.on) ↩︎
    * [.selectionConfig([*value*])](#Timeline.selectionConfig) ↩︎
    * [.selection([*value*])](#Timeline.selection) ↩︎
    * [.snapping([*value*])](#Timeline.snapping) ↩︎


<a name="Timeline.render" href="#Timeline.render">#</a> Timeline.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L282)

Draws the timeline.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonPadding" href="#Timeline.buttonPadding">#</a> Timeline.**buttonPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L404)

If *value* is specified, sets the button padding and returns the current class instance. If *value* is not specified, returns the current button padding.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.brushing" href="#Timeline.brushing">#</a> Timeline.**brushing**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L414)

If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.brushFilter" href="#Timeline.brushFilter">#</a> Timeline.**brushFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L428)

If *value* is specified, sets the brush event filter and returns the current class instance. If *value* is not specified, returns the current brush event filter.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


```js
function() {
  return !event.button && event.detail < 2;
}
```


<a name="Timeline.brushMin" href="#Timeline.brushMin">#</a> Timeline.**brushMin**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L438)

Sets the minimum number of "ticks" to allow to be highlighted when using "ticks" buttonBehavior. Helpful when using x/y plots where you don't want the user to select less than 2 time periods. Value passed can either be a static Number, or a function that is expected to return a Number.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonAlign" href="#Timeline.buttonAlign">#</a> Timeline.**buttonAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L448)

If *value* is specified, toggles the horizontal alignment of the button timeline. Accepted values are `"start"`, `"middle"` and `"end"`. If *value* is not specified, returns the current button value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonBehavior" href="#Timeline.buttonBehavior">#</a> Timeline.**buttonBehavior**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L458)

If *value* is specified, toggles the style of the timeline. Accepted values are `"auto"`, `"buttons"` and `"ticks"`. If *value* is not specified, returns the current button value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.buttonHeight" href="#Timeline.buttonHeight">#</a> Timeline.**buttonHeight**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L468)

If *value* is specified, sets the button height and returns the current class instance. If *value* is not specified, returns the current button height.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.handleConfig" href="#Timeline.handleConfig">#</a> Timeline.**handleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L478)

If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.handleSize" href="#Timeline.handleSize">#</a> Timeline.**handleSize**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L488)

If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.on" href="#Timeline.on">#</a> Timeline.**on**([*typename*], [*listener*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L499)

Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.

| Param | Type |
| --- | --- |
| [*typename*] | <code>String</code> \| <code>Object</code> | 
| [*listener*] | <code>function</code> | 



<a name="Timeline.selectionConfig" href="#Timeline.selectionConfig">#</a> Timeline.**selectionConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L509)

If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.selection" href="#Timeline.selection">#</a> Timeline.**selection**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L519)

If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.snapping" href="#Timeline.snapping">#</a> Timeline.**snapping**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L529)

If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Wed, 17 May 2023 18:20:51 GMT</sub>
