import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function for Button
 */
export const fireClick = (container: IContainer) => {
    const selector = `.${getProvider('prefixCls')}-btn`;
    const ele = query(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
};

/**
 * Returns the `index` button that is a descendant of node.
 * @param {number} index the order of element, default is `0`
 */
export const query = (container: IContainer, index = 0) => {
    const selector = `.${getProvider('prefixCls')}-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
};
