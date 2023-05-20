import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";

const { prefixCls } = getProvider();

export function fireChange(container: IContainer, value: any) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value } });
}

export function fireOpen(container: IContainer) {
  const ele = container.querySelector(`${prefixCls}-select-selector`);
  if (!ele) return;
  fireEvent.mouseDown(ele);
}

export function fireSelect(container: IContainer, index: number) {
  const ele = container.querySelectorAll(
    `div.${prefixCls}-select-item-option-content`
  );
  if (!ele.item(index)) return;
  fireEvent.click(ele.item(index));
}
