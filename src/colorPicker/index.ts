import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    query,
    queryColorPanel,
    queryColorInput,
    queryColorAlphaInput,
    fireChange,
    fireOpen,
};

/**
 * Fires onChange function.
 *
 * If hexColor and alpha are both provided, `onChange` will trigger twice.
 *
 * Only support `hexColor` format
 */
export function fireChange(container: IContainer, color: { hexColor?: string; alpha?: string }) {
    const selectors = [
        `.${getProvider('prefixCls')}-color-picker:not(.${getProvider('prefixCls')}-popover-hidden) .${getProvider(
            'prefixCls'
        )}-color-picker-input input`,
        `.${getProvider('prefixCls')}-color-picker:not(.${getProvider('prefixCls')}-popover-hidden) .${getProvider(
            'prefixCls'
        )}-color-picker-alpha-input input`,
    ];
    if (color.hexColor) {
        const ele = queryColorInput(container);
        if (!ele) throw failedQuerySelector(selectors[0]);
        fireEvent.input(ele, { target: { value: color.hexColor } });
    }

    if (color.alpha) {
        const ele = queryColorAlphaInput(container);
        if (!ele) throw failedQuerySelector(selectors[1]);
        fireEvent.input(ele, { target: { value: color.alpha } });
    }
}

/**
 * Fires `onOpenChange` function
 */
export function fireOpen(container: IContainer, index = 0, trigger: 'click' | 'hover' = 'click') {
    const selector = `.${getProvider('prefixCls')}-color-picker-trigger`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    if (trigger === 'hover') fireEvent.mouseEnter(ele);
    else fireEvent.click(ele);
}

/**
 * Returns the `index` container of ColorPicker
 * @param index defualt is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-color-picker-trigger`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the popover panel of ColorPicker
 */
export function queryColorPanel(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-color-picker:not(.${getProvider('prefixCls')}-popover-hidden)`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the hex color input of ColorPicker
 */
export function queryColorInput(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-color-picker:not(.${getProvider(
        'prefixCls'
    )}-popover-hidden) .${getProvider('prefixCls')}-color-picker-input input`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the alpha input of ColorPicker
 */
export function queryColorAlphaInput(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-color-picker:not(.${getProvider(
        'prefixCls'
    )}-popover-hidden) .${getProvider('prefixCls')}-color-picker-alpha-input input`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector);
    return mixinElementWithTestFuncs(ele, mixins);
}
