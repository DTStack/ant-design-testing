import { fireEvent } from '@testing-library/react';

import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import * as select from '../select';
import { failedTriggerElement, queryViaSelector, queryViaSelectors } from '../utils';

/**
 * Fires pageSize's dropdown open
 */
export function fireSizeOpen(container: IContainer) {
    select.fireOpen(container);
}
/**
 * Fires onShowSizeChange function
 */
export function fireSizeChange(container: IContainer, index: number) {
    const dropdown = select.queryDropdown(container);
    if (!dropdown) throw failedTriggerElement();
    select.fireSelect(dropdown, index);
}
/**
 * Fires onChange function
 * @notice there are majority ways to call onChange
 *
 * The sequence of calling onChange is like
 * `[next button] -> [prev button] -> [container self]`
 *
 * _If you intent to call specific button, call fireChange with queryXXX_
 */
export function fireChange(container: HTMLInputElement, value: number): void;
export function fireChange(Container: IContainer): void;
export function fireChange(container: IContainer, value?: number) {
    if (container instanceof HTMLInputElement) {
        if (!value) throw new Error('Call quick jump must pass through value');
        fireEvent.focus(container);
        fireEvent.change(container, { target: { value } });
        fireEvent.blur(container);
    } else {
        const ele = queryNextButton(container) || queryPrevButton(container) || container;
        if (!ele) throw failedTriggerElement();
        fireEvent.click(ele);
    }
}

/**
 * Returns the container
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-pagination`;
    const ele = queryViaSelector<HTMLUListElement>(container, selector, index);
    return ele;
}

/**
 * Returns the prev button element
 */
export function queryPrevButton(container: IContainer, index = 0) {
    const selectors = [
        `.${getProvider('prefixCls')}-pagination-prev`,
        `.${getProvider('prefixCls')}-pagination-item-link`,
    ];
    const ele = queryViaSelectors<HTMLButtonElement>(container, selectors, [index]);
    return ele;
}

/**
 * Returns the next button element
 */
export function queryNextButton(container: IContainer, index = 0) {
    const selectors = [
        `.${getProvider('prefixCls')}-pagination-next`,
        `.${getProvider('prefixCls')}-pagination-item-link`,
    ];
    const ele = queryViaSelectors<HTMLButtonElement>(container, selectors, [index]);
    return ele;
}

/**
 * Returns the pagination item element
 * @index page number
 */
export function queryPaginationItem(container: IContainer, index: number) {
    if (index === 0) {
        console.warn('Page number should not start from 0');
        return null;
    }
    const selector = `.${getProvider('prefixCls')}-pagination-item-${index}`;
    const ele = queryViaSelector<HTMLButtonElement>(container, selector, 0);
    return ele;
}

/**
 * Returns the jump next element
 */
export function queryJumpNext(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-pagination-jump-next`;
    const ele = queryViaSelector<HTMLLIElement>(container, selector, index);
    return ele;
}

/**
 * Returns the jump prev element
 */
export function queryJumpPrev(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-pagination-jump-prev`;
    const ele = queryViaSelector<HTMLLIElement>(container, selector, index);
    return ele;
}

/**
 * Returns the quick jump input element
 */
export function queryQuickJump(container: IContainer, index = 0) {
    const selectors = [`.${getProvider('prefixCls')}-pagination-options-quick-jumper`, 'input'];
    const ele = queryViaSelectors<HTMLInputElement>(container, selectors, [index]);
    return ele;
}
