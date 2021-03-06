import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get2 from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _compact from 'lodash/compact';
import _map from 'lodash/map';
import _isNil from 'lodash/isNil';
import _every from 'lodash/every';
import _without from 'lodash/without';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _some from 'lodash/some';
import _escapeRegExp from 'lodash/escapeRegExp';
import _filter from 'lodash/filter';
import _isFunction from 'lodash/isFunction';
import _dropRight from 'lodash/dropRight';
import _isEmpty from 'lodash/isEmpty';
import _union from 'lodash/union';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import _isUndefined from 'lodash/isUndefined';
import _has from 'lodash/has';
import _isEqual from 'lodash/isEqual';
import cx from 'classnames';

import React, { Children, cloneElement, PropTypes } from 'react';

import { AutoControlledComponent as Component, createShorthand, customPropTypes, getElementType, getUnhandledProps, isBrowser, keyboardKey, makeDebugger, META, objectDiff, useKeyOnly, useKeyOrValueAndKey } from '../../lib';
import Icon from '../../elements/Icon';
import Label from '../../elements/Label';
import DropdownDivider from './DropdownDivider';
import DropdownItem from './DropdownItem';
import DropdownHeader from './DropdownHeader';
import DropdownMenu from './DropdownMenu';

var debug = makeDebugger('dropdown');

