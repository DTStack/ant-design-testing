import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { fireOpen as fireSelectOpen } from '../select';
import { failedQuerySelector, queryViaSelector } from '../utils';

export function fireOpen(container: IContainer) {
    fireSelectOpen(container);
}

export function fireSearch(container: IContainer, value: any) {
    const selector = 'input';
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.change(ele, { target: { value } });
}

export function fireSelect(container: IContainer, index: number) {
    const selector = `span.${getProvider('prefixCls')}-select-tree-node-content-wrapper`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

export function fireTreeExpand(container: IContainer, index: number) {
    const selector = `span.${getProvider('prefixCls')}-select-tree-node-content-wrapper`;
    const switcher = `.${getProvider('prefixCls')}-select-tree-switcher`;
    const ele = container.querySelectorAll(selector).item(index)?.parentElement?.querySelector(switcher);
    if (!ele) throw failedQuerySelector(`${selector}[${index}]'s parentElement ${switcher}`);
    fireEvent.click(ele);
}
