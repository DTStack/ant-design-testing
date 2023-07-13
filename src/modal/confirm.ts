import { act, fireEvent } from '@testing-library/react';

import * as button from '../button';
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedTriggerElement, queryViaSelector } from '../utils';
import * as modal from './';

/**
 * Open confirm
 * @prerequisite call `jest.useFakeTimers()`
 */
export function fireOpen(ele?: HTMLElement) {
    if (!ele) throw failedTriggerElement();

    act(() => {
        fireEvent.click(ele);
        jest.runAllTimers();
    });
}

/**
 * Fires onOk function
 */
export function fireOk(container: IContainer) {
    const ele = queryOkButton(container);
    if (!ele) throw failedTriggerElement();
    fireEvent.click(ele);
}

/**
 * Fires onCancel function
 */
export function fireCancel(container: IContainer) {
    const ele = queryCancelButton(container);
    if (!ele) throw failedTriggerElement();
    fireEvent.click(ele);
}

/**
 * Returns the container element
 */
export function query(container: IContainer, index = 0) {
    return modal.query(container, index);
}

/**
 * Returns the btns area inside Modal.confirm
 */
export function queryBtns(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-modal-confirm-btns`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the cancel button
 */
export function queryCancelButton(container: IContainer, index = 0) {
    if (container instanceof HTMLButtonElement) {
        return container;
    }
    const btns = queryBtns(container, index);
    if (!btns) return null;
    return button.query(btns, 0);
}

/**
 * Returns the Ok button
 */
export function queryOkButton(container: IContainer, index = 0) {
    if (container instanceof HTMLButtonElement) {
        return container;
    }
    const btns = queryBtns(container, index);
    if (!btns) return null;
    return button.query(btns, 1);
}
