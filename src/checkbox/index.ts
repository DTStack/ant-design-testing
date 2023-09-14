import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onChange function
 */
export function fireChange(container: IContainer, index: number) {
    const selector = `.${getProvider('prefixCls')}-checkbox-input`;
    const ele = queryInput(container, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-checkbox-wrapper`;
    const ele = queryViaSelector<HTMLLabelElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` container for checkbox's group
 * @param index default is `0`
 */
export function queryGroup(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-checkbox-group`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` input inside Checkbox
 * @param index default is `0`
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-checkbox-input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}
