import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    query,
    queryBreadcrumbItem,
    fireClick,
};

/**
 * Fires onClick function
 */
export function fireClick(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-breadcrumb-link`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` of Breadcrumb.
 * @param {number} index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-breadcrumb`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` of Breadcrumb Item.
 * @param {number} index default is `0`
 */
export function queryBreadcrumbItem(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-breadcrumb-link`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}
