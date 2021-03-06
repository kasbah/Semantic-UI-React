'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _without2 = require('lodash/without');

var _without3 = _interopRequireDefault(_without2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _AccordionContent = require('./AccordionContent');

var _AccordionContent2 = _interopRequireDefault(_AccordionContent);

var _AccordionTitle = require('./AccordionTitle');

var _AccordionTitle2 = _interopRequireDefault(_AccordionTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An accordion allows users to toggle the display of sections of content.
 */
var Accordion = function (_Component) {
  (0, _inherits3.default)(Accordion, _Component);

  function Accordion() {
    var _ref;

    (0, _classCallCheck3.default)(this, Accordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call.apply(_ref, [this].concat(args)));

    _this.state = {};

    _this.handleTitleClick = function (e, index) {
      var _this$props = _this.props,
          onTitleClick = _this$props.onTitleClick,
          exclusive = _this$props.exclusive;
      var activeIndex = _this.state.activeIndex;


      var newIndex = void 0;
      if (exclusive) {
        newIndex = index === activeIndex ? -1 : index;
      } else {
        // check to see if index is in array, and remove it, if not then add it
        newIndex = (0, _includes3.default)(activeIndex, index) ? (0, _without3.default)(activeIndex, index) : [].concat((0, _toConsumableArray3.default)(activeIndex), [index]);
      }
      _this.trySetState({ activeIndex: newIndex });
      if (onTitleClick) onTitleClick(e, index);
    };

    _this.isIndexActive = function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;

      return exclusive ? activeIndex === index : (0, _includes3.default)(activeIndex, index);
    };

    _this.renderChildren = function () {
      var children = _this.props.children;

      var titleIndex = 0;
      var contentIndex = 0;

      return _react.Children.map(children, function (child) {
        var isTitle = child.type === _AccordionTitle2.default;
        var isContent = child.type === _AccordionContent2.default;

        if (isTitle) {
          var currentIndex = titleIndex;
          var isActive = (0, _has3.default)(child, 'props.active') ? child.props.active : _this.isIndexActive(titleIndex);
          var onClick = function onClick(e) {
            _this.handleTitleClick(e, currentIndex);
            if (child.props.onClick) child.props.onClick(e, currentIndex);
          };
          titleIndex++;
          return (0, _react.cloneElement)(child, (0, _extends3.default)({}, child.props, { active: isActive, onClick: onClick }));
        }

        if (isContent) {
          var _isActive = (0, _has3.default)(child, 'props.active') ? child.props.active : _this.isIndexActive(contentIndex);
          contentIndex++;
          return (0, _react.cloneElement)(child, (0, _extends3.default)({}, child.props, { active: _isActive }));
        }

        return child;
      });
    };

    _this.renderPanels = function () {
      var panels = _this.props.panels;

      var children = [];

      (0, _each3.default)(panels, function (panel, i) {
        var isActive = (0, _has3.default)(panel, 'active') ? panel.active : _this.isIndexActive(i);
        var onClick = function onClick(e) {
          _this.handleTitleClick(e, i);
          if (panel.onClick) panel.onClick(e, i);
        };

        // implement all methods of creating a key that are supported in factories
        var key = panel.key || (0, _isFunction3.default)(panel.childKey) && panel.childKey(panel) || panel.childKey && panel.childKey || panel.title;

        children.push(_AccordionTitle2.default.create({ active: isActive, onClick: onClick, key: key + '-title', content: panel.title }));
        children.push(_AccordionContent2.default.create({ active: isActive, key: key + '-content', content: panel.content }));
      });

      return children;
    };

    _this.state = {
      activeIndex: _this.props.exclusive ? -1 : [-1]
    };
    return _this;
  }

  (0, _createClass3.default)(Accordion, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          fluid = _props.fluid,
          inverted = _props.inverted,
          panels = _props.panels,
          styled = _props.styled;


      var classes = (0, _classnames2.default)('ui', (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(styled, 'styled'), 'accordion', className);
      var rest = (0, _omit3.default)(this.props, (0, _keys3.default)(Accordion.propTypes));
      var ElementType = (0, _lib.getElementType)(Accordion, this.props);

      return _react2.default.createElement(
        ElementType,
        (0, _extends3.default)({}, rest, { className: classes }),
        panels ? this.renderPanels() : this.renderChildren()
      );
    }
  }]);
  return Accordion;
}(_lib.AutoControlledComponent);

Accordion.defaultProps = {
  exclusive: true
};
Accordion.autoControlledProps = ['activeIndex'];
Accordion._meta = {
  name: 'Accordion',
  type: _lib.META.TYPES.MODULE
};
Accordion.Content = _AccordionContent2.default;
Accordion.Title = _AccordionTitle2.default;
exports.default = Accordion;
process.env.NODE_ENV !== "production" ? Accordion.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Index of the currently active panel. */
  activeIndex: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.number), _react.PropTypes.number]),

  /** Primary content. */
  children: _react.PropTypes.node,

  /** Additional classes. */
  className: _react.PropTypes.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.number), _react.PropTypes.number]),

  /** Only allow one panel open at a time. */
  exclusive: _react.PropTypes.bool,

  /** Format to take up the width of it's container. */
  fluid: _react.PropTypes.bool,

  /** Format for dark backgrounds. */
  inverted: _react.PropTypes.bool,

  /** Called with (event, index) when a panel title is clicked. */
  onTitleClick: _react.PropTypes.func,

  /**
   * Create simple accordion panels from an array of { text: <string>, content: <custom> } objects.
   * Object can optionally define an `active` key to open/close the panel.
   * Object can opitonally define a `key` key used for title and content nodes' keys.
   * Mutually exclusive with children.
   * TODO: AccordionPanel should be a sub-component
   */
  panels: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _react.PropTypes.arrayOf(_react.PropTypes.shape({
    key: _react.PropTypes.string,
    active: _react.PropTypes.bool,
    title: _lib.customPropTypes.contentShorthand,
    content: _lib.customPropTypes.contentShorthand,
    onClick: _react.PropTypes.func
  }))]),

  /** Adds some basic styling to accordion panels. */
  styled: _react.PropTypes.bool
} : void 0;
Accordion.handledProps = ['activeIndex', 'as', 'children', 'className', 'defaultActiveIndex', 'exclusive', 'fluid', 'inverted', 'onTitleClick', 'panels', 'styled'];