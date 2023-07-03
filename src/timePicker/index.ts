import { fireEvent } from '@testing-library/react';

import * as datePicker from '../datePicker';
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, queryViaSelector } from '../utils';

/**
 * Fires onOpenChange function
 */
export function fireOpen(container: IContainer) {
    datePicker.fireOpen(container);
}

export function fireOk(container: IContainer) {
    const ele = queryOk(container);
    if (!ele) throw failedQuerySelector(`.${getProvider('prefixCls')}-picker-ok button`);
    fireEvent.click(ele);
}

type TimeString = `${string}:${string}:${string}` | `${string}:${string}`;
/**
 * Select a cell
 */
export function fireSelectCell(container: IContainer, index: number) {
    const selector = `li.${getProvider('prefixCls')}-picker-time-panel-cell`;
    const ele = queryViaSelector(container, selector, index);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

function fireSinglePanel(container: HTMLCollection, time: TimeString) {
    const [hour, minute, second] = time.split(':');
    if (hour) {
        fireSelectCell(container.item(0) as HTMLElement, Number(hour));
    }
    if (minute) {
        fireSelectCell(container.item(1) as HTMLElement, Number(minute));
    }
    if (second) {
        fireSelectCell(container.item(2) as HTMLElement, Number(second));
    }
}

/**
 * Fires onChange function
 * @param time give array when RangePicker
 */
export function fireChange(container: IContainer, time: TimeString | [TimeString, TimeString]) {
    const selector = `.${getProvider('prefixCls')}-picker-content`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);

    if (Array.isArray(time)) {
        // It's for RangePicker
        fireSinglePanel(ele.children, time[0]);
        fireOk(container);
        fireSinglePanel(ele.children, time[1]);
        fireOk(container);
    } else {
        fireSinglePanel(ele.children, time);
        fireOk(container);
    }
}

/**
 * Returns the container element
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}

/**
 * Returns the dropdown element of timePicker
 */
export function queryDropdown(container: IContainer, index = 0) {
    datePicker.queryDropdown(container, index);
}

/**
 * Returns the ok button
 */
export function queryOk(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-ok button`;
    const ele = queryViaSelector(container, selector, index);
    return ele;
}
