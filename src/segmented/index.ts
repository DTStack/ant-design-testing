import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, matchContainerSelf } from "../utils";

const prefix = getProvider('prefixCls');

export const fireChange = (container: IContainer, index: number) => {
  const selector = `.${prefix}-segmented .${prefix}-segmented-item`;
  const ele = container.querySelectorAll(selector)?.item(index)
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
