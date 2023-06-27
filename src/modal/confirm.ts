import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { act, fireEvent } from "@testing-library/react";
import {
  failedQuerySelector,
  failedTriggerElement,
  queryViaSelector,
} from "../utils";

export function fireOpen(ele?: HTMLElement) {
  if (!ele) throw failedTriggerElement();

  act(() => {
    fireEvent.click(ele);
    jest.runAllTimers();
  });
}

export function fireOk(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-modal-confirm-btns button`;
  const ele = queryViaSelector(container, selector, 1);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}

export function fireCancel(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-modal-confirm-btns button`;
  const ele = queryViaSelector(container, selector, 0);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}
