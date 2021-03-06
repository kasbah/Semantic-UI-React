import _extends from 'babel-runtime/helpers/extends';
import _without from 'lodash/without';

import cx from 'classnames';
import React, { PropTypes } from 'react';

import { customPropTypes, getElementType, getUnhandledProps, META, SUI, useKeyOnly } from '../../lib';

/**
 * A group of segments can be formatted to appear together.
 */
function SegmentGroup(props) {
  var children = props.children,
      className = props.className,
      compact = props.compact,
      horizontal = props.horizontal,
      piled = props.piled,
      raised = props.raised,
      size = props.size,
      stacked = props.stacked;


  var classes = cx('ui', size, useKeyOnly(compact, 'compact'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(piled, 'piled'), useKeyOnly(raised, 'raised'), useKeyOnly(stacked, 'stacked'), 'segments', className);
  var rest = getUnhandledProps(SegmentGroup, props);
  var ElementType = getElementType(SegmentGroup, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    children
  );
}

SegmentGroup.handledProps = ['as', 'children', 'className', 'compact', 'horizontal', 'piled', 'raised', 'size', 'stacked'];
SegmentGroup._meta = {
  name: 'SegmentGroup',
  parent: 'Segment',
  type: META.TYPES.ELEMENT
};

process.env.NODE_ENV !== "production" ? SegmentGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A segment may take up only as much space as is necessary. */
  compact: PropTypes.bool,

  /** Formats content to be aligned horizontally. */
  horizontal: PropTypes.bool,

  /** Formatted to look like a pile of pages. */
  piled: PropTypes.bool,

  /** A segment group may be formatted to raise above the page. */
  raised: PropTypes.bool,

  /** A segment group can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: PropTypes.bool
} : void 0;

export default SegmentGroup;