/**
 * A dropdown allows a user to select a value from a series of options.
 * @see Form
 * @see Select
 * @see Menu
 */

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e, value) {
      debug('handleChange()');
      debug(value);
      var onChange = _this.props.onChange;

      if (onChange) onChange(e, _extends({}, _this.props, { value: value }));
    }, _this.closeOnChange = function (e) {
      var _this$props = _this.props,
          closeOnChange = _this$props.closeOnChange,
          multiple = _this$props.multiple;

      var shouldClose = _isUndefined(closeOnChange) ? !multiple : closeOnChange;

      if (shouldClose) _this.close(e);
    }, _this.closeOnEscape = function (e) {
      if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;
      e.preventDefault();
      _this.close();
    }, _this.moveSelectionOnKeyDown = function (e) {
      debug('moveSelectionOnKeyDown()');
      debug(keyboardKey.getName(e));
      switch (keyboardKey.getCode(e)) {
        case keyboardKey.ArrowDown:
          e.preventDefault();
          _this.moveSelectionBy(1);
          break;
        case keyboardKey.ArrowUp:
          e.preventDefault();
          _this.moveSelectionBy(-1);
          break;
        default:
          break;
      }
    }, _this.openOnSpace = function (e) {
      debug('openOnSpace()');

      if (keyboardKey.getCode(e) !== keyboardKey.Spacebar) return;
      if (_this.state.open) return;

      e.preventDefault();

      _this.open(e);
    }, _this.openOnArrow = function (e) {
      debug('openOnArrow()');

      var code = keyboardKey.getCode(e);
      if (!_includes([keyboardKey.ArrowDown, keyboardKey.ArrowUp], code)) return;
      if (_this.state.open) return;

      e.preventDefault();

      _this.open(e);
    }, _this.makeSelectedItemActive = function (e) {
      var open = _this.state.open;
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          onAddItem = _this$props2.onAddItem;

      var item = _this.getSelectedItem();
      var value = _get(item, 'value');

      // prevent selecting null if there was no selected item value
      // prevent selecting duplicate items when the dropdown is closed
      if (!value || !open) return;

      // notify the onAddItem prop if this is a new value
      if (onAddItem && item['data-additional']) {
        onAddItem(e, _extends({}, _this.props, { value: value }));
      }
      // notify the onChange prop that the user is trying to change value
      if (multiple) {
        // state value may be undefined
        var newValue = _union(_this.state.value, [value]);
        _this.setValue(newValue);
        _this.handleChange(e, newValue);
      } else {
        _this.setValue(value);
        _this.handleChange(e, value);
      }
    }, _this.selectItemOnEnter = function (e) {
      debug('selectItemOnEnter()');
      debug(keyboardKey.getName(e));
      if (keyboardKey.getCode(e) !== keyboardKey.Enter) return;
      e.preventDefault();

      _this.makeSelectedItemActive(e);
      _this.closeOnChange(e);
    }, _this.removeItemOnBackspace = function (e) {
      debug('removeItemOnBackspace()');
      debug(keyboardKey.getName(e));
      if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return;

      var _this$props3 = _this.props,
          multiple = _this$props3.multiple,
          search = _this$props3.search;
      var _this$state = _this.state,
          searchQuery = _this$state.searchQuery,
          value = _this$state.value;


      if (searchQuery || !search || !multiple || _isEmpty(value)) return;

      e.preventDefault();

      // remove most recent value
      var newValue = _dropRight(value);

      _this.setValue(newValue);
      _this.handleChange(e, newValue);
    }, _this.closeOnDocumentClick = function (e) {
      debug('closeOnDocumentClick()');
      debug(e);

      // If event happened in the dropdown, ignore it
      if (_this.ref && _isFunction(_this.ref.contains) && _this.ref.contains(e.target)) return;

      _this.close();
    }, _this.handleMouseDown = function (e) {
      debug('handleMouseDown()');
      var onMouseDown = _this.props.onMouseDown;

      if (onMouseDown) onMouseDown(e, _this.props);
      _this.isMouseDown = true;
      // Do not access document when server side rendering
      if (!isBrowser) return;
      document.addEventListener('mouseup', _this.handleDocumentMouseUp);
    }, _this.handleDocumentMouseUp = function () {
      debug('handleDocumentMouseUp()');
      _this.isMouseDown = false;
      // Do not access document when server side rendering
      if (!isBrowser) return;
      document.removeEventListener('mouseup', _this.handleDocumentMouseUp);
    }, _this.handleClick = function (e) {
      debug('handleClick()', e);
      var onClick = _this.props.onClick;

      if (onClick) onClick(e, _this.props);
      // prevent closeOnDocumentClick()
      e.stopPropagation();
      _this.toggle(e);
    }, _this.handleItemClick = function (e, item) {
      debug('handleItemClick()');
      debug(item);
      var _this$props4 = _this.props,
          multiple = _this$props4.multiple,
          onAddItem = _this$props4.onAddItem;
      var value = item.value;

      // prevent toggle() in handleClick()

      e.stopPropagation();
      // prevent closeOnDocumentClick() if multiple or item is disabled
      if (multiple || item.disabled) {
        e.nativeEvent.stopImmediatePropagation();
      }

      if (item.disabled) return;

      // notify the onAddItem prop if this is a new value
      if (onAddItem && item['data-additional']) {
        onAddItem(e, _extends({}, _this.props, { value: value }));
      }

      // notify the onChange prop that the user is trying to change value
      if (multiple) {
        var newValue = _union(_this.state.value, [value]);
        _this.setValue(newValue);
        _this.handleChange(e, newValue);
      } else {
        _this.setValue(value);
        _this.handleChange(e, value);
      }
      _this.closeOnChange(e);
    }, _this.handleFocus = function (e) {
      debug('handleFocus()');
      var onFocus = _this.props.onFocus;
      var focus = _this.state.focus;

      if (focus) return;
      if (onFocus) onFocus(e, _this.props);
      _this.setState({ focus: true });
    }, _this.handleBlur = function (e) {
      debug('handleBlur()');
      var _this$props5 = _this.props,
          closeOnBlur = _this$props5.closeOnBlur,
          multiple = _this$props5.multiple,
          onBlur = _this$props5.onBlur,
          selectOnBlur = _this$props5.selectOnBlur;
      // do not "blur" when the mouse is down inside of the Dropdown

      if (_this.isMouseDown) return;
      if (onBlur) onBlur(e, _this.props);
      if (selectOnBlur && !multiple) {
        _this.makeSelectedItemActive(e);
        if (closeOnBlur) _this.close();
      }
      _this.setState({ focus: false, searchQuery: '' });
    }, _this.handleSearchChange = function (e) {
      debug('handleSearchChange()');
      debug(e.target.value);
      // prevent propagating to this.props.onChange()
      e.stopPropagation();
      var _this$props6 = _this.props,
          search = _this$props6.search,
          onSearchChange = _this$props6.onSearchChange;
      var open = _this.state.open;

      var newQuery = e.target.value;

      if (onSearchChange) onSearchChange(e, newQuery);

      // open search dropdown on search query
      if (search && newQuery && !open) _this.open();

      _this.setState({
        selectedIndex: 0,
        searchQuery: newQuery
      });
    }, _this.getMenuOptions = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.options;
      var _this$props7 = _this.props,
          multiple = _this$props7.multiple,
          search = _this$props7.search,
          allowAdditions = _this$props7.allowAdditions,
          additionPosition = _this$props7.additionPosition,
          additionLabel = _this$props7.additionLabel;
      var searchQuery = _this.state.searchQuery;


      var filteredOptions = options;

      // filter out active options
      if (multiple) {
        filteredOptions = _filter(filteredOptions, function (opt) {
          return !_includes(value, opt.value);
        });
      }

      // filter by search query
      if (search && searchQuery) {
        if (_isFunction(search)) {
          filteredOptions = search(filteredOptions, searchQuery);
        } else {
          var re = new RegExp(_escapeRegExp(searchQuery), 'i');
          filteredOptions = _filter(filteredOptions, function (opt) {
            return re.test(opt.text);
          });
        }
      }

      // insert the "add" item
      if (allowAdditions && search && searchQuery && !_some(filteredOptions, { text: searchQuery })) {
        var additionLabelElement = React.isValidElement(additionLabel) ? React.cloneElement(additionLabel, { key: 'label' }) : additionLabel || '';

        var addItem = {
          // by using an array, we can pass multiple elements, but when doing so
          // we must specify a `key` for React to know which one is which
          text: [additionLabelElement, React.createElement(
            'b',
            { key: 'addition' },
            searchQuery
          )],
          value: searchQuery,
          className: 'addition',
          'data-additional': true
        };
        if (additionPosition === 'top') filteredOptions.unshift(addItem);else filteredOptions.push(addItem);
      }

      return filteredOptions;
    }, _this.getSelectedItem = function () {
      var selectedIndex = _this.state.selectedIndex;

      var options = _this.getMenuOptions();

      return _get(options, '[' + selectedIndex + ']');
    }, _this.getEnabledIndices = function (givenOptions) {
      var options = givenOptions || _this.getMenuOptions();

      return _reduce(options, function (memo, item, index) {
        if (!item.disabled) memo.push(index);
        return memo;
      }, []);
    }, _this.getItemByValue = function (value) {
      var options = _this.props.options;


      return _find(options, { value: value });
    }, _this.getMenuItemIndexByValue = function (value, givenOptions) {
      var options = givenOptions || _this.getMenuOptions();

      return _findIndex(options, ['value', value]);
    }, _this.getDropdownAriaOptions = function (ElementType) {
      var _this$props8 = _this.props,
          loading = _this$props8.loading,
          disabled = _this$props8.disabled,
          search = _this$props8.search,
          multiple = _this$props8.multiple;
      var open = _this.state.open;

      var ariaOptions = {
        role: search ? 'combobox' : 'listbox',
        'aria-busy': loading,
        'aria-disabled': disabled,
        'aria-expanded': !!open
      };
      if (ariaOptions.role === 'listbox') {
        ariaOptions['aria-multiselectable'] = multiple;
      }
      return ariaOptions;
    }, _this.setValue = function (value) {
      debug('setValue()');
      debug('value', value);
      var newState = {
        searchQuery: ''
      };

      var _this$props9 = _this.props,
          multiple = _this$props9.multiple,
          search = _this$props9.search;

      if (multiple && search && _this.searchRef) _this.searchRef.focus();

      _this.trySetState({ value: value }, newState);
      _this.setSelectedIndex(value);
    }, _this.setSelectedIndex = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
      var optionsProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.options;
      var multiple = _this.props.multiple;
      var selectedIndex = _this.state.selectedIndex;

      var options = _this.getMenuOptions(value, optionsProps);
      var enabledIndicies = _this.getEnabledIndices(options);

      var newSelectedIndex = void 0;

      // update the selected index
      if (!selectedIndex || selectedIndex < 0) {
        var firstIndex = enabledIndicies[0];

        // Select the currently active item, if none, use the first item.
        // Multiple selects remove active items from the list,
        // their initial selected index should be 0.
        newSelectedIndex = multiple ? firstIndex : _this.getMenuItemIndexByValue(value, options) || enabledIndicies[0];
      } else if (multiple) {
        // multiple selects remove options from the menu as they are made active
        // keep the selected index within range of the remaining items
        if (selectedIndex >= options.length - 1) {
          newSelectedIndex = enabledIndicies[enabledIndicies.length - 1];
        }
      } else {
        var activeIndex = _this.getMenuItemIndexByValue(value, options);

        // regular selects can only have one active item
        // set the selected index to the currently active item
        newSelectedIndex = _includes(enabledIndicies, activeIndex) ? activeIndex : undefined;
      }

      if (!newSelectedIndex || newSelectedIndex < 0) {
        newSelectedIndex = enabledIndicies[0];
      }

      _this.setState({ selectedIndex: newSelectedIndex });
    }, _this.handleLabelClick = function (e, labelProps) {
      debug('handleLabelClick()');
      // prevent focusing search input on click
      e.stopPropagation();

      _this.setState({ selectedLabel: labelProps.value });

      var onLabelClick = _this.props.onLabelClick;

      if (onLabelClick) onLabelClick(e, labelProps);
    }, _this.handleLabelRemove = function (e, labelProps) {
      debug('handleLabelRemove()');
      // prevent focusing search input on click
      e.stopPropagation();
      var value = _this.state.value;

      var newValue = _without(value, labelProps.value);
      debug('label props:', labelProps);
      debug('current value:', value);
      debug('remove value:', labelProps.value);
      debug('new value:', newValue);

      _this.setValue(newValue);
      _this.handleChange(e, newValue);
    }, _this.moveSelectionBy = function (offset) {
      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.selectedIndex;

      debug('moveSelectionBy()');
      debug('offset: ' + offset);

      var options = _this.getMenuOptions();
      var lastIndex = options.length - 1;

      // Prevent infinite loop
      if (_every(options, 'disabled')) return;

      // next is after last, wrap to beginning
      // next is before first, wrap to end
      var nextIndex = startIndex + offset;
      if (nextIndex > lastIndex) nextIndex = 0;else if (nextIndex < 0) nextIndex = lastIndex;

      if (options[nextIndex].disabled) return _this.moveSelectionBy(offset, nextIndex);

      _this.setState({ selectedIndex: nextIndex });
      _this.scrollSelectedItemIntoView();
    }, _this.handleSearchRef = function (c) {
      return _this.searchRef = c;
    }, _this.handleSizerRef = function (c) {
      return _this.sizerRef = c;
    }, _this.handleRef = function (c) {
      return _this.ref = c;
    }, _this.scrollSelectedItemIntoView = function () {
      debug('scrollSelectedItemIntoView()');
      var menu = _this.ref.querySelector('.menu.visible');
      var item = menu.querySelector('.item.selected');
      debug('menu: ' + menu);
      debug('item: ' + item);
      var isOutOfUpperView = item.offsetTop < menu.scrollTop;
      var isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

      if (isOutOfUpperView) {
        menu.scrollTop = item.offsetTop;
      } else if (isOutOfLowerView) {
        menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
      }
    }, _this.open = function (e) {
      debug('open()');

      var _this$props10 = _this.props,
          disabled = _this$props10.disabled,
          onOpen = _this$props10.onOpen,
          search = _this$props10.search;

      if (disabled) return;
      if (search && _this.searchRef) _this.searchRef.focus();
      if (onOpen) onOpen(e, _this.props);

      _this.trySetState({ open: true });
    }, _this.close = function (e) {
      debug('close()');

      var onClose = _this.props.onClose;

      if (onClose) onClose(e, _this.props);

      _this.trySetState({ open: false });
    }, _this.handleClose = function () {
      debug('handleClose()');
      var hasSearchFocus = document.activeElement === _this.searchRef;
      var hasDropdownFocus = document.activeElement === _this.ref;
      var hasFocus = hasSearchFocus || hasDropdownFocus;
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
      // Blur the Dropdown on close so it is blurred after selecting an item.
      // This is to prevent it from re-opening when switching tabs after selecting an item.
      if (!hasSearchFocus) {
        _this.ref.blur();
      }

      // We need to keep the virtual model in sync with the browser focus change
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/692
      _this.setState({ focus: hasFocus });
    }, _this.toggle = function (e) {
      return _this.state.open ? _this.close(e) : _this.open(e);
    }, _this.renderText = function () {
      var _this$props11 = _this.props,
          multiple = _this$props11.multiple,
          placeholder = _this$props11.placeholder,
          search = _this$props11.search,
          text = _this$props11.text;
      var _this$state2 = _this.state,
          searchQuery = _this$state2.searchQuery,
          value = _this$state2.value,
          open = _this$state2.open;

      var hasValue = multiple ? !_isEmpty(value) : !_isNil(value) && value !== '';

      var classes = cx(placeholder && !hasValue && 'default', 'text', search && searchQuery && 'filtered');
      var _text = placeholder;
      if (searchQuery) {
        _text = null;
      } else if (text) {
        _text = text;
      } else if (open && !multiple) {
        _text = _get(_this.getSelectedItem(), 'text');
      } else if (hasValue) {
        _text = _get(_this.getItemByValue(value), 'text');
      }

      return React.createElement(
        'div',
        { className: classes },
        _text
      );
    }, _this.renderHiddenInput = function () {
      debug('renderHiddenInput()');
      var value = _this.state.value;
      var _this$props12 = _this.props,
          multiple = _this$props12.multiple,
          name = _this$props12.name,
          options = _this$props12.options,
          selection = _this$props12.selection;

      debug('name:      ' + name);
      debug('selection: ' + selection);
      debug('value:     ' + value);
      if (!selection) return null;

      // a dropdown without an active item will have an empty string value
      return React.createElement(
        'select',
        { type: 'hidden', 'aria-hidden': 'true', name: name, value: value, multiple: multiple },
        React.createElement('option', { value: '' }),
        _map(options, function (option) {
          return React.createElement(
            'option',
            { key: option.value, value: option.value },
            option.text
          );
        })
      );
    }, _this.renderSearchInput = function () {
      var _this$props13 = _this.props,
          disabled = _this$props13.disabled,
          search = _this$props13.search,
          name = _this$props13.name,
          tabIndex = _this$props13.tabIndex;
      var searchQuery = _this.state.searchQuery;


      if (!search) return null;

      // tabIndex
      var computedTabIndex = void 0;
      if (!_isNil(tabIndex)) computedTabIndex = tabIndex;else computedTabIndex = disabled ? -1 : 0;

      // resize the search input, temporarily show the sizer so we can measure it
      var searchWidth = void 0;
      if (_this.sizerRef && searchQuery) {
        _this.sizerRef.style.display = 'inline';
        _this.sizerRef.textContent = searchQuery;
        searchWidth = Math.ceil(_this.sizerRef.getBoundingClientRect().width);
        _this.sizerRef.style.removeProperty('display');
      }

      return React.createElement('input', {
        value: searchQuery,
        type: 'text',
        'aria-autocomplete': 'list',
        onChange: _this.handleSearchChange,
        className: 'search',
        name: [name, 'search'].join('-'),
        autoComplete: 'off',
        tabIndex: computedTabIndex,
        style: { width: searchWidth },
        ref: _this.handleSearchRef
      });
    }, _this.renderSearchSizer = function () {
      var _this$props14 = _this.props,
          search = _this$props14.search,
          multiple = _this$props14.multiple;


      if (!(search && multiple)) return null;
      return React.createElement('span', { className: 'sizer', ref: _this.handleSizerRef });
    }, _this.renderLabels = function () {
      debug('renderLabels()');
      var _this$props15 = _this.props,
          multiple = _this$props15.multiple,
          renderLabel = _this$props15.renderLabel;
      var _this$state3 = _this.state,
          selectedLabel = _this$state3.selectedLabel,
          value = _this$state3.value;

      if (!multiple || _isEmpty(value)) {
        return;
      }
      var selectedItems = _map(value, _this.getItemByValue);
      debug('selectedItems', selectedItems);

      // if no item could be found for a given state value the selected item will be undefined
      // compact the selectedItems so we only have actual objects left
      return _map(_compact(selectedItems), function (item, index) {
        var defaultLabelProps = {
          active: item.value === selectedLabel,
          as: 'a',
          key: item.value,
          onClick: _this.handleLabelClick,
          onRemove: _this.handleLabelRemove,
          value: item.value
        };

        return Label.create(renderLabel(item, index, defaultLabelProps), defaultLabelProps);
      });
    }, _this.renderOptions = function () {
      var _this$props16 = _this.props,
          multiple = _this$props16.multiple,
          search = _this$props16.search,
          noResultsMessage = _this$props16.noResultsMessage;
      var _this$state4 = _this.state,
          selectedIndex = _this$state4.selectedIndex,
          value = _this$state4.value;

      var options = _this.getMenuOptions();

      if (noResultsMessage !== null && search && _isEmpty(options)) {
        return React.createElement(
          'div',
          { className: 'message' },
          noResultsMessage
        );
      }

      var isActive = multiple ? function (optValue) {
        return _includes(value, optValue);
      } : function (optValue) {
        return optValue === value;
      };

      return _map(options, function (opt, i) {
        return React.createElement(DropdownItem, _extends({
          key: opt.value + '-' + i,
          active: isActive(opt.value),
          onClick: _this.handleItemClick,
          selected: selectedIndex === i
        }, opt, {
          // Needed for handling click events on disabled items
          style: _extends({}, opt.style, { pointerEvents: 'all' })
        }));
      });
    }, _this.renderMenu = function () {
      var _this$props17 = _this.props,
          children = _this$props17.children,
          header = _this$props17.header;
      var open = _this.state.open;

      var menuClasses = open ? 'visible' : '';
      var ariaOptions = _this.getDropdownMenuAriaOptions();

      // single menu child
      if (!_isNil(children)) {
        var menuChild = Children.only(children);
        var className = cx(menuClasses, menuChild.props.className);

        return cloneElement(menuChild, _extends({ className: className }, ariaOptions));
      }

      return React.createElement(
        DropdownMenu,
        _extends({}, ariaOptions, { className: menuClasses }),
        createShorthand(DropdownHeader, function (val) {
          return { content: val };
        }, header),
        _this.renderOptions()
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropdown, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_get2(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), 'componentWillMount', this)) _get2(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), 'componentWillMount', this).call(this);
      debug('componentWillMount()');
      var _state = this.state,
          open = _state.open,
          value = _state.value;


      this.setValue(value);
      if (open) this.open();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _get2(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
      debug('componentWillReceiveProps()');
      // TODO objectDiff still runs in prod, stop it
      debug('to props:', objectDiff(this.props, nextProps));

      /* eslint-disable no-console */
      if (process.env.NODE_ENV !== 'production') {
        // in development, validate value type matches dropdown type
        var isNextValueArray = Array.isArray(nextProps.value);
        var hasValue = _has(nextProps, 'value');

        if (hasValue && nextProps.multiple && !isNextValueArray) {
          console.error('Dropdown `value` must be an array when `multiple` is set.' + (' Received type: `' + Object.prototype.toString.call(nextProps.value) + '`.'));
        } else if (hasValue && !nextProps.multiple && isNextValueArray) {
          console.error('Dropdown `value` must not be an array when `multiple` is not set.' + ' Either set `multiple={true}` or use a string or number value.');
        }
      }
      /* eslint-enable no-console */

      if (!_isEqual(nextProps.value, this.props.value)) {
        debug('value changed, setting', nextProps.value);
        this.setValue(nextProps.value);
      }

      if (!_isEqual(nextProps.options, this.props.options)) {
        this.setSelectedIndex(undefined, nextProps.options);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // eslint-disable-line complexity
      debug('componentDidUpdate()');
      // TODO objectDiff still runs in prod, stop it
      debug('to state:', objectDiff(prevState, this.state));

      // Do not access document when server side rendering
      if (!isBrowser) return;

      // focused / blurred
      if (!prevState.focus && this.state.focus) {
        debug('dropdown focused');
        if (!this.isMouseDown) {
          var openOnFocus = this.props.openOnFocus;

          debug('mouse is not down, opening');
          if (openOnFocus) this.open();
        }
        if (!this.state.open) {
          document.addEventListener('keydown', this.openOnArrow);
          document.addEventListener('keydown', this.openOnSpace);
        } else {
          document.addEventListener('keydown', this.moveSelectionOnKeyDown);
          document.addEventListener('keydown', this.selectItemOnEnter);
        }
        document.addEventListener('keydown', this.removeItemOnBackspace);
      } else if (prevState.focus && !this.state.focus) {
        debug('dropdown blurred');
        var closeOnBlur = this.props.closeOnBlur;

        if (!this.isMouseDown && closeOnBlur) {
          debug('mouse is not down and closeOnBlur=true, closing');
          this.close();
        }
        document.removeEventListener('keydown', this.openOnArrow);
        document.removeEventListener('keydown', this.openOnSpace);
        document.removeEventListener('keydown', this.moveSelectionOnKeyDown);
        document.removeEventListener('keydown', this.selectItemOnEnter);
        document.removeEventListener('keydown', this.removeItemOnBackspace);
      }

      // opened / closed
      if (!prevState.open && this.state.open) {
        debug('dropdown opened');
        document.addEventListener('keydown', this.closeOnEscape);
        document.addEventListener('keydown', this.moveSelectionOnKeyDown);
        document.addEventListener('keydown', this.selectItemOnEnter);
        document.addEventListener('keydown', this.removeItemOnBackspace);
        document.addEventListener('click', this.closeOnDocumentClick);
        document.removeEventListener('keydown', this.openOnArrow);
        document.removeEventListener('keydown', this.openOnSpace);
      } else if (prevState.open && !this.state.open) {
        debug('dropdown closed');
        this.handleClose();
        document.removeEventListener('keydown', this.closeOnEscape);
        document.removeEventListener('keydown', this.moveSelectionOnKeyDown);
        document.removeEventListener('keydown', this.selectItemOnEnter);
        document.removeEventListener('click', this.closeOnDocumentClick);
        if (!this.state.focus) {
          document.removeEventListener('keydown', this.removeItemOnBackspace);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      debug('componentWillUnmount()');

      // Do not access document when server side rendering
      if (!isBrowser) return;

      document.removeEventListener('keydown', this.openOnArrow);
      document.removeEventListener('keydown', this.openOnSpace);
      document.removeEventListener('keydown', this.moveSelectionOnKeyDown);
      document.removeEventListener('keydown', this.selectItemOnEnter);
      document.removeEventListener('keydown', this.removeItemOnBackspace);
      document.removeEventListener('keydown', this.closeOnEscape);
      document.removeEventListener('click', this.closeOnDocumentClick);
    }

    // ----------------------------------------
    // Document Event Handlers
    // ----------------------------------------

    // onChange needs to receive a value
    // can't rely on props.value if we are controlled


    // ----------------------------------------
    // Component Event Handlers
    // ----------------------------------------

    // ----------------------------------------
    // Getters
    // ----------------------------------------

    // There are times when we need to calculate the options based on a value
    // that hasn't yet been persisted to state.

  }, {
    key: 'getDropdownMenuAriaOptions',
    value: function getDropdownMenuAriaOptions() {
      var _props = this.props,
          search = _props.search,
          multiple = _props.multiple;

      var ariaOptions = {};

      if (search) {
        ariaOptions['aria-multiselectable'] = multiple;
        ariaOptions.role = 'listbox';
      }
      return ariaOptions;
    }

    // ----------------------------------------
    // Setters
    // ----------------------------------------

    // ----------------------------------------
    // Refs
    // ----------------------------------------

    // ----------------------------------------
    // Behavior
    // ----------------------------------------

    // ----------------------------------------
    // Render
    // ----------------------------------------

  }, {
    key: 'render',
    value: function render() {
      debug('render()');
      debug('props', this.props);
      debug('state', this.state);
      var open = this.state.open;
      var _props2 = this.props,
          basic = _props2.basic,
          button = _props2.button,
          className = _props2.className,
          compact = _props2.compact,
          fluid = _props2.fluid,
          floating = _props2.floating,
          icon = _props2.icon,
          inline = _props2.inline,
          item = _props2.item,
          labeled = _props2.labeled,
          multiple = _props2.multiple,
          pointing = _props2.pointing,
          search = _props2.search,
          selection = _props2.selection,
          simple = _props2.simple,
          loading = _props2.loading,
          error = _props2.error,
          disabled = _props2.disabled,
          scrolling = _props2.scrolling,
          tabIndex = _props2.tabIndex,
          trigger = _props2.trigger;

      // Classes

      var classes = cx('ui', useKeyOnly(open, 'active visible'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(loading, 'loading'), useKeyOnly(basic, 'basic'), useKeyOnly(button, 'button'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(floating, 'floating'), useKeyOnly(inline, 'inline'),
      // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
      // TODO: the icon class is only required when a dropdown is a button
      // useKeyOnly(icon, 'icon'),
      useKeyOnly(labeled, 'labeled'), useKeyOnly(item, 'item'), useKeyOnly(multiple, 'multiple'), useKeyOnly(search, 'search'), useKeyOnly(selection, 'selection'), useKeyOnly(simple, 'simple'), useKeyOnly(scrolling, 'scrolling'), useKeyOrValueAndKey(pointing, 'pointing'), className, 'dropdown');
      var rest = getUnhandledProps(Dropdown, this.props);
      var ElementType = getElementType(Dropdown, this.props);
      var ariaOptions = this.getDropdownAriaOptions(ElementType, this.props);

      var computedTabIndex = void 0;
      if (!_isNil(tabIndex)) {
        computedTabIndex = tabIndex;
      } else if (!search) {
        // don't set a root node tabIndex as the search input has its own tabIndex
        computedTabIndex = disabled ? -1 : 0;
      }

      return React.createElement(
        ElementType,
        _extends({}, rest, ariaOptions, {
          className: classes,
          onBlur: this.handleBlur,
          onClick: this.handleClick,
          onMouseDown: this.handleMouseDown,
          onFocus: this.handleFocus,
          onChange: this.handleChange,
          tabIndex: computedTabIndex,
          ref: this.handleRef
        }),
        this.renderHiddenInput(),
        this.renderLabels(),
        this.renderSearchInput(),
        this.renderSearchSizer(),
        trigger || this.renderText(),
        Icon.create(icon),
        this.renderMenu()
      );
    }
  }]);

  return Dropdown;
}(Component);

Dropdown.defaultProps = {
  additionLabel: 'Add ',
  additionPosition: 'top',
  icon: 'dropdown',
  noResultsMessage: 'No results found.',
  renderLabel: function renderLabel(_ref2) {
    var text = _ref2.text;
    return text;
  },
  selectOnBlur: true,
  openOnFocus: true,
  closeOnBlur: true
};
Dropdown.autoControlledProps = ['open', 'value', 'selectedLabel'];
Dropdown._meta = {
  name: 'Dropdown',
  type: META.TYPES.MODULE
};
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
export default Dropdown;
process.env.NODE_ENV !== "production" ? Dropdown.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Label prefixed to an option added by a user. */
  additionLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
  additionPosition: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Allow user additions to the list of options (boolean).
   * Requires the use of `selection`, `options` and `search`.
   */
  allowAdditions: customPropTypes.every([customPropTypes.demand(['options', 'selection', 'search']), PropTypes.bool]),

  /** A Dropdown can reduce its complexity. */
  basic: PropTypes.bool,

  /** Format the Dropdown to appear as a button. */
  button: PropTypes.bool,

  /** Primary content. */
  children: customPropTypes.every([customPropTypes.disallow(['options', 'selection']), customPropTypes.givenProps({ children: PropTypes.any.isRequired }, React.PropTypes.element.isRequired)]),

  /** Additional classes. */
  className: PropTypes.string,

  /** Whether or not the menu should close when the dropdown is blurred. */
  closeOnBlur: PropTypes.bool,

  /**
   * Whether or not the menu should close when a value is selected from the dropdown.
   * By default, multiple selection dropdowns will remain open on change, while single
   * selection dropdowns will close on change.
   */
  closeOnChange: PropTypes.bool,

  /** A compact dropdown has no minimum width. */
  compact: PropTypes.bool,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** Currently selected label in multi-select. */
  defaultSelectedLabel: customPropTypes.every([customPropTypes.demand(['multiple']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** Initial value or value array if multiple. */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),

  /** A disabled dropdown menu or item does not allow user interaction. */
  disabled: PropTypes.bool,

  /** An errored dropdown can alert a user to a problem. */
  error: PropTypes.bool,

  /** A dropdown menu can contain floated content. */
  floating: PropTypes.bool,

  /** A dropdown can take the full width of its parent */
  fluid: PropTypes.bool,

  /** A dropdown menu can contain a header. */
  header: PropTypes.node,

  /** Shorthand for Icon. */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

  /** A dropdown can be formatted to appear inline in other content. */
  inline: PropTypes.bool,

  /** A dropdown can be formatted as a Menu item. */
  item: PropTypes.bool,

  /** A dropdown can be labeled. */
  labeled: PropTypes.bool,

  /** A dropdown can show that it is currently loading data. */
  loading: PropTypes.bool,

  /** A selection dropdown can allow multiple selections. */
  multiple: PropTypes.bool,

  /** Name of the hidden input which holds the value. */
  name: PropTypes.string,

  /** Message to display when there are no results. */
  noResultsMessage: PropTypes.string,

  /**
   * Called when a user adds a new item. Use this to update the options list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the new item's value.
   */
  onAddItem: PropTypes.func,

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur: PropTypes.func,

  /**
   * Called when the user attempts to change the value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange: PropTypes.func,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus: PropTypes.func,

  /**
   * Called when a multi-select label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All label props.
   */
  onLabelClick: PropTypes.func,

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {string} value - Current value of search input.
   */
  onSearchChange: PropTypes.func,

  /** Controls whether or not the dropdown menu is displayed. */
  open: PropTypes.bool,

  /** Whether or not the menu should open when the dropdown is focused. */
  openOnFocus: PropTypes.bool,

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes))]),

  /** Placeholder text. */
  placeholder: PropTypes.string,

  /** A dropdown can be formatted so that its menu is pointing. */
  pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right'])]),

  /** A function that takes (data, index, defaultLabelProps) and returns shorthand for Label. */
  renderLabel: PropTypes.func,

  /** A dropdown can have its menu scroll. */
  scrolling: PropTypes.bool,

  /**
   * A selection dropdown can allow a user to search through a large list of choices.
   * Pass a function here to replace the default search.
   */
  search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  // TODO 'searchInMenu' or 'search='in menu' or ???  How to handle this markup and functionality?

  /** Define whether the highlighted item should be selected on blur. */
  selectOnBlur: PropTypes.bool,

  /** Currently selected label in multi-select. */
  selectedLabel: customPropTypes.every([customPropTypes.demand(['multiple']), PropTypes.oneOfType([PropTypes.string, PropTypes.number])]),

  /** A dropdown can be used to select between choices in a form. */
  selection: customPropTypes.every([customPropTypes.disallow(['children']), customPropTypes.demand(['options']), PropTypes.bool]),

  /** A simple dropdown can open without Javascript. */
  simple: PropTypes.bool,

  /** A dropdown can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The text displayed in the dropdown, usually for the active item. */
  text: PropTypes.string,

  /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
  trigger: customPropTypes.every([customPropTypes.disallow(['selection', 'text']), PropTypes.node]),

  /** Current value or value array if multiple. Creates a controlled component. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))])
} : void 0;
Dropdown.handledProps = ['additionLabel', 'additionPosition', 'allowAdditions', 'as', 'basic', 'button', 'children', 'className', 'closeOnBlur', 'closeOnChange', 'compact', 'defaultOpen', 'defaultSelectedLabel', 'defaultValue', 'disabled', 'error', 'floating', 'fluid', 'header', 'icon', 'inline', 'item', 'labeled', 'loading', 'multiple', 'name', 'noResultsMessage', 'onAddItem', 'onBlur', 'onChange', 'onClick', 'onClose', 'onFocus', 'onLabelClick', 'onMouseDown', 'onOpen', 'onSearchChange', 'open', 'openOnFocus', 'options', 'placeholder', 'pointing', 'renderLabel', 'scrolling', 'search', 'selectOnBlur', 'selectedLabel', 'selection', 'simple', 'tabIndex', 'text', 'trigger', 'value'];