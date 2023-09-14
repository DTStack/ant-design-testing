import { fireEvent } from '@testing-library/react';
import type { CascaderProps } from 'antd';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { fireClear as selectFireClear, fireOpen as selectFireOpen } from '../select';
import { failedQuerySelector, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires onDropdownVisibleChange for Cascader, and open drowdown
 */
export function fireOpen(container: IContainer) {
    selectFireOpen(container);
}

/**
 * Fires onChange for Cascader
 * @param indexes each panel's index
 */
export function fireChange(container: IContainer, ...indexes: number[]): void;
/**
 * Fires onChange for Cascader by click or hover
 * @param type as same as Cascader's expandTrigger
 * @param indexes each panel's index
 */
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
        if (!ele) throw failedQuerySelector(selectors.join(' '));

        const last = i === indexes.length - 1;
        fireEvent[last ? 'click' : triggerEvent[type]]?.(ele);
    }
}

/**
 * Fires onSearch for Cascader
 */
export function fireSearch(container: IContainer, value: string) {
    const selector = 'input';
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

/**
 * Fires onClear for Cascader
 * @notice clear button **ONLY** accessible for non-empty value
 */
export function fireClear(container: IContainer) {
    selectFireClear(container);
}

/**
 * Returns the `index` element of Cascader's container
 * @param index the order of Cascader's container, default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-cascader`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` element of Cascader's Select
 * @param index the order of Cascader's Select, default is `0`
 */
export function querySelect(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-select-selector`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` element of Cascader's Input
 * @param index the order of Cascader's Input, default is `0`
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = 'input';
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` element of Cascader's Dropdown
 * @notice Be aware of the different parentElement affected by getPopupContainer
 * @param index the order of Cascader's Dropdown, default is `0`
 */
export function queryDropdown(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-cascader-dropdown`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` element of Menu inside Cascader's Dropdown
 * @param index the order of Menu, default is `0`
 */
export function queryMenu(container: IContainer, index = 0) {
    const selector = `ul.${getProvider('prefixCls')}-cascader-menu`;
    const ele = queryViaSelector<HTMLUListElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` element of MenuItem inside Cascader's Dropdown
 * @param index the order of MenuItem, default is `0`
 */
export function queryMenuItem(container: IContainer, index = 0) {
    const selector = `li.${getProvider('prefixCls')}-cascader-menu-item`;
    const ele = queryViaSelector<HTMLLIElement>(container, selector, index);
    return ele;
}
