import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { act, fireEvent } from "@testing-library/react";
import { failedQuerySelector, failedTriggerElement } from "../utils";

export async function fireOpen(ele?: HTMLElement) {
  if (!ele) {
    throw failedTriggerElement();
  }

  await act(async () => {
    fireEvent.click(ele);
    await jest.runAllTimersAsync();
  });
}

export function fireOk(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-modal-confirm-btns button`;
  const ele = container
    .querySelectorAll(`.${getProvider("prefixCls")}-modal-confirm-btns button`)
    .item(1);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}

export function fireCancel(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-modal-confirm-btns button`;
  const ele = container.querySelectorAll(selector).item(0);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}
