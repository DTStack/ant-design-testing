import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export const fireClick = (container: IContainer) => {
  const ele = container.classList.contains(`${prefixCls}-btn`)
    ? container
    : container.querySelector(`.${prefixCls}-btn`);
  if (!ele) return;
  fireEvent.click(ele);
};
