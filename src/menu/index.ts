import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function of menu item
 */
export function fireMenuItemClick(container: IContainer, index: number) {
    const selector = `li.${getProvider('prefixCls')}-menu-item`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(`${selector} with index ${index}`);
    act(() => {
        fireEvent.click(ele);
    });
}

/**
 * Fires onClick function of sub menu item
 */
export function fireSubMenuClick(container: IContainer, index: number) {
    const selector = `div.${getProvider('prefixCls')}-menu-submenu-title`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(`${selector} with index ${index}`);
    act(() => {
        fireEvent.click(ele);
    });
}

/**
 * Returns the `index` container of Menu
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-menu`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
