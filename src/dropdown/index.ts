import { act, fireEvent } from '@testing-library/react';
import type { IContainer } from 'src/interface';

import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onOpenChange function and close Dropdown
 */
export function fireCloseWithESC() {
    fireEvent.keyDown(window, { key: 'Esc', keyCode: 27 });
}

/**
 * Fires onOpenChange function and open Dropdown
 * @prerequisite call `jest.useFakeTimers()`
 */
export function fireOpen(container: IContainer, trigger: 'hover' | 'click' | 'contextMenu' = 'hover') {
    const selector = `.${getProvider('prefixCls')}-dropdown-trigger`;
    const ele = query(container);
    if (!ele) throw failedQuerySelector(selector);
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
}

/**
 * Fires onClick function of Dropdown Menu Item
 *
 * You need open Dropdown first
 */
export function fireSelect(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-dropdown-menu-item`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) return failedQuerySelector(selector);
    act(() => {
        fireEvent.click(ele);
    });
}

/**
 * Returns the `index` container of Dropdown
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-dropdown-trigger`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns doropdown menu
 *
 * You need open Dropdown first
 */
export function queryDropdownMenu(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-dropdown-menu`;
    const ele = queryViaSelector(container, selector);
    return ele;
}

/**
 * Returns the `index` container of Dropdown Menu Item
 * @param index default is `0`
 */
export function queryDropdownMenuItem(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-dropdown-menu-item`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
