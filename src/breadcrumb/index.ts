import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelectors, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer, index: number) {
    const selectors = [`.${getProvider('prefixCls')}-breadcrumb li`, `.${getProvider('prefixCls')}-breadcrumb-link`];
    const ele = queryViaSelectors(container, selectors, [index]);
    if (!ele) throw failedQuerySelectors(selectors);
    fireEvent.click(ele);
}

/**
 * Returns the `index` of Breadcrumb.
 * @param {number} index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-breadcrumb`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the `index` of Breadcrumb Item.
 * @param {number} index default is `0`
 */
export function queryBreadcrumbItem(container: IContainer, index = 0) {
    const selectors = [`.${getProvider('prefixCls')}-breadcrumb li`, `.${getProvider('prefixCls')}-breadcrumb-link`];
    const ele = queryViaSelectors(container, selectors, [index, 0]);
    return ele;
}
