import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefixCls = getProvider("prefixCls");

export const fireTabChange = (container: IContainer, key: string) => {
  const selector = `.${prefixCls}-card-contain-tabs .${prefixCls}-card-head .${prefixCls}-tabs-tab[data-node-key="${key}"]`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
