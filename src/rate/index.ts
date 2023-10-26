import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 *  fix issue https://github.com/jestjs/jest/pull/13825#issuecomment-1452037295
 **/
const resetProperty = () => {
    Object.defineProperties(MouseEvent.prototype, {
        pageX: {
            get() {
                return this.clientX;
            },
            configurable: true,
        },
    });
};

/**
 * Fires onChange function
 */
export const fireChange = (container: IContainer, value: number) => {
    resetProperty();
    const isHalfStar = !Number.isInteger(value);
    const starIntValue = Math.ceil(value);
    const selector = `.${getProvider('prefixCls')}-rate .${getProvider(
        'prefixCls'
    )}-rate-star > div[aria-posinset="${starIntValue}"]`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);

    fireEvent(ele, new MouseEvent('click', { clientX: isHalfStar ? -1 : 0, bubbles: true }));
};

/**
 * Fires onHoverChange function
 */
export const fireHoverChange = (container: IContainer, value: number) => {
    resetProperty();
    const isHalfStar = !Number.isInteger(value);
    const starIntValue = Math.ceil(value);
    const selector = `.${getProvider('prefixCls')}-rate .${getProvider(
        'prefixCls'
    )}-rate-star > div[aria-posinset="${starIntValue}"]`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);

    fireEvent(ele, new MouseEvent('mousemove', { clientX: isHalfStar ? -1 : 0, bubbles: true }));
};

/**
 * Returns the `index` container of Rate
 * @param index default is `0`
 */
export const query = (container: IContainer, index = 0) => {
    const selector = `.${getProvider('prefixCls')}-rate`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
};
