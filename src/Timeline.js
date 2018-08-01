/**
    @external Axis
    @see https://github.com/d3plus/d3plus-axis#Axis
*/

import {brushX} from "d3-brush";
import {event} from "d3-selection";

import {Axis, date} from "d3plus-axis";
import {attrize, closest, elem} from "d3plus-common";

/**
    @class Timeline
    @extends external:Axis
*/
export default class Timeline extends Axis {

  /**
      @memberof Timeline
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
      @private
  */
  constructor() {

    super();

    this._barConfig = {
      strokeWidth: 0
    };
    this._brushing = true;
    this._brushFilter = () => !event.button && event.detail < 2;
    this._domain = [2001, 2010];
    this._gridSize = 0;
    this._handleConfig = {
      height: 30,
      fill: true ? "#222" : "#444",
      opacity: true ? 1 : 1
    };
    this._handleSize = 6;
    this._height = true ? 45 : 100;
    this._on = {};
    this.orient("bottom");
    this._scale = "time";
    this._selectionConfig = {
      "fill": "#777",
      "stroke-width": 0
    };
    this._shape = "Rect";
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      fill: d => true ? "#EEE" : d,
      labelBounds: {x: -20, y: -5, width: 40, height: 30},
      height: d => true ? 30 : d.tick ? 10 : 0,
      width: d => true ? this._width / this._availableTicks.length : (d.tick ? this._domain.map(t => date(t).getTime()).includes(d.id) ? 2 : 1 : 0),
      y: 45 - 30 + 5 + 2
    });
    this._snapping = true;

  }

  /**
      @memberof Timeline
      @desc Triggered on brush "brush".
      @private
  */
  _brushBrush() {

    if (event.sourceEvent && event.sourceEvent.offsetX && event.selection !== null && (!this._brushing || this._snapping)) {

      const domain = (this._brushing ? event.selection
        : [event.selection[0], event.selection[0]])
        .map(this._d3Scale.invert)
        .map(Number);

      const ticks = this._availableTicks.map(Number);
      domain[0] = date(closest(domain[0], ticks));
      domain[1] = date(closest(domain[1], ticks));

      const single = +domain[0] === +domain[1];

      this._selection = single ? domain[0] : domain;

      const pixelDomain = domain.map(this._d3Scale);

      if (single) {
        pixelDomain[0] -= 0.1;
        pixelDomain[1] += 0.1;
      }

      this._brushGroup.call(this._brush.move, pixelDomain);

    }

    this._brushStyle();
    if (this._on.brush) this._on.brush(this._selection);

  }

  /**
      @memberof Timeline
      @desc Triggered on brush "end".
      @private
  */
  _brushEnd() {

    if (!event.sourceEvent) return; // Only transition after input.

    const domain = (event.selection && this._brushing ? event.selection
      : [event.sourceEvent.offsetX, event.sourceEvent.offsetX])
      .map(this._d3Scale.invert)
      .map(Number);

    const ticks = this._availableTicks.map(Number);
    domain[0] = date(closest(domain[0], ticks));
    domain[1] = date(closest(domain[1], ticks));

    const single = +domain[0] === +domain[1];

    if (this._brushing || !this._snapping) {

      const pixelDomain = domain.map(this._d3Scale);

      if (single) {
        pixelDomain[0] -= 0.1;
        pixelDomain[1] += 0.1;
      }

      this._brushGroup.transition(this._transition).call(this._brush.move, pixelDomain);

    }

    this._brushStyle();
    this._selection = single ? domain[0] : domain;
    if (this._on.end) this._on.end(this._selection);

  }

  /**
      @memberof Timeline
      @desc Triggered on brush "start".
      @private
  */
  _brushStart() {

    if (event.sourceEvent !== null && (!this._brushing || this._snapping)) {

      const domain = (event.selection && this._brushing ? event.selection
        : [event.sourceEvent.offsetX, event.sourceEvent.offsetX])
        .map(this._d3Scale.invert)
        .map(Number);

      const ticks = this._availableTicks.map(Number);
      domain[0] = date(closest(domain[0], ticks));
      domain[1] = date(closest(domain[1], ticks));

      const single = +domain[0] === +domain[1];

      const pixelDomain = domain.map(this._d3Scale);

      if (single) {
        pixelDomain[0] -= 0.1;
        pixelDomain[1] += 0.1;
      }

      this._brushGroup.call(this._brush.move, pixelDomain);

    }

    this._brushStyle();
    if (this._on.start) this._on.start();

  }

  /**
      @memberof Timeline
      @desc Overrides the default brush styles.
      @private
  */
  _brushStyle() {

    const {height} = this._position;
    const timelineHeight = this._shape === "Circle"
      ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) * 2 : this._shapeConfig.r
      : this._shape === "Rect"
        ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
        : this._tickSize;

    this._brushGroup.selectAll(".overlay")
      .attr("cursor", this._brushing ? "crosshair" : "pointer");

    this._brushGroup.selectAll(".selection")
      .call(attrize, this._selectionConfig)
      .attr("height", timelineHeight);

    this._brushGroup.selectAll(".handle")
      .call(attrize, this._handleConfig)
      .attr("height", timelineHeight + this._handleSize);
    
    if (true) {
      

      this._brushGroup.selectAll(".selection")
      .call(attrize, this._selectionConfig)
      .attr("height", timelineHeight)
      .attr("y", 7.5);
    
      this._brushGroup.selectAll(".handle")
      .call(attrize, this._handleConfig)
      .attr("height", 30)
      .attr("y", 7.5);
    }

  }

  /**
      @memberof Timeline
      @desc Draws the timeline.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  render(callback) {

    super.render(callback);

    const {height, y} = this._position;

    const offset = this._outerBounds[y],
          range = this._d3Scale.range();
console.log(offset)
console.log(range)
    const brush = this._brush = brushX()
      .extent([[range[0], offset], [range[1], offset + this._outerBounds[height]]])
      .filter(this._brushFilter)
      .handleSize(this._handleSize)
      .on("start", this._brushStart.bind(this))
      .on("brush", this._brushBrush.bind(this))
      .on("end", this._brushEnd.bind(this));

    const latest = this._availableTicks[this._availableTicks.length - 1];
    const selection = (this._selection === void 0 ? [latest, latest]
      : this._selection instanceof Array
        ? this._selection.slice()
        : [this._selection, this._selection])
      .map(date)
      .map(this._d3Scale);

    if (selection[0] === selection[1]) {
      selection[0] -= 0.1;
      selection[1] += 0.1;
    }

    this._brushGroup = elem("g.brushGroup", {parent: this._group});
    this._brushGroup.call(brush).transition(this._transition)
      .call(brush.move, selection);

    this._outerBounds.y -= this._handleSize / 2;
    this._outerBounds.height += this._handleSize / 2;

    console.log(this)

    return this;

  }

  /**
      @memberof Timeline
      @desc If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  brushing(_) {
    return arguments.length ? (this._brushing = _, this) : this._brushing;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the brush event filter and returns the current class instance. If *value* is not specified, returns the current brush event filter.
      @param {Function} [*value*]
      @chainable
      @example
function() {
  return !event.button && event.detail < 2;
}
  */
  brushFilter(_) {
    return arguments.length ? (this._brushFilter = _, this) : this._brushFilter;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.
      @param {Object} [*value*]
      @chainable
  */
  handleConfig(_) {
    return arguments.length ? (this._handleConfig = Object.assign(this._handleConfig, _), this) : this._handleConfig;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.
      @param {Number} [*value* = 6]
      @chainable
  */
  handleSize(_) {
    return arguments.length ? (this._handleSize = _, this) : this._handleSize;
  }

  /**
      @memberof Timeline
      @desc Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.
      @param {String|Object} [*typename*]
      @param {Function} [*listener*]
      @chainable
  */
  on(_, f) {
    return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.
      @param {Object} [*value*]
      @chainable
  */
  selectionConfig(_) {
    return arguments.length ? (this._selectionConfig = Object.assign(this._selectionConfig, _), this) : this._selectionConfig;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.
      @param {Array|Date|Number|String} [*value*]
      @chainable
  */
  selection(_) {
    return arguments.length ? (this._selection = _, this) : this._selection;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  snapping(_) {
    return arguments.length ? (this._snapping = _, this) : this._snapping;
  }

}
