import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

export function fireFocus(container: IContainer) {
    const selector = 'input';
    const inputEl = queryViaSelector(container, selector);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.focus(inputEl);
}

export function fireBlur(container: IContainer) {
    const selector = 'input';
    const inputEl = queryViaSelector(container, selector);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.blur(inputEl);
}

export function fireChange(container: IContainer, value: any) {
    const selector = 'input';
    const inputEl = queryViaSelector(container, selector);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.change(inputEl, { target: { value } });
}

export function fireClear(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-input-clear-icon`;
    const ele =
        container instanceof HTMLInputElement
            ? container.parentElement?.querySelector(selector)
            : queryViaSelector(container, selector);

    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

export function firePressEnter(container: IContainer) {
    const selector = 'input';
    const inputEl = queryViaSelector(container, selector);
    if (!inputEl) throw failedQuerySelector(selector);
    fireEvent.keyDown(inputEl, { key: 'Enter' });
}

export function query(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-input`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

export * as textarea from './textarea';
