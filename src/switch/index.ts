import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector, judgeContainerMatchSelf } from "../utils";

export function fireClick(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-switch`;
  const ele = judgeContainerMatchSelf(container, selector) ? container : container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}

export function fireChange(container: IContainer) {
  fireClick(container);
}

export function query(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-switch`;
  const ele = container.querySelectorAll(selector).item(index) as IContainer;
  return ele;
}
