import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-back-top`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` of backTop.
 * @param {number} index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-back-top`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
