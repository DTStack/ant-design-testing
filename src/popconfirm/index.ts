import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

export function fireCancel(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-popover-buttons .${getProvider('prefixCls')}-btn`;
    const ele = queryViaSelector(container, selector, 0);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

export function fireConfirm(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-popover-buttons .${getProvider('prefixCls')}-btn`;
    const ele = queryViaSelector(container, selector, 1);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}
