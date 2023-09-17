import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

const prefix = getProvider('prefixCls');

export const fireUploadAsync = (container: IContainer, files: File[] | { file: string }[]) => {
    const ele = query(container);
    act(() => {
        fireEvent.change(ele, { target: { files } });
        jest.runAllTimers();
    });
};

export const fireRemove = (container: IContainer, index = 0) => {
    const selector = '.anticon-delete';
    const ele = queryViaSelector(queryUploadListItem(container, index), selector);
    if (!ele) throw failedQuerySelector(selector);
    act(() => {
        fireEvent.click(ele);
    });
};

export const query = (container: IContainer, index = 0) => {
    const selector = `.${prefix}-upload input[type='file']`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
};

export const queryUploadListItem = (container: IContainer, index = 0) => {
    const selector = `.${prefix}-upload-list .${prefix}-upload-list-text-container`;
    const ele = queryViaSelector(container, selector, index)?.firstElementChild;
    if (!ele) throw failedQuerySelector(selector);
    return ele as HTMLElement;
};
