/**
    @external Axis
    @see https://github.com/d3plus/d3plus-axis#Axis
*/
import {max, min} from "d3-array";
import {brushX} from "d3-brush";
import {scaleTime} from "d3-scale";
import {event} from "d3-selection";

import {Axis, date} from "d3plus-axis";
import {accessor, attrize, closest, constant, elem} from "d3plus-common";
import {textWidth, textWrap} from "d3plus-text";

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
    this._align = () => this._buttonBehaviorCurrent === "buttons" ? "middle" : "start";
    this._barConfig = Object.assign({}, this._barConfig, {
      "stroke-width": () => this._buttonBehaviorCurrent === "buttons" ? 0 : 1
    });
    this._brushing = true;
    this._brushFilter = () => !event.button && event.detail < 2;
    this._buttonBehavior = "auto";
    this._buttonHeight = 30;
    this._buttonPadding = 12;
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
      "fill": "#777",
      "stroke-width": 0
    };
    this._shape = "Rect";
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      labelBounds: d => this._buttonBehaviorCurrent === "buttons" ? {x: d.labelBounds.x, y: -5, width: d.labelBounds.width, height: this._buttonHeight} : d.labelBounds,
      fill: () => this._buttonBehaviorCurrent === "buttons" ? "#EEE" : "#444",
      height: d => this._buttonBehaviorCurrent === "buttons" ? this._buttonHeight : d.tick ? 10 : 0,
      width: d => this._buttonBehaviorCurrent === "buttons" ? this._ticksWidth / this._availableTicks.length : d.tick ? this._domain.map(t => date(t).getTime()).includes(d.id) ? 2 : 1 : 0,
      y: d => this._buttonBehaviorCurrent === "buttons" ? this._height / 2 : d.y
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

      const buttonDomain = 0.5 * (this._ticksWidth / this._availableTicks.length - this._handleSize + 0.2),
            selection =  this._buttonBehaviorCurrent === "ticks" || event.selection[1] === event.selection[0] || buttonDomain === Math.round((event.selection[1] - event.selection[0]) * 10) / 10
              ? event.selection 
              : [event.selection[0] + buttonDomain, event.selection[1] - buttonDomain].sort((a, b) => a - b);

      const domain = (this._brushing 
        ? selection
        : this._buttonBehaviorCurrent === "buttons" 
          ? [event.sourceEvent.offsetX, event.sourceEvent.offsetX] : [event.selection[0], event.selection[0]])
        .map(Number);
      
      if (this._buttonBehaviorCurrent === "ticks") domain.map(this._d3Scale.invert);

      const ticks = this._buttonBehaviorCurrent === "ticks"
        ? this._availableTicks.map(Number) 
        : this._availableTicks.map((d, i) => this._marginLeft + (i + 0.5) * this._ticksWidth / this._availableTicks.length);

      if (this._buttonBehaviorCurrent === "ticks") {
        domain[0] = date(closest(domain[0], ticks));
        domain[1] = date(closest(domain[1], ticks));
      } 
      else {
        domain[0] = closest(domain[0], ticks);
        domain[1] = closest(domain[1], ticks);
      }

      const single = +domain[0] === +domain[1];
      this._selection = single ? domain[0] : domain;

      const pixelDomain = this._buttonBehaviorCurrent === "ticks" ? domain.map(this._d3Scale) : domain;
      this._updateBrushLimit(pixelDomain);
      
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
      .map(Number);

    if (this._buttonBehaviorCurrent === "ticks") domain.map(this._d3Scale.invert);

    const ticks = this._buttonBehaviorCurrent === "ticks"
      ? this._availableTicks.map(Number) 
      : this._availableTicks.map((d, i) => this._marginLeft + (i + 0.5) * this._ticksWidth / this._availableTicks.length);

    if (this._buttonBehaviorCurrent === "ticks") {
      domain[0] = date(closest(domain[0], ticks));
      domain[1] = date(closest(domain[1], ticks));
    } 
    else {
      domain[0] = closest(domain[0], ticks);
      domain[1] = closest(domain[1], ticks);
    }

    const single = +domain[0] === +domain[1];

    if (this._brushing || !this._snapping) {

      const pixelDomain = this._buttonBehaviorCurrent === "ticks" ? domain.map(this._d3Scale) : domain;
      this._updateBrushLimit(pixelDomain);

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
        .map(Number);

      if (this._buttonBehaviorCurrent === "ticks") domain.map(this._d3Scale.invert);

      const ticks = this._buttonBehaviorCurrent === "ticks"
        ? this._availableTicks.map(Number) 
        : this._availableTicks.map((d, i) => this._marginLeft + (i + 0.5) * this._ticksWidth / this._availableTicks.length);

      if (this._buttonBehaviorCurrent === "ticks") {
        domain[0] = date(closest(domain[0], ticks));
        domain[1] = date(closest(domain[1], ticks));
      } 
      else {
        domain[0] = closest(domain[0], ticks);
        domain[1] = closest(domain[1], ticks);
      }

      const pixelDomain = this._buttonBehaviorCurrent === "ticks" ? domain.map(this._d3Scale) : domain;
      this._updateBrushLimit(pixelDomain);

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

    const brushOverlay = this._brushGroup.selectAll(".overlay")
      .attr("cursor", this._brushing ? "crosshair" : "pointer");

    const brushSelection = this._brushGroup.selectAll(".selection")
      .call(attrize, this._selectionConfig)
      .attr("height", timelineHeight);

    const brushHandle = this._brushGroup.selectAll(".handle")
      .call(attrize, this._handleConfig)
      .attr("height", this._buttonBehaviorCurrent === "buttons" ? this._buttonHeight : timelineHeight + this._handleSize);

    if (this._buttonBehaviorCurrent === "buttons") {
      const yTransform = this._height / 2 - this._buttonHeight / 2;

      brushHandle.attr("y", yTransform);
      brushOverlay.attr("x", this._marginLeft).attr("width", this._ticksWidth);
      brushSelection.attr("y", yTransform);
    }

  }

  /**
      @memberof Timeline
      @desc Update limits of the brush.
      @private
  */
  _updateBrushLimit(selection) {
    if (selection[0] === selection[1]) {
      selection[0] -= 0.1;
      selection[1] += 0.1;
    }

    if (this._buttonBehaviorCurrent === "buttons") {
      const buttonWidth = 0.5 * (this._ticksWidth / this._availableTicks.length - this._handleSize);
      selection[0] -= buttonWidth;
      selection[1] += buttonWidth;
    }

    return selection;
  }

  /**
      @memberof Timeline
      @desc Draws the timeline.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  render(callback) {
    const {height, y} = this._position;

    if (this._buttonBehavior !== "ticks") {
      let ticks = this._ticks ? this._ticks.map(date) : this._domain.map(date);
      const d3Scale = scaleTime().domain(ticks).range([0, this._width]), 
            tickFormat = d3Scale.tickFormat();

      ticks = this._ticks ? ticks : d3Scale.ticks();
      // Measures size of ticks
      this._ticksWidth = ticks.reduce((sum, d, i) => {
        const f = this._shapeConfig.labelConfig.fontFamily(d, i),
              s = this._shapeConfig.labelConfig.fontSize(d, i);
  
              
        const wrap = textWrap()
          .fontFamily(f)
          .fontSize(s)
          .lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined);
  
        const res = wrap(tickFormat(d));

        let width = res.lines.length
          ? Math.ceil(max(res.lines.map(line => textWidth(line, {"font-family": f, "font-size": s})))) + s / 4
          : 0;
        if (width % 2) width++;
        return sum + width + 2 * this._buttonPadding;
      }, 0);
    }

    this._buttonBehaviorCurrent = this._buttonBehavior === "auto" ? this._ticksWidth < this._width ? "buttons" : "ticks" : this._buttonBehavior;

    if (this._ticks && !this._labels) {
      if (this._buttonBehaviorCurrent === "ticks") this._domain = [min(this._ticks), max(this._ticks)];
      this.labels(this._ticks);
    }

    if (this._buttonBehaviorCurrent === "buttons") {
      if (!this._brushing) this._handleSize = 0;
    }

    if (this._ticksWidth && this._buttonBehaviorCurrent === "buttons") {
      let ticks = this._ticks ? this._ticks.map(date) : this._domain.map(date);
      const d3Scale = scaleTime().domain(ticks).range([0, this._ticksWidth]);
      ticks = this._ticks ? ticks : d3Scale.ticks();

      const align = typeof this._align === "function" ? this._align() : this._align,
            buttonMargin = 0.5 * this._ticksWidth / ticks.length;

      this._marginLeft = align === "middle" 
        ? (this._width - this._ticksWidth) / 2 : align === "end" 
          ? this._width - this._ticksWidth : 0;

      const marginRight = align === "middle"
        ? (this._width + this._ticksWidth) / 2 - buttonMargin : align === "start" 
          ? this._ticksWidth - buttonMargin : undefined;

      this._range = [align === "start" ? undefined : this._marginLeft + buttonMargin, marginRight]; 
    }
    
    if (this._buttonBehaviorCurrent === "buttons") {
      this._scale = "ordinal";
      this._domain = this._ticks;
    }
    super.render(callback);

    const offset = this._outerBounds[y],
          range = this._d3Scale.range();
    console.log(this._domain)
    console.log(range)
    console.log(offset)
    const brush = this._brush = brushX()
      .extent([[range[0], offset], [range[range.length - 1], offset + this._outerBounds[height]]])
      .filter(this._brushFilter)
      .handleSize(this._handleSize)
      .on("start", this._brushStart.bind(this))
      .on("brush", this._brushBrush.bind(this))
      .on("end", this._brushEnd.bind(this));

    const latest = this._buttonBehaviorCurrent === "ticks"
      ? this._availableTicks[this._availableTicks.length - 1]
      : this._marginLeft + (range.length - 0.5) * this._ticksWidth / this._availableTicks.length;

    const selection = this._selection === void 0 ? [latest, latest]
      : this._selection instanceof Array
        ? this._selection.slice()
        : [this._selection, this._selection];
      
    if (this._buttonBehaviorCurrent === "ticks") {
      selection.map(date).map(this._d3Scale);
    }

    this._updateBrushLimit(selection);

    this._brushGroup = elem("g.brushGroup", {parent: this._group});
    this._brushGroup.call(brush).transition(this._transition)
      .call(brush.move, selection);

    this._outerBounds.y -= this._handleSize / 2;
    this._outerBounds.height += this._handleSize / 2;

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
      @desc If *value* is specified, toggles the style of the timeline. Accepted values are `"auto"`, `"buttons"` and `"ticks"`. If *value* is not specified, returns the current button value.
      @param {String} [*value* = "auto"]
      @chainable
  */
  buttonBehavior(_) {
    return arguments.length ? (this._buttonBehavior = _, this) : this._buttonBehavior;
  }

  /**
        @memberof Timeline
        @desc If *value* is specified, sets the button height and returns the current class instance. If *value* is not specified, returns the current button height.
        @param {Number} [*value* = 30]
        @chainable
    */
  buttonHeight(_) {
    return arguments.length ? (this._buttonHeight = _, this) : this._buttonHeight;
  }

  /**
        @memberof Timeline
        @desc If *value* is specified, sets the button padding and returns the current class instance. If *value* is not specified, returns the current button padding.
        @param {Number} [*value* = 10]
        @chainable
    */
  buttonPadding(_) {
    return arguments.length ? (this._buttonPadding = _, this) : this._buttonPadding;
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
