import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, failedQuerySelectors } from "../utils";

export const fireSelect = (container: IContainer, index: number) => {
  const selector = `.${getProvider("prefixCls")}-table-row .${getProvider(
    "prefixCls"
  )}-checkbox-input`;
  const ele = container.querySelectorAll(selector)[index];
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireSelectAll = (container: IContainer) => {
  const selector = `.${getProvider("prefixCls")}-table-thead .${getProvider(
    "prefixCls"
  )}-checkbox-input`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireExpand = (container: IContainer, index: number) => {
  const selectors = [
    `.${getProvider("prefixCls")}-table-row`,
    `button.${getProvider("prefixCls")}-table-row-expand-icon`,
  ];
  const ele = container
    .querySelectorAll(selectors[0])
    [index]?.querySelector(selectors[1]);
  if (!ele) throw failedQuerySelectors(selectors);
  fireEvent.click(ele);
};
