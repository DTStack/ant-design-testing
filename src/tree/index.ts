import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

export function fireCheck(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const checkbox = `.${getProvider('prefixCls')}-tree-checkbox`;
    const ele = container.querySelector(selector)?.parentElement?.querySelector(checkbox);
    if (!ele) throw failedQuerySelector(`${selector}'s parentElement ${checkbox}`);
    fireEvent.click(ele);
}

export function fireExpand(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const switcher = `.${getProvider('prefixCls')}-tree-switcher`;
    const ele = container.querySelector(selector)?.parentElement?.querySelector(switcher);
    if (!ele) throw failedQuerySelector(`${selector}'s parentElement ${switcher}`);
    fireEvent.click(ele);
}

export function fireRightClick(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.contextMenu(ele);
}

export function fireSelect(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

// TODO
export function fireDrag() {}
