import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    query,
    queryInput,
    queryDropdown,
    queryOption,
    querySelectorWrapper,
    queryClear,
    fireOpen,
    fireSearch,
    fireSelect,
    fireTreeExpand,
};

/**
 * Fires onDropdownVisibleChange function
 */
export function fireOpen(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-tree-select .${getProvider('prefixCls')}-select-selector`;
    const ele = querySelectorWrapper(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

/**
 * Fires onSearch function
 */
export function fireSearch(container: IContainer, value: any) {
    const selector = 'input';
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

/**
 * Fires onSelect function
 *
 * Need expand tree node first
 */
export function fireSelect(container: IContainer, index: number) {
    const selector = `span.${getProvider('prefixCls')}-select-tree-node-content-wrapper`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onTreeExpand function
 */
export function fireTreeExpand(container: IContainer, index: number) {
    const selector = `span.${getProvider('prefixCls')}-select-tree-node-content-wrapper`;
    const switcher = `.${getProvider('prefixCls')}-select-tree-switcher`;
    const ele = container.querySelectorAll(selector).item(index)?.parentElement?.querySelector(switcher);
    if (!ele) throw failedQuerySelector(`${selector}[${index}]'s parentElement ${switcher}`);
    fireEvent.click(ele);
}

/**
 * Returns the `index` element of TreeSelect
 * @param index default is 0
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tree-select`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` element of Input inside TreeSelect
 * @param index default is 0
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tree-select input.${getProvider(
        'prefixCls'
    )}-select-selection-search-input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` Selector dom inside Select,
 * the main element to call fireOpen
 * @param index default is 0
 */
export function querySelectorWrapper(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tree-select .${getProvider('prefixCls')}-select-selector`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the Tree Select Dropdown which is not hidden
 */
export function queryDropdown(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-tree-select-dropdown:not(.${getProvider(
        'prefixCls'
    )}-select-dropdown-hidden)`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` Option for Select
 *
 * Need expand tree node first
 *
 * @param index default is 0
 */
export function queryOption(container: IContainer, index = 0) {
    const selector = `span.${getProvider('prefixCls')}-select-tree-node-content-wrapper`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` clear icon's container
 */
export function queryClear(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tree-select .${getProvider('prefixCls')}-select-clear`;
    const ele = queryViaSelector<HTMLSpanElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}
