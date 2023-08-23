import { fireEvent, getByText } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefix = getProvider("prefixCls");

export const fireClose = (container: IContainer, title: string) => {
  const selector = `.${prefix}-tag-close-icon`;
  const ele = getByText(container, title).querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele!);
};
