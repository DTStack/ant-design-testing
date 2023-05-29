import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { fireOpen as fireSelectOpen } from "../select";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export function fireOpen(container: IContainer) {
  fireSelectOpen(container);
}

export function fireSearch(container: IContainer, value: any) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value } });
}

export function fireSelect(container: IContainer, text: string) {
  const ele = container.querySelector(
    `span.${prefixCls}-select-tree-node-content-wrapper[title="${text}"]`
  );
  if (!ele) return;
  fireEvent.click(ele);
}

export function fireTreeExpand(container: IContainer, text: string) {
  const ele = container
    .querySelector(
      `span.${prefixCls}-select-tree-node-content-wrapper[title="${text}"]`
    )
    ?.parentElement?.querySelector(`.${prefixCls}-select-tree-switcher`);
  if (!ele) return;
  fireEvent.click(ele);
}
