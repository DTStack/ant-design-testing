import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, queryViaSelector } from "../utils";

export const fireClick = (container: IContainer) => {
  const selector = `.${getProvider("prefixCls")}-btn`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
