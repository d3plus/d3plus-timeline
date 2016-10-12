import {brushX} from "d3-brush";
import {event} from "d3-selection";

import {Axis, date} from "d3plus-axis";
import {attrize, closest, elem} from "d3plus-common";

/**
    @class Timeline
    @extends Axis
*/
export default class Timeline extends Axis {

  /**
      @memberof Timeline
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
      @private
  */
  constructor() {

    super();

    this._domain = [2001, 2010];
    this._gridSize = 0;
    this._handleConfig = {
      fill: "#444"
    };
    this._handleSize = 6;
    this._height = 100;
    this._on = {};
    this.orient("bottom");
    this._scale = "time";
    this._selectionConfig = {
      fill: "#777"
    };
    this._shape = "Rect";
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      height: 10,
      width: d => this._domain.map(t => date(t).getTime()).includes(d.id) ? 2 : 1
    });

  }

  /**
      @memberof Timeline
      @desc Triggered on brush "brush".
      @private
  */
  _brushBrush() {

    this._brushStyle();
    if (this._on.brush) this._on.brush();

  }

  /**
      @memberof Timeline
      @desc Triggered on brush "end".
      @private
  */
  _brushEnd() {

    if (!event.sourceEvent) return; // Only transition after input.

    const domain = (event.selection ? event.selection
                 : [event.sourceEvent.offsetX, event.sourceEvent.offsetX])
                 .map(this._d3Scale.invert)
                 .map(Number);

    const ticks = this._visibleTicks.map(Number);
    domain[0] = date(closest(domain[0], ticks));
    domain[1] = date(closest(domain[1], ticks));
    const pixelDomain = domain.map(this._d3Scale),
          single = pixelDomain[0] === pixelDomain[1];
    if (single) {
      pixelDomain[0] -= 0.1;
      pixelDomain[1] += 0.1;
    }

    this._brushGroup.transition(this._transition).call(this._brush.move, pixelDomain);

    this._brushStyle();

    if (this._on.end) this._on.end(single ? domain[0] : domain);

  }

  /**
      @memberof Timeline
      @desc Triggered on brush "start".
      @private
  */
  _brushStart() {

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
    const timelineHeight = this._shape === "Circle" ? this._shapeConfig.r * 2
             : this._shape === "Rect" ? this._shapeConfig[height]
             : this._tickSize;

    this._brushGroup.selectAll(".selection")
      .call(attrize, this._selectionConfig)
      .attr("height", timelineHeight);

    this._brushGroup.selectAll(".handle")
      .call(attrize, this._handleConfig)
      .attr("height", timelineHeight + this._handleSize);

  }

  /**
      Draws the timeline.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const {height, y} = this._position;

    const offset = this._outerBounds[y],
          range = this._d3Scale.range();

    const brush = this._brush = brushX()
      .extent([[range[0], offset], [range[1], offset + this._outerBounds[height]]])
      .handleSize(this._handleSize)
      .on("start", this._brushStart.bind(this))
      .on("brush", this._brushBrush.bind(this))
      .on("end", this._brushEnd.bind(this));

    const latest = this._visibleTicks[this._visibleTicks.length - 1];
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

    return this;

  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.
      @param {Object} [*value*]
  */
  handleConfig(_) {
    return arguments.length ? (this._handleConfig = Object.assign(this._handleConfig, _), this) : this._handleConfig;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.
      @param {Number} [*value* = 6]
  */
  handleSize(_) {
    return arguments.length ? (this._handleSize = _, this) : this._handleSize;
  }

  /**
      @memberof Timeline
      @desc Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.
      @param {String|Object} [*typename*]
      @param {Function} [*listener*]
  */
  on(_, f) {
    return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.
      @param {Object} [*value*]
  */
  selectionConfig(_) {
    return arguments.length ? (this._selectionConfig = Object.assign(this._selectionConfig, _), this) : this._selectionConfig;
  }

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.
      @param {Array|Date|Number|String} [*value*]
  */
  selection(_) {
    return arguments.length ? (this._selection = _, this) : this._selection;
  }

}
