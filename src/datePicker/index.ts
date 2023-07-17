import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { failedQuerySelector, failedTriggerElement, queryViaSelector } from '../utils';

/**
 * Fires onOpenChange function.
 * Meanwhile, open Dropdown
 */
export function fireOpen(container: IContainer) {
    const selector = 'input';
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.mouseDown(ele);
    fireEvent.focus(ele);
}

/**
 * Fires onOpenChange function.
 * Meanwhile, close dropdown
 */
export function fireClose(container: IContainer) {
    const selector = 'input';
    const ele = queryInput(container);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.blur(ele);
}

/**
 * Fires onPanelChange function
 * @notice there are majority ways to call onPanelChange depends on current panel's status
 *
 * The sequence of calling onPanelChange is like
 * `[super prev] -> [prev] -> [next] -> [super next] -> [month] -> [year] -> [decade]`
 *
 * _If you intent to call specific button, call firePanelChange with queryXXX_
 *
 * @param mode defualt is `date`
 */
export function firePanelChange(container: IContainer) {
    const ele =
        querySuperPrevButton(container) ||
        queryPrevButton(container) ||
        queryNextButton(container) ||
        querySuperNextButton(container) ||
        queryMonthButton(container) ||
        queryYearButton(container) ||
        queryDecadeButton(container);
    if (!ele) throw failedTriggerElement();
    fireEvent.click(ele);
}

/**
 * Fires onChange function or onCalendarChange function for DatePicker.RangePicker
 * @notice May **NOT** call onChange certainly, it depends on whether called firePanelChange before
 * @param text current text on Panel
 */
export function fireChange(container: IContainer, text: string) {
    const eles = container.querySelectorAll('table td');
    const selector = '-in-view';
    const cell = Array.from(eles).find((td) => {
        return td.textContent === String(text) && td.className.includes(selector);
    });
    if (!cell) throw failedQuerySelector(`end with ${selector}`);
    fireEvent.click(cell);
}

/**
 * Fires onOk function
 */
export function fireOk(container: IContainer) {
    const selector = `.${getProvider('prefixCls')}-picker-ok > *`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
}

/**
 * Returns the `index` container of DatePicker
 * @param index defualt is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` input element in DatePicker
 * @param index default is `0`
 */
export function queryInput(container: IContainer, index = 0) {
    const selector = `input`;
    const ele = queryViaSelector<HTMLInputElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` dropdown's container about DatePicker
 * @param index default is `0`
 * @returns
 */
export function queryDropdown(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-dropdown`;
    const ele = queryViaSelector<HTMLDivElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` super prev button
 * @param index defualt is `0`
 */
export function querySuperPrevButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-header-super-prev-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` prev button
 * @param index defualt is `0`
 */
export function queryPrevButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-header-prev-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` super next button
 * @param index defualt is `0`
 */
export function querySuperNextButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-header-super-next-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` next button
 * @param index defualt is `0`
 */
export function queryNextButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-header-next-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` decade button
 * @param index default is `0`
 */
export function queryDecadeButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-decade-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` year button
 * @param index default is `0`
 */
export function queryYearButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-year-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}

/**
 * Returns the `index` month button
 * @param index default is `0`
 */
export function queryMonthButton(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-picker-month-btn`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, index);
    return ele;
}
