import { fireEvent, getByText } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

/**
 * Fires onClose function by click close icon
 *
 * You need set `closable` attr first
 * @param titleOrIndex tag name or index
 */
export function fireClose(container: IContainer, titleOrIndex: string | number) {
    const selector = `.${prefix}-tag-close-icon`;
    const ele = query(container, titleOrIndex)?.querySelector(selector);
    if (!ele) throw failedQuerySelector(`.${prefix}-tag ${selector} with ${titleOrIndex}`);
    fireEvent.click(ele);
}

/**
 * Returns the `title` or `index` of Tag
 */
export function query(container: IContainer, titleOrIndex: string | number) {
    const selector = `.${prefix}-tag`;
    let ele = null;
    if (typeof titleOrIndex === 'string') {
        ele = getByText(container as HTMLElement, titleOrIndex, { selector });
    } else {
        ele = queryViaSelector(container, selector, titleOrIndex);
    }
    return ele;
}
