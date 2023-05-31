import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export function fireCancel(container: IContainer) {
  const ele = container
    .querySelector(`.${prefixCls}-popover-buttons`)
    ?.querySelectorAll(`.${prefixCls}-btn`);
  if (!ele?.item(0)) return;
  fireEvent.click(ele.item(0));
}

export function fireConfirm(container: IContainer) {
  const ele = container
    .querySelector(`.${prefixCls}-popover-buttons`)
    ?.querySelectorAll(`.${prefixCls}-btn`);
  if (!ele?.item(1)) return;
  fireEvent.click(ele.item(1));
}
