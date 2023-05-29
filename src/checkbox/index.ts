import { fireEvent } from "@testing-library/react";
import type { IContainer } from "src/interface";
import { getProvider } from "src/provider";

const { prefixCls } = getProvider();

export function fireChange(container: IContainer, index: number) {
  const ele = container.querySelectorAll(`.${prefixCls}-checkbox-input`);
  if (!ele.item(index)) return;
  fireEvent.click(ele.item(index));
}
