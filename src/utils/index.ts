export const failedQuerySelector = (selector: string) =>
  new Error(`Failed to query selector about "${selector}"`);

export const failedQuerySelectors = (selectors: string[]) =>
  new Error(`Failed to query selector neither "${selectors.join('" nor "')}"`);

export const failedTriggerElement = () =>
  new Error("Failed to trigger element for NOT found element");

/**
 * @description 判断容器元素自身是否匹配选择器， 像Input与Button这种组件自身可能会作为container
 */
export const judgeContainerMatchSelf = (container: HTMLElement, selector: string) => {
  return container.matches(selector)
}