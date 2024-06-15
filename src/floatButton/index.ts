import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    fireClick,
    query,
};

/**
 * Fires floatButton onClick function
 */
export function fireClick(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-float-btn`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` of floatButton.
 * @param {number} index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-float-btn`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}
