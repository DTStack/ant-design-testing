import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector } from '../utils';

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-back-top`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}
