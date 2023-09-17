import type { IContainer } from '../interface';

export const failedQuerySelector = (selector: string) => new Error(`Failed to query selector about "${selector}"`);

export const failedQuerySelectors = (selectors: string[]) =>
    new Error(`Failed to query selector neither "${selectors.join('" nor "')}"`);

export const failedTriggerElement = () => new Error('Failed to trigger element for NOT found element');

/**
 * 判断容器元素自身是否匹配选择器
 */
export function queryViaSelector<T extends HTMLElement>(container: IContainer, selector: string, index?: number) {
    if (!(container instanceof Document) && container.matches(selector)) {
        return container as T;
    }
    if (typeof index === 'number') {
        return container.querySelectorAll<T>(selector).item(index);
    }
    return container.querySelector<T>(selector);
}

export function queryViaSelectors<T extends HTMLElement>(container: IContainer, selectors: string[], index: number[]) {
    const i = selectors.findIndex(
        function (this: { className: string }, selector) {
            this.className += ` ${selector}`;
            return !(container instanceof Document) && !container.matches(this.className);
        },
        {
            className: '',
        }
    );
    const restSelectors = selectors.slice(i);
    const restIndex = index.slice(i);
    return restSelectors.reduce<T | undefined | null>((acc, cur, idx) => {
        const queryAll = typeof restIndex[idx] === 'number';
        if (queryAll) {
            return acc?.querySelectorAll<T>(cur).item(restIndex[idx]);
        }
        return acc?.querySelector<T>(cur);
    }, container as T);
}
