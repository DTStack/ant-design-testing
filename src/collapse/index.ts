import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, mixinElementWithTestFuncs, queryViaSelector, queryViaSelectors } from '../utils';

const mixins = {
    query,
    queryPanelContent,
    queryPanelHeader,
    fireChange,
};

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-collapse-header`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Collapse
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-collapse`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` of Collapse Panel Content
 *
 * You need to call `fireChange` to expand panel content first
 * @param index default is `0`
 */
export function queryPanelContent(container: IContainer, index = 0) {
    const selectors = [
        `.${getProvider('prefixCls')}-collapse-item`,
        `.${getProvider('prefixCls')}-collapse-content-box`,
    ];
    const ele = queryViaSelectors(container, selectors, [index, 0]);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` of Collapse Panel Header
 * @param index default is `0`
 */
export function queryPanelHeader(container: IContainer, index = 0) {
    const selectors = [
        `.${getProvider('prefixCls')}-collapse-item`,
        `.${getProvider('prefixCls')}-collapse-header-text`,
    ];
    const ele = queryViaSelectors(container, selectors, [index, 0]);
    return mixinElementWithTestFuncs(ele, mixins);
}
