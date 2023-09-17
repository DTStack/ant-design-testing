import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

export const fireMenuItemClick = (container: IContainer, index: number) => {
    const selector = `li.${prefix}-menu-item`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(`${selector} with index ${index}`);
    act(() => {
        fireEvent.click(ele);
    });
};

export const fireSubMenuClick = (container: IContainer, index: number) => {
    const selector = `div.${prefix}-menu-submenu-title`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(`${selector} with index ${index}`);
    act(() => {
        fireEvent.click(ele);
    });
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${prefix}-menu`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
};
