import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-notification-notice`;
    const ele = query(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onClose function by click close icon
 *
 * You need set duration to `0`
 */
export function fireClose(container: IContainer) {
    const selectors = [
        `.${getProvider('prefixCls')}-notification-notice-close`,
        `.${getProvider('prefixCls')}-notification-notice-btn`,
    ];
    const ele = queryViaSelector(container, selectors[0]) || queryViaSelector(container, selectors[1]);
    if (!ele) throw failedQuerySelector(`${selectors[0]} or ${selectors[1]}`);
    act(() => {
        fireEvent.click(ele);
    });
}

/**
 * Returns the `index` container of Notification
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-notification-notice`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
