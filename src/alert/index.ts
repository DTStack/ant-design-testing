import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

export const fireClose = (container: IContainer) => {
    const selector = `.${prefix}-alert-close-icon`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${prefix}-alert`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
};
