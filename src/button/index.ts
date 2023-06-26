import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

export const fireClick = (container: IContainer) => {
  const selector = `.${getProvider('prefixCls')}-btn`;
  const ele = container.classList.contains(selector.substring(1))
    ? container
    : container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
