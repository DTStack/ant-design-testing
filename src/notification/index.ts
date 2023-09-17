import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

export const fireClick = (container: IContainer) => {
    const ele = query(container);
    fireEvent.click(ele);
};

export const fireClose = (container: IContainer) => {
    const selectors = [`.${prefix}-notification-notice-close`, `.${prefix}-notification-notice-btn`];
    const ele = queryViaSelector(container, selectors[0]) || queryViaSelector(container, selectors[1]);
    if (!ele) throw failedQuerySelector(`${selectors[0]} or ${selectors[1]}`);
    act(() => {
        fireEvent.click(ele);
    });
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${prefix}-notification-notice`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
};
