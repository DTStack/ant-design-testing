import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector, judgeContainerMatchSelf } from "../utils";

const prefixCls = getProvider("prefixCls");

export function fireFocus(container: IContainer) {
  const selector = "input";
  const inputEl = judgeContainerMatchSelf(container, selector)
    ? container
    : container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.focus(inputEl);
}

export function fireBlur(container: IContainer) {
  const selector = "input";
  const inputEl = judgeContainerMatchSelf(container, selector)
    ? container
    : container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.blur(inputEl);
}

export function fireChange(container: IContainer, value: any) {
  const selector = "input";
  const inputEl = judgeContainerMatchSelf(container, selector)
    ? container
    : container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.change(inputEl, { target: { value } });
}

export function fireClear(container: IContainer) {
  let selector = "";
  let iconEl = null;
  if (judgeContainerMatchSelf(container, "input")) {
    selector = `.${prefixCls}-input~.${prefixCls}-input-suffix .${prefixCls}-input-clear-icon`;
    iconEl = container.parentElement?.querySelector(selector);
  } else {
    selector = `.${prefixCls}-input-clear-icon`;
    iconEl = container.querySelector(selector);
  }

  if (!iconEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(iconEl);
}

export function firePressEnter(container: IContainer) {
  const selector = "input";
  const inputEl = judgeContainerMatchSelf(container, selector)
    ? container
    : container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.keyDown(inputEl, { key: "Enter" });
}

export function query(container: IContainer, index: number) {
  const selector = `.${prefixCls}-input`;
  const ele = container.querySelectorAll(selector).item(index) as IContainer;
  return ele;
}

export * as textarea from "./textarea";
