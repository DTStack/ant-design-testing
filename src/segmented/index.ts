import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, index: number) {
    const selector = `.${prefix}-segmented .${prefix}-segmented-item`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Segmented
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${prefix}-segmented`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
}
