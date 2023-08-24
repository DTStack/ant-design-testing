import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefix = getProvider("prefixCls");

export const firePageChange = (container: IContainer, pageNum: number) => {
  const selector = `.${prefix}-pagination-item-${pageNum}`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const firePageSizeChange = (container: IContainer, index: number) => {
  const selectors = [
    `.${prefix}-pagination-options .${prefix}-select-selector`,
    `.${prefix}-pagination-options .${prefix}-select-item-option`,
  ];

  const pageSizeEle = container.querySelector(selectors[0]);
  if (!pageSizeEle) throw failedQuerySelector(selectors[0]);
  fireEvent.mouseDown(pageSizeEle);

  const pageSizeItemEle = container.querySelectorAll(selectors[1]).item(index);
  if (!pageSizeItemEle)
    throw failedQuerySelector(`${selectors[1]} with index ${index}`);
  fireEvent.click(pageSizeItemEle);
};
