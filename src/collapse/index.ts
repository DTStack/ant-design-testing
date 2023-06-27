import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, queryViaSelector } from "../utils";

export function fireChange(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-collapse-header`;
  const ele = queryViaSelector(container, selector, index);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}
