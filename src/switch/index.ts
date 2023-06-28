import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

export function fireClick(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-switch`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

export function fireChange(container: IContainer) {
    fireClick(container);
}

export function query(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-switch`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
