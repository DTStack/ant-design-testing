import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, queryViaSelector } from "../utils";

export function fireOpen(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-select-selector`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
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
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.change(ele, { target: { value } });
}

export function query(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-cascader`;
  const ele = queryViaSelector(container, selector, index);
  return ele;
}
