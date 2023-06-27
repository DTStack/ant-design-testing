import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import {
  failedQuerySelector,
  queryViaSelector,
  queryViaSelectors,
} from "../utils";

export const fireSelect = (container: IContainer, index: number) => {
  const selector = `.${getProvider("prefixCls")}-table-row .${getProvider(
    "prefixCls"
  )}-checkbox-input`;
  const ele = queryViaSelector(container, selector, index);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireSelectAll = (container: IContainer) => {
  const selector = `.${getProvider("prefixCls")}-table-thead .${getProvider(
    "prefixCls"
  )}-checkbox-input`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireExpand = (container: IContainer, index: number) => {
  const selectors = [
    `.${getProvider("prefixCls")}-table-row`,
    `button.${getProvider("prefixCls")}-table-row-expand-icon`,
  ];
  const ele = queryViaSelectors(container, selectors, [index]);
  if (!ele)
    throw failedQuerySelector(`${selectors[0]}[${index}] ${selectors[1]}`);
  fireEvent.click(ele);
};
