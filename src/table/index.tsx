import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, failedQuerySelectors } from "../utils";

const  prefixCls = getProvider('prefixCls');

export const fireSelect = (container: IContainer, index: number) => {
  const selector =  `.${prefixCls}-table-row .${prefixCls}-checkbox-input`
  const ele = container.querySelectorAll(
   selector
  )[index];
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireSelectAll = (container: IContainer) => {
  const selector = `.${prefixCls}-table-thead .${prefixCls}-checkbox-input`
  const ele = container.querySelector(
    selector
  );
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireExpand = (container: IContainer, index: number) => {
  const selectors = [`.${prefixCls}-table-row`, `button.${prefixCls}-table-row-expand-icon`]
  const ele = container
    .querySelectorAll(selectors[0])
    [index]?.querySelector(selectors[1]);
  if (!ele) throw failedQuerySelectors(selectors);
  fireEvent.click(ele);
};
