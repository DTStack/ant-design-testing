import { fireEvent, queryByText } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onClose function by click close icon
 *
 * You need set `closable` attr first
 * @param titleOrIndex tag name or index
 */
export function fireClose(container: IContainer, titleOrIndex: string | number) {
    const selector = `.${getProvider('prefixCls')}-tag-close-icon`;
    const ele = query(container, titleOrIndex)?.querySelector(selector);
    if (!ele) throw failedQuerySelector(`${selector} with ${titleOrIndex}`);
    fireEvent.click(ele);
}

/**
 * Returns the `title` or `index` of Tag
 */
export function query(container: IContainer, titleOrIndex: string | number) {
    const selector = `.${getProvider('prefixCls')}-tag`;
    let ele = null;
    if (typeof titleOrIndex === 'string') {
        ele = queryByText(container as HTMLElement, titleOrIndex, { selector });
    } else {
        ele = queryViaSelector(container, selector, titleOrIndex);
    }
    return ele;
}
