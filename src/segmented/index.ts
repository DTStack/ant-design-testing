import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-segmented .${getProvider('prefixCls')}-segmented-item`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Segmented
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-segmented`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
