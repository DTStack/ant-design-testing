import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, matchContainerSelf } from "../utils";

export const fireClick = (container: IContainer) => {
  const selector = `.${getProvider('prefixCls')}-btn`;
  const ele = matchContainerSelf(container, selector)
    ? container
    : container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
