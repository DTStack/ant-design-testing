import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    fireNextStep,
    firePrevStep,
};

/**
 * Click next step button
 */
export function fireNextStep(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-tour-next-btn`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Click prev step button
 */
export function firePrevStep(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-tour-prev-btn`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Close tour popover
 */
export function fireClose(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-tour-close`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the container of Tour popover
 */
export function query(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-tour`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector);
    return mixinElementWithTestFuncs(ele, mixins);
}
