import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires onChange function
 */
export const fireChange = (container: IContainer, direction: 'left' | 'right') => {
    const toRightBtn = queryOperationButton(container, 0);
    const toLeftBtn = queryOperationButton(container, 1);

    const btn = direction === 'left' ? toLeftBtn : toRightBtn;
    if (!btn) throw failedQuerySelector('button');
    fireEvent.click(btn);
};

/**
 * Fires onScroll function
 */
export const fireScroll = (container: IContainer, type: 'source' | 'target' = 'source') => {
    const selectors = [
        `.${getProvider('prefixCls')}-transfer-list`,
        `.${getProvider('prefixCls')}-transfer-list-content`,
    ];
    const scrollTargetIndex = type === 'source' ? 0 : 1;
    const ele = queryViaSelectors(container, selectors, [scrollTargetIndex, 0]);
    if (!ele) throw failedQuerySelector(`${selectors[0]}[${scrollTargetIndex}] ${selectors[1]}[0]`);
    fireEvent.scroll(ele);
};

/**
 * Fires onSearch function
 */
export const fireSearch = (container: IContainer, opts: { searchText: string; direction: 'left' | 'right' }) => {
    const { direction, searchText } = opts;
    const selectors = [`.${getProvider('prefixCls')}-transfer-list-search`, `.${getProvider('prefixCls')}-input`];
    const searchTargetIndex = direction === 'left' ? 0 : 1;
    const ele = queryViaSelectors(container, selectors, [searchTargetIndex]);
    if (!ele) throw failedQuerySelector(`${selectors[0]}[${searchTargetIndex}] ${selectors[1]}`);

    fireEvent.change(ele, { target: { value: searchText } });
};

/**
 * Returns the `index` of container transfer
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-transfer`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the operation's button element
 * @param index the index of button you want query, default is `0`
 */
export function queryOperationButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-transfer .${getProvider('prefixCls')}-transfer-operation button`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}
