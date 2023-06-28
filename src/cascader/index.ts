import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector, queryViaSelectors } from '../utils';

export function fireOpen(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-select-selector`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

export function fireChange(container: IContainer, type: string, ...indexes: number[]) {
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const selectors = [
            `ul.${getProvider('prefixCls')}-cascader-menu`,
            `li.${getProvider('prefixCls')}-cascader-menu-item`,
        ];
        const ele = queryViaSelectors(container, selectors, [i, index]);
        if (!ele) {
            throw failedQuerySelector(selectors.join(' '));
        }
        fireEvent[type as keyof typeof fireEvent]?.(ele);
    }
}

export function fireSearch(container: IContainer, value: string) {
    const selector = 'input';
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

export function query(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-cascader`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
