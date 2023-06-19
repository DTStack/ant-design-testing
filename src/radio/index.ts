import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

export function fireMouseEnter(container: IContainer) {
  const ele =
    container.querySelector(`.${getProvider("prefixCls")}-radio-group`) ||
    container.querySelector(`.${getProvider("prefixCls")}-radio-wrapper`);
  if (!ele) return;
  fireEvent.mouseEnter(ele);
}

export function fireMouseLeave(container: IContainer) {
  const ele =
    container.querySelector(`.${getProvider("prefixCls")}-radio-group`) ||
    container.querySelector(`.${getProvider("prefixCls")}-radio-wrapper`);
  if (!ele) return;
  fireEvent.mouseLeave(ele);
}

export function fireChange(container: IContainer, value: any) {
  const ele = container.querySelector(
    `input.${getProvider("prefixCls")}-radio-input[value="${value}"]`
  );
  if (!ele) return;
  fireEvent.click(ele);
}
