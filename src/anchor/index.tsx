import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

/**
 * Fires onClick function
 * @param indexOrHash the specific link index or hashname
 */
export function fireClick(container: IContainer, indexOrHash?: string | number) {
    let ele = null;
    if (typeof indexOrHash === 'string') {
        const selector = `.${prefix}-anchor-link-title[href="${indexOrHash}"]`;
        ele = queryViaSelector(container, selector);
        if (!ele) throw failedQuerySelector(selector);
    } else if (typeof indexOrHash === 'number') {
        ele = queryLink(container, indexOrHash);
    } else {
        ele = queryLink(container);
    }
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Anchor
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${prefix}-anchor-wrapper`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
}

/**
 * Returns the `index` item of Anchor link
 * @param index default is `0`
 */
export function queryLink(container: IContainer, index = 0) {
    const selector = `.${prefix}-anchor-link-title`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
}
