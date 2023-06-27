import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, queryViaSelector } from "../utils";

export function fireCancelButton(container: IContainer) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-modal-footer button.${getProvider("prefixCls")}-btn`;
  const ele = queryViaSelector(container, selector, 0);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}

export function fireOk(container: IContainer) {
  const selector = `.${getProvider(
    "prefixCls"
  )}-modal-footer button.${getProvider("prefixCls")}-btn`;
  const ele = queryViaSelector(container, selector, 1);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}

export function fireCancel(
  container: IContainer,
  opt: { closeByButton: boolean } = { closeByButton: true }
) {
  if (!opt.closeByButton) {
    const selector = `.${getProvider("prefixCls")}-modal-close`;
    const ele = queryViaSelector(container, selector);
    if (!ele) throw failedQuerySelector(selector);
    fireEvent.click(ele);
  } else {
    fireCancelButton(container);
  }
}

export * as confirm from "./confirm";
