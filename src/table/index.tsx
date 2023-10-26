import { fireEvent } from '@testing-library/react';

import * as checkbox from '../checkbox';
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires rowSelection's onChange function
 */
export function fireSelect(container: IContainer, index: number) {
    const row = queryRow(container, index);
    if (!row) throw failedQuerySelector(`.${getProvider('prefixCls')}-table-row`);
    const ele = checkbox.query(row);
    if (!ele) throw failedQuerySelector(`.${getProvider('prefixCls')}-checkbox-input`);
    fireEvent.click(ele);
}

/**
 * Fires rowSelection's onSelectAll function
 */
export function fireSelectAll(container: IContainer) {
    const header = queryHeader(container);
    if (!header) throw failedQuerySelector('table');
    const ele = checkbox.query(header);
    if (!ele) throw failedQuerySelector(`.${getProvider('prefixCls')}-checkbox-input`);
    fireEvent.click(ele);
}

/**
 * Fires expandable's onExpand function
 */
export function fireExpand(container: IContainer, index: number) {
    const selectors = [
        `.${getProvider('prefixCls')}-table-row`,
        `button.${getProvider('prefixCls')}-table-row-expand-icon`,
    ];
    const ele = queryViaSelectors(container, selectors, [index]);
    if (!ele) throw failedQuerySelector(`${selectors[0]}[${index}] ${selectors[1]}`);
    fireEvent.click(ele);
}

/**
 * Returns the wrapper element for Table
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-table-wrapper`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the header element for Table
 */
export function queryHeader(container: IContainer, index = 0) {
    const wrapper = query(container, index);
    if (!wrapper) return null;
    const fixedHeader = wrapper.classList.contains(`.${getProvider('prefixCls')}-table-fixed-header`);
    const selector = fixedHeader
        ? `.${getProvider('prefixCls')}-table-header`
        : `.${getProvider('prefixCls')}-table-thead`;
    const ele = queryViaSelector(container, selector);
    return ele;
}

/**
 * Returns the body element for Table
 */
export function queryBody(container: IContainer, index = 0) {
    const wrapper = query(container, index);
    if (!wrapper) return null;
    const fixedHeader = wrapper.classList.contains(`.${getProvider('prefixCls')}-table-fixed-header`);
    const selector = fixedHeader
        ? `.${getProvider('prefixCls')}-table-body`
        : `.${getProvider('prefixCls')}-table-tbody`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the row element for Table
 */
export function queryRow(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-table-row`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
