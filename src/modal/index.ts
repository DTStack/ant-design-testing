import { fireEvent } from '@testing-library/react';

import * as button from '../button';
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedTriggerElement, queryViaSelector } from '../utils';

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
 * @notice Since there are two ways to call onCancel, called via cancel button by default.
 * If you intent to call onCancel by mask clicked, please call fireCancel with queryMask
 */
export function fireCancel(container: IContainer) {
    const ele = queryCancelButton(container) || queryMask(container);
    if (!ele) throw failedTriggerElement();
    fireEvent.click(ele);
}

/**
 * Returns the `index` container root element of Modal
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-modal`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` footer element
 */
export function queryModalFooter(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-modal-footer`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the cancel button
 */
export function queryCancelButton(container: IContainer, index = 0) {
    if (container instanceof HTMLButtonElement) {
        return container;
    }
    const ele = queryModalFooter(container, index);
    if (!ele) return null;
    return button.query(ele, 0);
}

/**
 * Returns the ok button
 */
export function queryOkButton(container: IContainer, index = 0) {
    if (container instanceof HTMLButtonElement) {
        return container;
    }
    const ele = queryModalFooter(container, index);
    if (!ele) return null;
    return button.query(ele, 1);
}

/**
 * Returns the mask element
 */
export function queryMask(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-modal-close`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

export * as confirm from './confirm';
