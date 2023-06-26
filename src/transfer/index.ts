import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export const fireChange = (
  container: IContainer,
  direction: "left" | "right"
) => {
  const btns = container.querySelectorAll(
    `.${prefixCls}-transfer .${prefixCls}-transfer-operation button`
  );
  if (!btns.length) return;
  const toRightBtn = btns[0],
    toLeftBtn = btns[1];

  if (direction === "left" && toLeftBtn) {
    fireEvent.click(toLeftBtn);
  }
  if (direction === "right" && toRightBtn) {
    fireEvent.click(toRightBtn);
  }
};

export const fireScroll = (
  container: IContainer,
  type: "source" | "target" = "source"
) => {
  const scrollTargetIndex = type === "source" ? 0 : 1;
  const ele = container
    .querySelectorAll(`.${prefixCls}-transfer-list`)
    .item(scrollTargetIndex)
    .querySelectorAll(`.${prefixCls}-transfer-list-content`)
    .item(0);
  if (!ele) return;

  fireEvent.scroll(ele);
};

export const fireSearch = (
  container: IContainer,
  opts: { searchText: string; direction: "left" | "right" }
) => {
  const { direction, searchText } = opts;
  const searchTargetIndex = direction === 'left' ? 0 : 1;
  const ele = container
    .querySelectorAll(`.${prefixCls}-transfer-list-search`)[searchTargetIndex]
    ?.querySelector(".ant-input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value: searchText } } );
};
