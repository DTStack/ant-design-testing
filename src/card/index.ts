import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefixCls = getProvider('prefixCls');

export const fireTabChange = (container: IContainer, key: string) => {
    const selector = `.${prefixCls}-card-contain-tabs .${prefixCls}-card-head .${prefixCls}-tabs-tab[data-node-key="${key}"]`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${prefixCls}-card`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
};
