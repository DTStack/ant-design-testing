import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { fireOpen as fireSelectOpen } from '../select';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onDropdownVisibleChange function
 */
export function fireOpen(container: IContainer) {
    fireSelectOpen(container);
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
