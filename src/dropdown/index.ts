import { act, fireEvent } from '@testing-library/react';
import type { IContainer } from 'src/interface';

import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

export const fireCloseWithESC = () => {
    fireEvent.keyDown(window, { key: 'Esc', keyCode: 27 });
};

export const fireOpen = (container: IContainer, trigger: 'hover' | 'click' | 'contextMenu' = 'hover') => {
    const ele = query(container) as HTMLElement;
    act(() => {
        if (trigger === 'click') {
            fireEvent.click(ele);
        } else if (trigger === 'contextMenu') {
            fireEvent.contextMenu(ele);
        } else {
            act(() => {
                fireEvent.mouseEnter(ele);
            });
        }
        jest.runAllTimers();
    });
};

export const fireSelect = (container: IContainer, index = 0) => {
    const selector = `.${getProvider('prefixCls')}-dropdown-menu-item`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) return failedQuerySelector(selector);
    act(() => {
        fireEvent.click(ele);
    });
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${getProvider('prefixCls')}-dropdown-trigger`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) return failedQuerySelector(selector);
    return ele;
};

export const queryDropdownMenu = (container: IContainer) => {
    const selector = `.${getProvider('prefixCls')}-dropdown-menu`;
    const ele = queryViaSelector(container, selector);
    if (!ele) return failedQuerySelector(selector);
    return ele;
};
