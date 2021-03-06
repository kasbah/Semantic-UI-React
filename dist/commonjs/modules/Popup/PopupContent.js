'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = PopupContent;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A PopupContent displays the content body of a Popover.
 */
function PopupContent(props) {
  var children = props.children,
      className = props.className;

  var classes = (0, _classnames2.default)('content', className);
  var rest = (0, _lib.getUnhandledProps)(PopupContent, props);
  var ElementType = (0, _lib.getElementType)(PopupContent, props);

  return _react2.default.createElement(
    ElementType,
    (0, _extends3.default)({}, rest, { className: classes }),
    children
  );
}

PopupContent.handledProps = ['as', 'children', 'className'];
process.env.NODE_ENV !== "production" ? PopupContent.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** The content of the Popup */
  children: _react.PropTypes.node,

  /** Classes to add to the Popup content className. */
  className: _react.PropTypes.string
} : void 0;

PopupContent._meta = {
  name: 'PopupContent',
  type: _lib.META.TYPES.MODULE,
  parent: 'Popup'
};

PopupContent.create = (0, _lib.createShorthandFactory)(PopupContent, function (children) {
  return { children: children };
});