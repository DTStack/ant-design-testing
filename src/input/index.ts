import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onFocus function
 */
export function fireFocus(container: IContainer) {
    const selector = 'input';
    const inputEl = query(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.focus(inputEl);
}

/**
 * Fires onBlur function
 */
export function fireBlur(container: IContainer) {
    const selector = 'input';
    const inputEl = query(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.blur(inputEl);
}

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, value: any) {
    const selector = 'input';
    const inputEl = query(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.change(inputEl, { target: { value } });
}

/**
 * Fires onClear function
 */
export function fireClear(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-input-clear-icon`;
    const ele =
        container instanceof HTMLInputElement
            ? query(container.parentElement as HTMLElement)
            : queryViaSelector(container, selector);

    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onPressEnter function
 */
export function firePressEnter(container: IContainer) {
    const selector = 'input';
    const inputEl = query(container);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.keyDown(inputEl, { key: 'Enter' });
}

/**
 * Returns the input element
 */
export function query(container: IContainer, index = 0) {
    const selector = `input.${getProvider('prefixCls')}-input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}

export * as textarea from './textarea';
