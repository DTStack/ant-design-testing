import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

export function fireOpen(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-select-selector`;
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.mouseDown(ele);
}

export function fireChange(
  container: IContainer,
  type: string,
  ...indexes: number[]
) {
  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    const selector = `li.${getProvider("prefixCls")}-cascader-menu-item`;
    const ele = container
      .querySelectorAll(`ul.${getProvider("prefixCls")}-cascader-menu`)
      ?.item(i)
      .querySelectorAll(selector);
    if (!ele?.item(index)) {
      throw failedQuerySelector(selector);
    }
    fireEvent[type as keyof typeof fireEvent]?.(ele.item(index));
  }
}

export function fireSearch(container: IContainer, value: string) {
  const selector = "input";
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.change(ele, { target: { value } });
}
