import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefix = getProvider('prefixCls');

export const fireClick = (container: IContainer) => {
  const selector = `.${prefix}-notification-notice`;
  const ele = container.querySelector(selector)
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};

export const fireClose = (container: IContainer) => {
  const selectors = [`.${prefix}-notification-notice-close`, `.${prefix}-notification-notice-btn`];
  const ele = container.querySelector(selectors[0]) || container.querySelector(selectors[1])
  if (!ele) throw failedQuerySelector(`${selectors[0]} or ${selectors[1]}`);
  fireEvent.click(ele);
};
