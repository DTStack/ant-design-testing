import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onMouseEnter function
 */
export function fireMouseEnter(container: IContainer) {
    const ele = queryGroup(container) || query(container);
    if (!ele) throw failedQuerySelector('radio');
    fireEvent.mouseEnter(ele);
}

/**
 * Fires onMouseLeave function
 */
export function fireMouseLeave(container: IContainer) {
    const ele = queryGroup(container) || query(container);
    if (!ele) throw failedQuerySelector('radio');
    fireEvent.mouseLeave(ele);
}

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, index: number) {
    const ele = queryInput(container, index);
    if (!ele) throw failedQuerySelector(`input.${getProvider('prefixCls')}-radio-input`);
    fireEvent.click(ele);
}

/**
 * Returns the wrapper element for each Radio
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-radio-wrapper`;
    const ele = queryViaSelector<HTMLLabelElement>(container, selector, index);
    return ele;
}

/**
 * Returns the group element
 */
export function queryGroup(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-radio-group`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the input element in Radio
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = `input.${getProvider('prefixCls')}-radio-input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}
