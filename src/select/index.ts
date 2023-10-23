import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires onSearch function
 */
export function fireSearch(container: IContainer, value: any) {
    const selector = `input.${getProvider('prefixCls')}-select-selection-search-input`;
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

/**
 * Fires onDropdownVisibleChange function.
 * Meanwhile, open Dropdown
 */
export function fireOpen(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-select-selector`;
    const ele = querySelector(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

/**
 * Fires onSelect function
 * @param container Be aware of the dropdown's renderRoot
 * @param index Select the `index` options
 */
export function fireSelect(container: IContainer, index: number) {
    const selector = `div.${getProvider('prefixCls')}-select-item-option-content`;
    const ele = queryOption(container, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onDeselect function, **ONLY** works for tag or multiply mode
 * @param index Deselect the `index` tag
 */
export function fireDeSelect(container: IContainer, index: number) {
    const selectors = [
        `.${getProvider('prefixCls')}-select-selection-item`,
        `.${getProvider('prefixCls')}-select-selection-item-remove`,
    ];
    const ele = queryViaSelectors(container, selectors, [index]);
    if (!ele) throw failedQuerySelector(`${selectors[0]}[${index}] ${selectors[1]}`);
    fireEvent.click(ele);
}

/**
 * Fires onFocus function
 */
export function fireFocus(container: IContainer) {
    const selector = `input.${getProvider('prefixCls')}-select-selection-search-input`;
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.focus(ele);
}

/**
 * Fires onBlur function
 */
export function fireBlur(container: IContainer) {
    const selector = `input.${getProvider('prefixCls')}-select-selection-search-input`;
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.blur(ele);
}

/**
 * Fires onClear function
 * @notice Be aware of value before call fireClear
 */
export function fireClear(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-select-clear`;
    const ele = queryClear(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

/**
 * Returns the `index` Select's container
 * @param index default is 0
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` Input inside Select
 * @param index default is 0
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = `input.${getProvider('prefixCls')}-select-selection-search-input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` Selector dom inside Select,
 * the main element to call fireOpen
 * @param index default is 0
 */
export function querySelector(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select-selector`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` dropdown's container for Select
 * @param index default is 0
 */
export function queryDropdown(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select-dropdown`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` Option for Select
 * @param index default is 0
 */
export function queryOption(container: IContainer, index = 0) {
    const selector = `div.${getProvider('prefixCls')}-select-item-option-content`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` clear icon's container
 */
export function queryClear(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select-clear`;
    const ele = queryViaSelector<HTMLSpanElement>(container, selector, index);
    return ele;
}
