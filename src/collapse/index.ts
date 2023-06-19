import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

export function fireChange(container: IContainer, index: number) {
  const ele = container.querySelectorAll(
    `.${getProvider("prefixCls")}-collapse-header`
  );
  if (!ele.item(index)) return;
  fireEvent.click(ele.item(index));
}
