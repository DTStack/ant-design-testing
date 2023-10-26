import { fireEvent } from '@testing-library/react';
import type { TabsProps } from 'antd';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, failedTriggerElement, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires onTabClick function
 * @param activeKey the key of tab you want click
 */
export function fireClick(container: IContainer, activeKey: string) {
    const selector = `.${getProvider('prefixCls')}-tabs-tab[data-node-key="${activeKey}"]`;
    const ele = queryTabTitle(container, activeKey);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Fires onChange function
 * @param activeKey the key of tab you want change to
 */
export function fireChange(container: IContainer, activeKey: string) {
    fireClick(container, activeKey);
}

type ActionType = Parameters<NonNullable<TabsProps['onEdit']>>[1];
/**
 * Fires onEdit function
 */
export function fireEdit(container: IContainer, action: 'add'): void;
export function fireEdit(container: IContainer, action: 'remove', activeKey: string): void;
export function fireEdit(container: IContainer, action: ActionType, activeKey?: string) {
    switch (action) {
        case 'add': {
            const ele = queryAddButton(container);
            if (!ele) throw failedQuerySelector(`.${getProvider('prefixCls')}-tabs-nav-add`);
            fireEvent.click(ele);
            break;
        }
        case 'remove': {
            if (!activeKey) throw new Error('Remove action should specify activeKey!');
            const ele = queryRemoveButton(container, activeKey);
            if (!ele) throw failedTriggerElement();
            fireEvent.click(ele);
            break;
        }

        default:
            throw new Error('Invalid action for Tabs. Please ensure action between add or remove');
    }
}

/**
 * Returns the container element of Tab
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tabs`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the title element in Tab
 * @param activeKey the key of tab you want to query
 */
export function queryTabTitle(container: IContainer, activeKey: string) {
    const selector = `.${getProvider('prefixCls')}-tabs-tab[data-node-key="${activeKey}"]`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector);
    return ele;
}

/**
 * Returns the add button element in Tab
 * @param index default is `0`
 */
export function queryAddButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tabs-nav-add`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the remove button in Tab
 * @param activeKey the key of tab you want to remove
 */
export function queryRemoveButton(container: IContainer, activeKey: string) {
    const selectors = [
        `.${getProvider('prefixCls')}-tabs-tab[data-node-key="${activeKey}"]`,
        `.${getProvider('prefixCls')}-tabs-tab-remove`,
    ];
    const ele = queryViaSelectors<HTMLButtonElement>(container, selectors, []);
    return ele;
}
