import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';
import { fireClear as inputFireClear } from '.';

/**
 * Fires onFocus function
 */
export function fireFocus(container: IContainer) {
    const selector = `textarea.${getProvider('prefixCls')}-input`;
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.focus(textareaEl);
}

/**
 * Fires onBlur function
 */
export function fireBlur(container: IContainer) {
    const selector = `textarea.${getProvider('prefixCls')}-input`;
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.blur(textareaEl);
}

/**
 * Fires onChange functionƒ
 */
export function fireChange(container: IContainer, value: any) {
    const selector = `textarea.${getProvider('prefixCls')}-input`;
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.change(textareaEl, { target: { value } });
}

/**
 * Fires onClear function
 */
export function fireClear(container: IContainer) {
    // directly call input's fireClear
    inputFireClear(container);
}

/**
 * Fires onClear function
 */
export function firePressEnter(container: IContainer) {
    const selector = `textarea.${getProvider('prefixCls')}-input`;
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.keyDown(textareaEl, { keyCode: 13 });
}

/**
 * Returns the textarea element
 */
export function query(container: IContainer, index = 0) {
    const selector = `textarea.${getProvider('prefixCls')}-input`;
    return queryViaSelector(container, selector, index);
}
