import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelectors, queryViaSelectors } from '../utils';

export const fireClick = (container: IContainer, index: number) => {
    const selectors = [`.${getProvider('prefixCls')}-breadcrumb li`, `.${getProvider('prefixCls')}-breadcrumb-link`];
    const ele = queryViaSelectors(container, selectors, [index]);
    if (!ele) throw failedQuerySelectors(selectors);
    fireEvent.click(ele);
};
