import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import {
  failedQuerySelector,
  failedQuerySelectors,
  queryViaSelector,
} from "../utils";

export function fireMouseEnter(container: IContainer) {
  const selectors = [
    `.${getProvider("prefixCls")}-radio-group`,
    `.${getProvider("prefixCls")}-radio-wrapper`,
  ];
  let i = 0;
  const ele =
    queryViaSelector(container, selectors[i++]) ||
    queryViaSelector(container, selectors[i++]);
  if (!ele) throw failedQuerySelectors(selectors);
  fireEvent.mouseEnter(ele);
}

export function fireMouseLeave(container: IContainer) {
  const selectors = [
    `.${getProvider("prefixCls")}-radio-group`,
    `.${getProvider("prefixCls")}-radio-wrapper`,
  ];
  let i = 0;
  const ele =
    queryViaSelector(container, selectors[i++]) ||
    queryViaSelector(container, selectors[i++]);
  if (!ele) throw failedQuerySelectors(selectors);
  fireEvent.mouseLeave(ele);
}

export function fireChange(container: IContainer, value: any) {
  const selector = `input.${getProvider(
    "prefixCls"
  )}-radio-input[value="${value}"]`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}
