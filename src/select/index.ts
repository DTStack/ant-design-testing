import { act, fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";

export function fireChange(container: IContainer, value: any) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value } });
}

export function fireOpen(container: IContainer) {
  const ele = container.querySelector(
    `.${getProvider("prefixCls")}-select-selector`
  );
  if (!ele) return;
  act(() => {
    fireEvent.mouseDown(ele);
    jest.runAllTimers();
  });
}

export function fireSelect(container: IContainer, index: number) {
  const ele = container.querySelectorAll(
    `div.${getProvider("prefixCls")}-select-item-option-content`
  );
  if (!ele.item(index)) return;
  fireEvent.click(ele.item(index));
}

export function fireDeSelect(container: IContainer, index: number) {
  const ele = container.querySelectorAll(
    `.${getProvider("prefixCls")}-select-selection-item`
  );
  if (!ele.item(index)) return;
  const clear = ele
    .item(index)
    .querySelector(`.${getProvider("prefixCls")}-select-selection-item-remove`);
  if (!clear) return;
  fireEvent.click(clear);
}

export function fireFocus(container: IContainer) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.focus(ele);
}

export function fireBlur(container: IContainer) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.blur(ele);
}

export function fireClear(container: IContainer) {
  const ele = container.querySelector(
    `.${getProvider("prefixCls")}-select-clear`
  );
  if (!ele) return;
  fireEvent.mouseDown(ele);
}
