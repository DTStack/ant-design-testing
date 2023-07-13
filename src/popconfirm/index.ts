import { act, fireEvent } from '@testing-library/react';

import * as button from '../button';
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, failedTriggerElement, queryViaSelector } from '../utils';

/**
 * Open popconfirm
 */
export function fireOpen(trigger: HTMLElement) {
    if (!trigger) throw failedTriggerElement();
    act(() => {
        jest.runAllTimers();
        fireEvent.click(trigger);
    });
}

/**
 * Fires onCancel function
 */
export function fireCancel(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-popover-buttons .${getProvider('prefixCls')}-btn`;
    const ele = queryCancelButton(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onConfirm function
 */
export function fireConfirm(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-popover-buttons .${getProvider('prefixCls')}-btn`;
    const ele = queryConfirmButton(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the container element
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-popover`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the buttons element
 */
export function queryButtons(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-popover-buttons`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the cancel button inside buttons
 */
export function queryCancelButton(container: IContainer, index = 0) {
    if (container instanceof HTMLButtonElement) {
        return container;
    }
    const ele = queryButtons(container, index);
    if (!ele) return null;
    return button.query(ele, 0);
}

/**
 * Returns the confirm button inside buttons
 */
export function queryConfirmButton(container: IContainer, index = 0) {
    if (container instanceof HTMLButtonElement) {
        return container;
    }
    const ele = queryButtons(container, index);
    if (!ele) return null;
    return button.query(ele, 1);
}
