import { act, fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector, queryViaSelector } from "../utils";

export function fireChange(container: IContainer, value: any) {
  const selector = "input";
  const ele = queryViaSelector(container, "input");
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.change(ele, { target: { value } });
}

export function fireOpen(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-select-selector`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  act(() => {
    fireEvent.mouseDown(ele);
    jest.runAllTimers();
  });
}

export function fireSelect(container: IContainer, index: number) {
  const selector = `div.${getProvider("prefixCls")}-select-item-option-content`;
  const ele = queryViaSelector(container, selector, index);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}

export function fireDeSelect(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-select-selection-item`;
  const removeSelector = `.${getProvider(
    "prefixCls"
  )}-select-selection-item-remove`;
  const ele = container
    .querySelectorAll(selector)
    .item(index)
    ?.querySelector(removeSelector);
  if (!ele) {
    throw failedQuerySelector(`${selector}[${index}] ${removeSelector}`);
  }
  fireEvent.click(ele);
}

export function fireFocus(container: IContainer) {
  const selector = "input";
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.focus(ele);
}

export function fireBlur(container: IContainer) {
  const selector = "input";
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.blur(ele);
}

export function fireClear(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-select-clear`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.mouseDown(ele);
}

export function query(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-select`;
  const ele = queryViaSelector(container, selector, index);
  return ele;
}
