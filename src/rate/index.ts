import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefixCls = getProvider('prefixCls');

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

export const fireChange = (container: IContainer, value: number) => {
    resetProperty();
    const isHalfStar = !Number.isInteger(value);
    const starIntValue = Math.ceil(value);
    const selector = `.${prefixCls}-rate .${prefixCls}-rate-star > div[aria-posinset="${starIntValue}"]`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);

    fireEvent(ele, new MouseEvent('click', { clientX: isHalfStar ? -1 : 0, bubbles: true }));
};

export const fireHoverChange = (container: IContainer, value: number) => {
    resetProperty();
    const isHalfStar = !Number.isInteger(value);
    const starIntValue = Math.ceil(value);
    const selector = `.${prefixCls}-rate .${prefixCls}-rate-star > div[aria-posinset="${starIntValue}"]`;
    const ele = container.querySelector(selector);
    if (!ele) throw failedQuerySelector(selector);

    fireEvent(ele, new MouseEvent('mousemove', { clientX: isHalfStar ? -1 : 0, bubbles: true }));
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${prefixCls}-rate`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
};
