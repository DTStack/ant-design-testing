import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";

const { prefixCls } = getProvider();

export function fireCheck(container: IContainer, title: string) {
  const ele = container
    .querySelector(`.${prefixCls}-tree-node-content-wrapper[title="${title}"]`)
    ?.parentElement?.querySelector(`.${prefixCls}-tree-checkbox`);
  if (!ele) return;
  fireEvent.click(ele);
}

export function fireExpand(container: IContainer, title: string) {
  const ele = container
    .querySelector(`.${prefixCls}-tree-node-content-wrapper[title="${title}"]`)
    ?.parentElement?.querySelector(`.${prefixCls}-tree-switcher`);
  if (!ele) return;
  fireEvent.click(ele);
}

export function fireRightClick(container: IContainer, title: string) {
  const ele = container.querySelector(
    `.${prefixCls}-tree-node-content-wrapper[title="${title}"]`
  );
  if (!ele) return;
  fireEvent.contextMenu(ele);
}

export function fireSelect(container: IContainer, title: string) {
  const ele = container.querySelector(
    `.${prefixCls}-tree-node-content-wrapper[title="${title}"]`
  );
  if (!ele) return;
  fireEvent.click(ele);
}

// TODO
export function fireDrag() {}
