import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import * as select from '../select';
import { queryViaSelector } from '../utils';

/**
 * Fires onSearch function
 */
export function fireSearch(container: IContainer, value: any) {
    select.fireSearch(container, value);
}

/**
 * Fires onDropdownVisibleChange function.
 * Meanwhile, open Dropdown
 */
export function fireOpen(container: IContainer) {
    select.fireOpen(container);
}

/**
 * Fires onSelect function
 */
export function fireSelect(container: IContainer, index: number) {
    select.fireSelect(container, index);
}

/**
 * Fires onFocus function
 */
export function fireFocus(container: IContainer) {
    select.fireFocus(container);
}

/**
 * Fires onBlur function
 */
export function fireBlur(container: IContainer) {
    select.fireBlur(container);
}

/**
 * Fires onClear function
 */
export function fireClear(container: IContainer) {
    select.fireClear(container);
}

/**
 * Returns the `index` container of AutoComplete
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select-auto-complete`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns input element of AutoComplete
 */
export function queryInput(container: IContainer, index = 0) {
    return select.queryInput(container, index);
}

/**
 * Returns selector element of AutoComplete
 */
export function querySelector(container: IContainer, index = 0) {
    return select.querySelector(container, index);
}

/**
 * Returns option element of AutoComplete
 */
export function queryOption(container: IContainer, index = 0) {
    return select.queryOption(container, index);
}

/**
 * Returns clear icon element of AutoComplete
 */
export function queryClear(container: IContainer, index = 0) {
    return select.queryClear(container, index);
}
