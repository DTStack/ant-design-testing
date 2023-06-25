import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { act, fireEvent } from "@testing-library/react";

export async function fireOpen(ele?: HTMLElement) {
  if (!ele) {
    return;
  }

  await act(async () => {
    fireEvent.click(ele);
    await jest.runAllTimersAsync();
  });
}

export function fireOk(container: IContainer) {
  const eles = container.querySelectorAll(
    `.${getProvider("prefixCls")}-modal-confirm-btns button`
  );
  if (!eles.item(1)) {
    return;
  }
  fireEvent.click(eles.item(1));
}

export function fireCancel(container: IContainer) {
  const eles = container.querySelectorAll(
    `.${getProvider("prefixCls")}-modal-confirm-btns button`
  );
  if (!eles.item(0)) {
    return;
  }
  fireEvent.click(eles.item(0));
}
