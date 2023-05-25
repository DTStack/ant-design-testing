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

// TODO
export function fireExpand(container: IContainer, title: string) {}
