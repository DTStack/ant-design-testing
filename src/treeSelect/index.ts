import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { fireOpen as fireSelectOpen } from "../select";
import { getProvider } from "../provider";

export function fireOpen(container: IContainer) {
  fireSelectOpen(container);
}

export function fireSearch(container: IContainer, value: any) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value } });
}

export function fireSelect(container: IContainer, index: number) {
  const ele = container.querySelectorAll(
    `span.${getProvider("prefixCls")}-select-tree-node-content-wrapper`
  );
  if (!ele.item(index)) return;
  fireEvent.click(ele.item(index));
}

export function fireTreeExpand(container: IContainer, index: number) {
  const ele = container
    .querySelectorAll(
      `span.${getProvider("prefixCls")}-select-tree-node-content-wrapper`
    )
    .item(index)
    ?.parentElement?.querySelector(
      `.${getProvider("prefixCls")}-select-tree-switcher`
    );
  if (!ele) return;
  fireEvent.click(ele);
}
