import { act, fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector } from "../utils";

export function fireChange(container: IContainer, value: any) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-select-auto-complete input.${getProvider(
    "prefixCls"
  )}-select-selection-search-input`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.change(ele, { target: { value } });
}

export function fireOpen(container: IContainer) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-select-auto-complete .${getProvider("prefixCls")}-select-selector`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  act(() => {
    fireEvent.mouseDown(ele);
    jest.runAllTimers();
  });
}

export function fireSelect(container: IContainer, index: number) {
  const selector = `div.${getProvider("prefixCls")}-select-item-option-content`;
  const ele = container.querySelectorAll(selector);
  if (!ele.item(index)) throw failedQuerySelector(selector);
  fireEvent.click(ele.item(index));
}

export function fireFocus(container: IContainer) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-select-auto-complete input.${getProvider(
    "prefixCls"
  )}-select-selection-search-input`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.focus(ele);
}

export function fireBlur(container: IContainer) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-select-auto-complete input.${getProvider(
    "prefixCls"
  )}-select-selection-search-input`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.blur(ele);
}

export function fireClear(container: IContainer) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-select-auto-complete .${getProvider("prefixCls")}-select-clear`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.mouseDown(ele);
}

export function query(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-select-auto-complete`;
  const ele = container.querySelectorAll(selector).item(index) as IContainer;
  return ele;
}
