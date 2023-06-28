import { fireEvent } from '@testing-library/react';
import type { TabsProps } from 'antd';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

export function fireClick(container: IContainer, activeKey: string) {
    const selector = `.${getProvider('prefixCls')}-tabs-tab[data-node-key="${activeKey}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

export function fireChange(container: IContainer, activeKey: string) {
    fireClick(container, activeKey);
}

type ActionType = Parameters<NonNullable<TabsProps['onEdit']>>[1];
export function fireEdit(container: IContainer, action: 'add'): void;
export function fireEdit(container: IContainer, action: 'remove', activeKey: string): void;
export function fireEdit(container: IContainer, action: ActionType, activeKey?: string) {
    switch (action) {
        case 'add': {
            const selector = `.${getProvider('prefixCls')}-tabs-nav-add`;
            const ele = queryViaSelector(container, selector);
            if (!ele) throw failedQuerySelector(selector);
            fireEvent.click(ele);
            break;
        }
        case 'remove': {
            const selector = `.${getProvider('prefixCls')}-tabs-tab[data-node-key="${activeKey}"] .${getProvider(
                'prefixCls'
            )}-tabs-tab-remove`;
            const ele = queryViaSelector(container, selector);
            if (!ele) throw failedQuerySelector(selector);
            fireEvent.click(ele);
            break;
        }

        default:
            throw new Error('Invalid action for Tabs. Please ensure action between add or remove');
    }
}
