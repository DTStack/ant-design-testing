import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onBack function
 */
export function fireBack(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-page-header-back-button`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` of PageHeader
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-page-header`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
