import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer) {
    const ele = query(container);
    if (!ele) throw failedQuerySelector(`.${getProvider('prefixCls')}-switch`);
    fireEvent.click(ele);
}

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer) {
    fireClick(container);
}

/**
 * Returns the container element
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-switch`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}
