import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export function fireClose(
  container: IContainer,
  opt: { closeByMask: boolean } = { closeByMask: true }
) {
  const selector = opt.closeByMask
    ? `.${prefixCls}-drawer-mask`
    : `.${prefixCls}-drawer-close`;
  const ele = container.querySelector(selector);
  if (!ele) return;
  fireEvent.click(ele);
}
