import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector } from "../utils";

export function fireChange(container: IContainer, value: any) {
  const selector = "input";
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.change(ele, { target: { value } });
}

export function fireStepUp(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-input-number-handler-up`;
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.mouseDown(ele);
}

export function fireStepDown(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-input-number-handler-down`;
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.mouseDown(ele);
}

export function firePressEnter(container: IContainer) {
  const selector = "input";
  const inputEl = container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.keyDown(inputEl, { key: "Enter" });
}

export function fireFocus(container: IContainer) {
  const selector = "input";
  const inputEl = container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.focus(inputEl);
}

export function fireBlur(container: IContainer) {
  const selector = "input";
  const inputEl = container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.blur(inputEl);
}

export function query(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-input-number`;
  const ele = container.querySelectorAll(selector).item(index) as IContainer;
  return ele;
}
