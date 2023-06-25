import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { failedQuerySelector } from "../utils";

export function fireClick(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-switch`;
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}

export function fireChange(container: IContainer) {
  fireClick(container);
}
