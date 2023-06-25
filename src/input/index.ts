import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector } from "../utils";

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

export function fireChange(container: IContainer, value: any) {
  const selector = "input";
  const inputEl = container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.change(inputEl, { target: { value } });
}

export function fireClear(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-input-clear-icon`;
  const iconEl = container.querySelector(selector);
  if (!iconEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(iconEl);
}

export function firePressEnter(container: IContainer) {
  const selector = "input";
  const inputEl = container.querySelector(selector);
  if (!inputEl) {
    throw failedQuerySelector(selector);
  }
  fireEvent.keyDown(inputEl, { key: "Enter" });
}

export * as textarea from "./textarea";
