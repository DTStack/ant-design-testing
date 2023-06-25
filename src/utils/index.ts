export const failedQuerySelector = (selector: string) =>
  new Error(`Failed to query selector about "${selector}"`);

export const failedQuerySelectors = (selectors: string[]) =>
  new Error(`Failed to query selector neither "${selectors.join('" nor "')}"`);

export const failedTriggerElement = () =>
  new Error("Failed to trigger element for NOT found element");
