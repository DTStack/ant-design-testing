import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelectors } from "../utils";

export const fireClick = (container: IContainer, index: number) => {
  const selectors = [`.${getProvider('prefixCls')}-breadcrumb li`, `.${getProvider("prefixCls")}-breadcrumb-link`];
  const ele = container
    .querySelectorAll(selectors[0])
    .item(index)
    .querySelector(selectors[1]);
  if (!ele) throw failedQuerySelectors(selectors);
  fireEvent.click(ele);
};
