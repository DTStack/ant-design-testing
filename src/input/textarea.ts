import { act, fireEvent } from '@testing-library/react';
import { _rs as onResize } from 'rc-resize-observer/lib/utils/observerUtil';

import type { IContainer } from '../interface';
import { failedQuerySelector, queryViaSelector } from '../utils';
import { fireClear as inputFireClear } from '.';

/**
 * Fires onFocus function
 */
export function fireFocus(container: IContainer) {
    const selector = 'textarea';
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.focus(textareaEl);
}

/**
 * Fires onBlur function
 */
export function fireBlur(container: IContainer) {
    const selector = 'textarea';
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.blur(textareaEl);
}

/**
 * Fires onChange functionƒ
 */
export function fireChange(container: IContainer, value: any) {
    const selector = 'textarea';
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
    const selector = 'textarea';
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    fireEvent.keyDown(textareaEl, { keyCode: 13 });
}

/**
 * Fires onResize function
 */
export function fireResize(container: IContainer, rect: DOMRect) {
    const selector = 'textarea';
    const textareaEl = query(container);
    if (!textareaEl) throw failedQuerySelector(selector);
    const originGetBoundingClientRect = textareaEl.getBoundingClientRect;
    textareaEl.getBoundingClientRect = () => rect;

    act(() => {
        onResize([{ target: textareaEl } as unknown as ResizeObserverEntry]);
    });

    textareaEl.getBoundingClientRect = originGetBoundingClientRect;
}

/**
 * Returns the textarea element
 */
export function query(container: IContainer, index = 0) {
    const selector = 'textarea';
    return queryViaSelector(container, selector, index);
}
