import { act, fireEvent } from '@testing-library/react';

import * as button from '../button';
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, failedTriggerElement, mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    query,
    queryButtons,
    queryCancelButton,
    queryConfirmButton,
    fireCancel,
    fireConfirm,
};

/**
 * Open popconfirm
 */
export function fireOpen(trigger: HTMLElement) {
    if (!trigger) throw failedTriggerElement();
    jest.runAllTimers();
    act(() => {
        fireEvent.click(trigger);
    });
}

/**
 * Fires onCancel function
 */
export function fireCancel(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-popconfirm-buttons .${getProvider('prefixCls')}-btn`;
    const ele = queryCancelButton(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onConfirm function
 */
export function fireConfirm(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-popconfirm-buttons .${getProvider('prefixCls')}-btn`;
    const ele = queryConfirmButton(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the container element
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-popconfirm`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the buttons element
 */
export function queryButtons(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-popconfirm-buttons`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
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
