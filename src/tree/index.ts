import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, failedQuerySelectors, queryViaSelector } from '../utils';

/**
 * Fires onCheck function
 */
export function fireCheck(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const checkbox = `.${getProvider('prefixCls')}-tree-checkbox`;
    const ele = container.querySelector(selector)?.parentElement?.querySelector(checkbox);
    if (!ele) throw failedQuerySelector(`${selector}'s parentElement ${checkbox}`);
    fireEvent.click(ele);
}

/**
 * Fires onExpand function
 */
export function fireExpand(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const switcher = `.${getProvider('prefixCls')}-tree-switcher`;
    const ele = container.querySelector(selector)?.parentElement?.querySelector(switcher);
    if (!ele) throw failedQuerySelector(`${selector}'s parentElement ${switcher}`);
    fireEvent.click(ele);
}

/**
 * Fires onRightClick function
 */
export function fireRightClick(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.contextMenu(ele);
}

/**
 * Fires onSelect function
 */
export function fireSelect(container: IContainer, title: string) {
    const selector = `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${title}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Drag node. fires onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop, onDragEnd function
 * @param sourceNodeTitle the drag source node title
 * @param targetNodeTitle the drag target node title
 */
export function fireDrag(container: IContainer, sourceNodeTitle: string, targetNodeTitle: string) {
    const selectors = [
        `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${sourceNodeTitle}"]`,
        `.${getProvider('prefixCls')}-tree-node-content-wrapper[title="${targetNodeTitle}"]`,
    ];
    const sourceNodeEle = queryViaSelector(container, selectors[0]);
    const targetNodeEle = queryViaSelector(container, selectors[1]);

    if (!sourceNodeEle || !targetNodeEle) throw failedQuerySelectors(selectors);

    fireEvent.dragStart(sourceNodeEle);
    fireEvent.dragLeave(sourceNodeEle);
    fireEvent.dragEnter(targetNodeEle);
    fireEvent.dragOver(targetNodeEle);
    fireEvent.drop(targetNodeEle);
    fireEvent.dragEnd(targetNodeEle);
}

/**
 * Returns the `index` of container Tree
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-tree`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
