import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

export function fireChange(container: IContainer, index: number) {
  const selector = `.${getProvider("prefixCls")}-checkbox-input`;
  const ele = container.querySelectorAll(selector).item(index);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}
