import { fireEvent } from '@testing-library/react';
import type { CascaderProps } from 'antd';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { fireClear as selectFireClear } from '../select';
import { failedQuerySelector, queryViaSelector, queryViaSelectors } from '../utils';

export function fireOpen(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-select-selector`;
    const ele = querySelect(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
}

export function fireChange(container: IContainer, ...indexes: number[]): void;
export function fireChange(container: IContainer, type: CascaderProps['expandTrigger'], ...indexes: number[]): void;
export function fireChange(
    container: IContainer,
    typeOrIndex: CascaderProps['expandTrigger'] | number,
    ...rest: number[]
) {
    const type = typeof typeOrIndex === 'string' ? typeOrIndex : 'click';
    const indexes = typeof typeOrIndex === 'number' ? [typeOrIndex].concat(rest) : rest;
    const triggerEvent = {
        click: 'click',
        hover: 'mouseEnter',
    } as const;
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

        const last = i === indexes.length - 1;
        fireEvent[last ? 'click' : triggerEvent[type]]?.(ele);
    }
}

export function fireSearch(container: IContainer, value: string) {
    const selector = 'input';
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

export function fireClear(container: IContainer) {
    selectFireClear(container);
}

export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-cascader`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

export function querySelect(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select-selector`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

export function queryInput(container: IContainer, index = 0) {
    const selector = 'input';
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}

export function queryDropdown(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-cascader-dropdown`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

export function queryMenu(container: IContainer, index = 0) {
    const selector = `ul.${getProvider('prefixCls')}-cascader-menu`;
    const ele = queryViaSelector<HTMLUListElement>(container, selector, index);
    return ele;
}

export function queryMenuItem(container: IContainer, index = 0) {
    const selector = `li.${getProvider('prefixCls')}-cascader-menu-item`;
    const ele = queryViaSelector<HTMLLIElement>(container, selector, index);
    return ele;
}
