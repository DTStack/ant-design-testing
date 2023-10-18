import { act, fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onChange function
 * @prerequisite call `jest.useFakeTimers()`
 */
export function fireUpload(container: IContainer, files: File[] | { name: string }[]) {
    const selector = `.${getProvider('prefixCls')}-upload input[type='file']`;
    const ele = query(container);
    if (!ele) throw failedQuerySelector(selector);
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
    const selectors = [
        `.${getProvider('prefixCls')}-upload-list .${getProvider('prefixCls')}-upload-list-text-container`,
        '.anticon-delete',
    ];

    const listItemEle = queryUploadListItem(container, index);
    if (!listItemEle) throw failedQuerySelector(selectors[0]);

    const ele = queryViaSelector(listItemEle as IContainer, selectors[1]);
    if (!ele) throw failedQuerySelector(selectors[1]);

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
    return ele;
}

/**
 * Returns the `index` container of file list in Upload you already uploaded
 * @param index default is `0`
 */
export function queryUploadListItem(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-upload-list .${getProvider('prefixCls')}-upload-list-text-container`;
    const ele = queryViaSelector(container, selector, index)?.firstElementChild;
    return ele;
}
