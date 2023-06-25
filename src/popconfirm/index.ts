import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

export function fireCancel(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-popover-buttons .${getProvider(
    "prefixCls"
  )}-btn`;
  const ele = container.querySelectorAll(selector).item(0);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}

export function fireConfirm(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-popover-buttons .${getProvider(
    "prefixCls"
  )}-btn`;
  const ele = container.querySelectorAll(selector).item(1);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}
