import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClose function.
 *
 * Call onClose via close icon by default
 */
export function fireClose(container: IContainer, opt: { closeByMask: boolean } = { closeByMask: true }) {
    const selector = opt.closeByMask
        ? `.${getProvider('prefixCls')}-drawer-mask`
        : `.${getProvider('prefixCls')}-drawer-close`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}
