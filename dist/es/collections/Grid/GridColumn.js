import _extends from 'babel-runtime/helpers/extends';
import cx from 'classnames';
import React, { PropTypes } from 'react';

import { customPropTypes, getElementType, getUnhandledProps, META, SUI, useKeyOnly, useTextAlignProp, useValueAndKey, useVerticalAlignProp, useWidthProp } from '../../lib';

/**
 * A column sub-component for Grid.
 */
function GridColumn(props) {
  var children = props.children,
      className = props.className,
      computer = props.computer,
      color = props.color,
      floated = props.floated,
      largeScreen = props.largeScreen,
      mobile = props.mobile,
      only = props.only,
      stretched = props.stretched,
      tablet = props.tablet,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      widescreen = props.widescreen,
      width = props.width;


  var classes = cx(color, useKeyOnly(stretched, 'stretched'), useTextAlignProp(textAlign), useValueAndKey(floated, 'floated'), useValueAndKey(only, 'only'), useVerticalAlignProp(verticalAlign), useWidthProp(computer, 'wide computer'), useWidthProp(largeScreen, 'wide large screen'), useWidthProp(mobile, 'wide mobile'), useWidthProp(tablet, 'wide tablet'), useWidthProp(widescreen, 'wide widescreen'), useWidthProp(width, 'wide'), 'column', className);
  var rest = getUnhandledProps(GridColumn, props);
  var ElementType = getElementType(GridColumn, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    children
  );
}

GridColumn.handledProps = ['as', 'children', 'className', 'color', 'computer', 'floated', 'largeScreen', 'mobile', 'only', 'stretched', 'tablet', 'textAlign', 'verticalAlign', 'widescreen', 'width'];
GridColumn._meta = {
  name: 'GridColumn',
  parent: 'Grid',
  type: META.TYPES.COLLECTION
};

process.env.NODE_ENV !== "production" ? GridColumn.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A grid column can be colored. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A column can specify a width for a computer. */
  computer: PropTypes.oneOf(SUI.WIDTHS),

  /** A column can sit flush against the left or right edge of a row. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** A column can specify a width for a large screen device. */
  largeScreen: PropTypes.oneOf(SUI.WIDTHS),

  /** A column can specify a width for a mobile device. */
  mobile: PropTypes.oneOf(SUI.WIDTHS),

  /** A column can appear only for a specific device, or screen sizes. */
  only: PropTypes.oneOf(['computer', 'large screen', 'mobile', 'tablet mobile', 'tablet', 'widescreen']),

  /** A column can stretch its contents to take up the entire grid or row height. */
  stretched: PropTypes.bool,

  /** A column can specify a width for a tablet device. */
  tablet: PropTypes.oneOf(SUI.WIDTHS),

  /** A column can specify its text alignment. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** A column can specify a width for a wide screen device. */
  widescreen: PropTypes.oneOf(SUI.WIDTHS),

  /** Represents width of column. */
  width: PropTypes.oneOf(SUI.WIDTHS)
} : void 0;

export default GridColumn;