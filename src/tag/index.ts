import { fireEvent, getByText } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

export const fireClose = (container: IContainer, titleOrIndex: string | number) => {
    const selector = `.${prefix}-tag-close-icon`;
    const ele = query(container, titleOrIndex)?.querySelector(selector);
    if (!ele) throw failedQuerySelector(`.${prefix}-tag ${selector} with ${titleOrIndex}`);
    fireEvent.click(ele);
};

export const query = (container: IContainer, titleOrIndex: string | number) => {
    const selector = `.${prefix}-tag`;
    let ele = null;
    if (typeof titleOrIndex === 'string') {
        ele = getByText(container as HTMLElement, titleOrIndex, { selector });
    } else {
        ele = queryViaSelector(container, selector, titleOrIndex);
    }
    return ele;
};
