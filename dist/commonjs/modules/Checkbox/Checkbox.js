'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _isNil2 = require('lodash/fp/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _lib.makeDebugger)('checkbox');

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 * @see Form
 * @see Radio
 */

var Checkbox = function (_Component) {
  (0, _inherits3.default)(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.canToggle = function () {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          radio = _this$props.radio,
          readOnly = _this$props.readOnly;
      var checked = _this.state.checked;


      return !disabled && !readOnly && !(radio && checked);
    }, _this.handleInputRef = function (c) {
      return _this.inputRef = c;
    }, _this.handleClick = function (e) {
      debug('handleClick()');
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          onClick = _this$props2.onClick;
      var _this$state = _this.state,
          checked = _this$state.checked,
          indeterminate = _this$state.indeterminate;


      if (_this.canToggle()) {
        if (onClick) onClick(e, (0, _extends3.default)({}, _this.props, { checked: !!checked, indeterminate: !!indeterminate }));
        if (onChange) onChange(e, (0, _extends3.default)({}, _this.props, { checked: !checked, indeterminate: false }));

        _this.trySetState({ checked: !checked, indeterminate: false });
      }
    }, _this.setIndeterminate = function () {
      var indeterminate = _this.state.indeterminate;

      if (_this.inputRef) _this.inputRef.indeterminate = !!indeterminate;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setIndeterminate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setIndeterminate();
    }

    // Note: You can't directly set the indeterminate prop on the input, so we
    // need to maintain a ref to the input and set it manually whenever the
    // component updates.

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          label = _props.label,
          name = _props.name,
          radio = _props.radio,
          readOnly = _props.readOnly,
          slider = _props.slider,
          tabIndex = _props.tabIndex,
          toggle = _props.toggle,
          type = _props.type,
          value = _props.value;
      var _state = this.state,
          checked = _state.checked,
          indeterminate = _state.indeterminate;


      var classes = (0, _classnames2.default)('ui', (0, _lib.useKeyOnly)(checked, 'checked'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(indeterminate, 'indeterminate'),
      // auto apply fitted class to compact white space when there is no label
      // http://semantic-ui.com/modules/checkbox.html#fitted
      (0, _lib.useKeyOnly)(!label, 'fitted'), (0, _lib.useKeyOnly)(radio, 'radio'), (0, _lib.useKeyOnly)(readOnly, 'read-only'), (0, _lib.useKeyOnly)(slider, 'slider'), (0, _lib.useKeyOnly)(toggle, 'toggle'), 'checkbox', className);
      var rest = (0, _lib.getUnhandledProps)(Checkbox, this.props);
      var ElementType = (0, _lib.getElementType)(Checkbox, this.props);

      var computedTabIndex = void 0;
      if (!(0, _isNil3.default)(tabIndex)) computedTabIndex = tabIndex;else computedTabIndex = disabled ? -1 : 0;

      return _react2.default.createElement(
        ElementType,
        (0, _extends3.default)({}, rest, { className: classes, onClick: this.handleClick, onChange: this.handleClick }),
        _react2.default.createElement('input', {
          checked: checked,
          className: 'hidden',
          name: name,
          readOnly: true,
          ref: this.handleInputRef,
          tabIndex: computedTabIndex,
          type: type,
          value: value
        }),
        (0, _lib.createHTMLLabel)(label) || _react2.default.createElement('label', null)
      );
    }
  }]);
  return Checkbox;
}(_lib.AutoControlledComponent);

Checkbox.defaultProps = {
  type: 'checkbox'
};
Checkbox.autoControlledProps = ['checked', 'indeterminate'];
Checkbox._meta = {
  name: 'Checkbox',
  type: _lib.META.TYPES.MODULE
};
exports.default = Checkbox;
process.env.NODE_ENV !== "production" ? Checkbox.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Whether or not checkbox is checked. */
  checked: _react.PropTypes.bool,

  /** Additional classes. */
  className: _react.PropTypes.string,

  /** The initial value of checked. */
  defaultChecked: _react.PropTypes.bool,

  /** Whether or not checkbox is indeterminate. */
  defaultIndeterminate: _react.PropTypes.bool,

  /** A checkbox can appear disabled and be unable to change states */
  disabled: _react.PropTypes.bool,

  /** Removes padding for a label. Auto applied when there is no label. */
  fitted: _react.PropTypes.bool,

  /** Whether or not checkbox is indeterminate. */
  indeterminate: _react.PropTypes.bool,

  /** The text of the associated label element. */
  label: _lib.customPropTypes.itemShorthand,

  /** The HTML input name. */
  name: _react.PropTypes.string,

  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange: _react.PropTypes.func,

  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick: _react.PropTypes.func,

  /** Format as a radio element. This means it is an exclusive option. */
  radio: _lib.customPropTypes.every([_react.PropTypes.bool, _lib.customPropTypes.disallow(['slider', 'toggle'])]),

  /** A checkbox can be read-only and unable to change states. */
  readOnly: _react.PropTypes.bool,

  /** Format to emphasize the current selection state. */
  slider: _lib.customPropTypes.every([_react.PropTypes.bool, _lib.customPropTypes.disallow(['radio', 'toggle'])]),

  /** Format to show an on or off choice. */
  toggle: _lib.customPropTypes.every([_react.PropTypes.bool, _lib.customPropTypes.disallow(['radio', 'slider'])]),

  /** HTML input type, either checkbox or radio. */
  type: _react.PropTypes.oneOf(['checkbox', 'radio']),

  /** The HTML input value. */
  value: _react.PropTypes.string,

  /** A checkbox can receive focus. */
  tabIndex: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
} : void 0;
Checkbox.handledProps = ['as', 'checked', 'className', 'defaultChecked', 'defaultIndeterminate', 'disabled', 'fitted', 'indeterminate', 'label', 'name', 'onChange', 'onClick', 'radio', 'readOnly', 'slider', 'tabIndex', 'toggle', 'type', 'value'];