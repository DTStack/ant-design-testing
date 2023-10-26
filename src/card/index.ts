import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onTabChange function
 * @param key the key of tab you want click
 */
export function fireTabChange(container: IContainer, key: string) {
    const selector = `.${getProvider('prefixCls')}-card-contain-tabs .${getProvider(
        'prefixCls'
    )}-card-head .${getProvider('prefixCls')}-tabs-tab[data-node-key="${key}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of Card
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-card`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
