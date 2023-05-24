import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";

const { prefixCls } = getProvider();

export function fireClick(container: IContainer) {
  const ele = container.querySelector(`.${prefixCls}-switch`);
  if (!ele) return;
  fireEvent.click(ele);
}

export function fireChange(container: IContainer) {
  fireClick(container);
}
