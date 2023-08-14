import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefix = getProvider('prefixCls');

export const fireClick = (container: IContainer) => {
  const selector = `.${prefix}-message-notice`;
  const ele = container.querySelector(selector)
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
