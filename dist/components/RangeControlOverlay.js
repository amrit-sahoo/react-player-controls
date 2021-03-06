"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _autobindDecorator = _interopRequireDefault(require("autobind-decorator"));

var _constants = require("../constants.js");

var _utils = require("../utils.js");

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var oneOfType = _propTypes.default.oneOfType,
    shape = _propTypes.default.shape,
    func = _propTypes.default.func,
    number = _propTypes.default.number,
    oneOf = _propTypes.default.oneOf,
    object = _propTypes.default.object,
    string = _propTypes.default.string;
/**
 * An invisible overlay that acts as a range mouse control
 * within a specified bounds.
 */

var RangeControlOverlay = (_class =
/*#__PURE__*/
function (_Component) {
  _inherits(RangeControlOverlay, _Component);

  function RangeControlOverlay(props) {
    var _this;

    _classCallCheck(this, RangeControlOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeControlOverlay).call(this, props));
    _this.state = {
      isDragging: false
    };
    return _this;
  }

  _createClass(RangeControlOverlay, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.endDrag();
    }
  }, {
    key: "startDrag",
    value: function startDrag(evt) {
      this.setState({
        isDragging: true
      });
      window.addEventListener('mousemove', this.triggerRangeChange);
      window.addEventListener('ontouchmove', this.triggerRangeChange);
      window.addEventListener('mouseup', this.endDrag);
      window.addEventListener('ontouchend', this.endDrag);
      this.toggleSelection('none');
      var startValue = evt ? this.getValueFromMouseEvent(evt) : null;
      this.props.onChangeStart(startValue);
    }
  }, {
    key: "endDrag",
    value: function endDrag(evt) {
      if (evt) {
        this.triggerRangeChange(evt);
      }

      this.setState({
        isDragging: false
      });
      window.removeEventListener('mousemove', this.triggerRangeChange);
      window.removeEventListener('ontouchmove', this.triggerRangeChange);
      window.removeEventListener('mouseup', this.endDrag);
      window.removeEventListener('ontouchend', this.endDrag);
      this.toggleSelection('');
      var endValue = evt ? this.getValueFromMouseEvent(evt) : null;
      this.props.onChangeEnd(endValue);
    }
  }, {
    key: "toggleSelection",
    value: function toggleSelection(value) {
      var body = document.getElementsByTagName('body')[0];
      body.style['user-select'] = value;
      body.style['-webkit-user-select'] = value;
      body.style['-moz-user-select'] = value;
      body.style['-ms-user-select'] = value;
    }
  }, {
    key: "getValueFromMouseEvent",
    value: function getValueFromMouseEvent(mouseEvent) {
      return this.props.direction === _constants.Direction.VERTICAL ? this.getVerticalValue(mouseEvent.pageY) : this.getHorizontalValue(mouseEvent.pageX);
    }
  }, {
    key: "triggerRangeChange",
    value: function triggerRangeChange(mouseEvent) {
      this.props.onChange(this.getValueFromMouseEvent(mouseEvent));
    }
  }, {
    key: "handleIntentStart",
    value: function handleIntentStart(evt) {
      var _this$props = this.props,
          direction = _this$props.direction,
          onIntentStart = _this$props.onIntentStart;

      if (!this.state.isDragging) {
        var value = direction === _constants.Direction.VERTICAL ? this.getVerticalValue(evt.pageY) : this.getHorizontalValue(evt.pageX);
        onIntentStart(value);
      }
    }
  }, {
    key: "handleIntentMove",
    value: function handleIntentMove(evt) {
      var _this$props2 = this.props,
          direction = _this$props2.direction,
          onIntent = _this$props2.onIntent;

      if (!this.state.isDragging) {
        var value = direction === _constants.Direction.VERTICAL ? this.getVerticalValue(evt.pageY) : this.getHorizontalValue(evt.pageX);
        onIntent(value);
      }
    }
  }, {
    key: "handleIntentEnd",
    value: function handleIntentEnd(evt) {
      var onIntentEnd = this.props.onIntentEnd;

      if (!this.state.isDragging) {
        onIntentEnd();
      }
    }
  }, {
    key: "getRectFromBounds",
    value: function getRectFromBounds() {
      var bounds = this.props.bounds;
      return typeof bounds === 'function' ? bounds() : bounds;
    }
  }, {
    key: "getHorizontalValue",
    value: function getHorizontalValue(mouseX) {
      var rect = this.getRectFromBounds();
      var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var dLeft = mouseX - (rect.left + scrollX);
      dLeft = Math.max(dLeft, 0);
      dLeft = Math.min(dLeft, rect.width);
      return dLeft / rect.width;
    }
  }, {
    key: "getVerticalValue",
    value: function getVerticalValue(mouseY) {
      var rect = this.getRectFromBounds();
      var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var dTop = mouseY - (rect.top + scrollY);
      dTop = Math.max(dTop, 0);
      dTop = Math.min(dTop, rect.height);
      return 1 - dTop / rect.height;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          style = _this$props3.style;
      return _react.default.createElement("div", {
        className: className,
        style: style,
        onMouseDown: this.startDrag,
        onTouchStart: this.startDrag,
        onMouseEnter: this.handleIntentStart,
        onMouseMove: this.handleIntentMove,
        onMouseLeave: this.handleIntentEnd
      });
    }
  }]);

  return RangeControlOverlay;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, "startDrag", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "startDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "endDrag", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "endDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "triggerRangeChange", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "triggerRangeChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleIntentStart", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleIntentStart"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleIntentMove", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleIntentMove"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleIntentEnd", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleIntentEnd"), _class.prototype)), _class);
RangeControlOverlay.propTypes = {
  bounds: oneOfType([func, shape({
    width: number.isRequired,
    left: number.isRequired
  }), shape({
    height: number.isRequired,
    top: number.isRequired
  })]).isRequired,
  onChange: func.isRequired,
  onChangeStart: func,
  onChangeEnd: func,
  onIntent: func,
  onIntentStart: func,
  onIntentEnd: func,
  direction: oneOf([_constants.Direction.HORIZONTAL, _constants.Direction.VERTICAL]),
  className: string,
  style: object
};
RangeControlOverlay.defaultProps = {
  onChangeStart: _utils.noop,
  onChangeEnd: _utils.noop,
  onIntent: _utils.noop,
  onIntentStart: _utils.noop,
  onIntentEnd: _utils.noop,
  direction: _constants.Direction.HORIZONTAL,
  className: null,
  style: {}
};
var _default = RangeControlOverlay;
exports.default = _default;