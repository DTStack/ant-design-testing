import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClick function
 * @param indexOrHash the specific link index or hashname
 */
export function fireClick(container: IContainer, indexOrHash?: string | number) {
    let ele = null;
    let selector = '';
    if (typeof indexOrHash === 'string') {
        selector = `.${getProvider('prefixCls')}-anchor-link-title[href="${indexOrHash}"]`;
        ele = queryViaSelector(container, selector);
        if (!ele) throw failedQuerySelector(selector);
    } else if (typeof indexOrHash === 'number') {
        selector = getSelector('link');
        ele = queryLink(container, indexOrHash);
    } else {
        selector = getSelector('link');
        ele = queryLink(container);
    }
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Anchor
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = getSelector();
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the `index` item of Anchor link
 * @param index default is `0`
 */
export function queryLink(container: IContainer, index = 0) {
    const selector = getSelector('link');
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

function getSelector(type = 'default') {
    switch (type) {
        case 'default':
            return `.${getProvider('prefixCls')}-anchor-wrapper`;
        case 'link':
            return `.${getProvider('prefixCls')}-anchor-link-title`;
        default:
            return '';
    }
}
