import type { IContainer } from "../interface";

export const failedQuerySelector = (selector: string) =>
  new Error(`Failed to query selector about "${selector}"`);

export const failedQuerySelectors = (selectors: string[]) =>
  new Error(`Failed to query selector neither "${selectors.join('" nor "')}"`);

export const failedTriggerElement = () =>
  new Error("Failed to trigger element for NOT found element");

/**
 * @description 判断容器元素自身是否匹配选择器， 像Input与Button这种组件自身可能会作为container
 */
export const matchContainerSelf = (
  container: HTMLElement,
  selector: string
) => {
  return container.matches(selector);
};

export function queryViaSelector<T extends HTMLElement>(
  container: IContainer,
  selector: string,
  index?: number
) {
  if (container.matches(selector)) {
    return container;
  }
  if (typeof index === "number") {
    return container.querySelectorAll<T>(selector).item(index);
  }
  return container.querySelector<T>(selector);
}
