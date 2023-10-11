import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClose function
 */
export function fireClose(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-alert-close-icon`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Alert
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-alert`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
