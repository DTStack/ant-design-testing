import { act, fireEvent } from '@testing-library/react';

import { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer) {
    const ele = queryContent(container);
    if (!ele) throw failedQuerySelector(`.${getProvider('prefixCls')}-notice-content`);
    fireEvent.click(ele);
}

/**
 * Fires onClose function by waiting duration
 * @param {number} duration ms
 */
export async function fireClose(duration = 3000) {
    for (let i = 0; i < 10; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve();
    }

    act(() => {
        jest.advanceTimersByTime(duration);
    });
}

/**
 * Returns the container element
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-message`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the content element
 */
export function queryContent(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-message-notice-content`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}
