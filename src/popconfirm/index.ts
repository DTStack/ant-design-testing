import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

export function fireCancel(container: IContainer) {
  const ele = container
    .querySelector(`.${getProvider("prefixCls")}-popover-buttons`)
    ?.querySelectorAll(`.${getProvider("prefixCls")}-btn`);
  if (!ele?.item(0)) return;
  fireEvent.click(ele.item(0));
}

export function fireConfirm(container: IContainer) {
  const ele = container
    .querySelector(`.${getProvider("prefixCls")}-popover-buttons`)
    ?.querySelectorAll(`.${getProvider("prefixCls")}-btn`);
  if (!ele?.item(1)) return;
  fireEvent.click(ele.item(1));
}
