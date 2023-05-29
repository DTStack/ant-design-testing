import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export function fireCancelButton(container: IContainer) {
  const ele = container
    .querySelector(`.${prefixCls}-modal-footer`)
    ?.querySelectorAll(`button.${prefixCls}-btn`);
  if (!ele?.item(0)) return;
  fireEvent.click(ele.item(0));
}

export function fireOk(container: IContainer) {
  const ele = container
    .querySelector(`.${prefixCls}-modal-footer`)
    ?.querySelectorAll(`button.${prefixCls}-btn`);
  if (!ele?.item(1)) return;
  fireEvent.click(ele.item(1));
}

export function fireCancel(
  container: IContainer,
  opt: { closeByButton: boolean } = { closeByButton: true }
) {
  if (!opt.closeByButton) {
    const ele = container.querySelector(`.${prefixCls}-modal-close`);
    if (!ele) return;
    fireEvent.click(ele);
  } else {
    fireCancelButton(container);
  }
}
