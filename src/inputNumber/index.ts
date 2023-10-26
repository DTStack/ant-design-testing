import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, value: any) {
    const selector = `input.${getProvider('prefixCls')}-input-number-input`;
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

/**
 * Fires onStep function
 */
export function fireStepUp(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-input-number-handler-up`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

/**
 * Fires onStep function
 */
export function fireStepDown(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-input-number-handler-down`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

/**
 * Fires onPressEnter function
 */
export function firePressEnter(container: IContainer) {
    const selector = `input.${getProvider('prefixCls')}-input-number`;
    const inputEl = query(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.keyDown(inputEl, { key: 'Enter', keyCode: 13, which: 13 });
}

/**
 * Fires onFocus function
 */
export function fireFocus(container: IContainer) {
    const selector = `input.${getProvider('prefixCls')}-input-number-input`;
    const inputEl = queryInput(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.focus(inputEl);
}

/**
 * Fires onBlur function
 */
export function fireBlur(container: IContainer) {
    const selector = `input.${getProvider('prefixCls')}-input-number-input`;
    const inputEl = queryInput(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.blur(inputEl);
}

/**
 * Returns the container of InputNumber
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-input-number`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the input element of InputNumber
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = `input.${getProvider('prefixCls')}-input-number-input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}
