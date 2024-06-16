import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelectors, mixinElementWithTestFuncs, queryViaSelector, queryViaSelectors } from '../utils';

const mixins = {
    query,
    fireRefresh,
};

/**
 * Fires `fireRefresh` function
 */
export function fireRefresh(container: IContainer, index = 0) {
    const selectors = [`.${getProvider('prefixCls')}-qrcode`, `.${getProvider('prefixCls')}-qrcode-expired~button`];
    const ele = queryViaSelectors(container, selectors, [index, 0]);
    if (!ele) throw failedQuerySelectors(selectors);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of QRCode
 * @param index defualt is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-qrcode`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}
