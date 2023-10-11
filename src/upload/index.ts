import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onChange function
 * @prerequisite call `jest.useFakeTimers()`
 */
export function fireUploadAsync(container: IContainer, files: File[] | { file: string }[]) {
    const ele = query(container);
    act(() => {
        fireEvent.change(ele, { target: { files } });
        jest.runAllTimers();
    });
}

/**
 * Fires onRemove function
 * @param index default remove item is `0`
 */
export function fireRemove(container: IContainer, index = 0) {
    const selector = '.anticon-delete';
    const ele = queryViaSelector(queryUploadListItem(container, index), selector);
    if (!ele) throw failedQuerySelector(selector);
    act(() => {
        fireEvent.click(ele);
    });
}

/**
 * Returns the `index` container of Upload
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-upload input[type='file']`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    return ele;
}

/**
 * Returns the `index` container of file list in Upload you already uploaded
 * @param index default is `0`
 */
export function queryUploadListItem(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-upload-list .${getProvider('prefixCls')}-upload-list-text-container`;
    const ele = queryViaSelector(container, selector, index)?.firstElementChild;
    if (!ele) throw failedQuerySelector(selector);
    return ele as HTMLElement;
}
