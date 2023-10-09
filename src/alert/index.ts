import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

/**
 * Fires onClose function
 */
export function fireClose(container: IContainer) {
    const selector = `.${prefix}-alert-close-icon`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Alert
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${prefix}-alert`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
