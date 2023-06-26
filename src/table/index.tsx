import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export const fireSelect = (container: IContainer, index: number) => {
  const ele = container.querySelectorAll(
    `.${prefixCls}-table-row .${prefixCls}-checkbox-input`
  )[index];
  if (!ele) return;
  fireEvent.click(ele);
};

export const fireSelectAll = (container: IContainer) => {
  const ele = container.querySelector(
    `.${prefixCls}-table-thead .${prefixCls}-checkbox-input`
  );
  if (!ele) return;
  fireEvent.click(ele);
};

export const fireExpand = (container: IContainer, index: number) => {
  const ele = container
    .querySelectorAll(`.${prefixCls}-table-row`)
    [index]?.querySelector(`button.${prefixCls}-table-row-expand-icon`);
  if (!ele) return;
  fireEvent.click(ele);
};
