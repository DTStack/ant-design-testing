import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector, failedQuerySelectors } from "../utils";

const prefixCls = getProvider("prefixCls");

export const fireChange = (
  container: IContainer,
  direction: "left" | "right"
) => {
  const selector = `.${prefixCls}-transfer .${prefixCls}-transfer-operation button`;
  const btns = container.querySelectorAll(selector);
  if (!btns.length) throw failedQuerySelector(selector);

  const toRightBtn = btns[0],
    toLeftBtn = btns[1];

  if (direction === "left" && toLeftBtn) {
    fireEvent.click(toLeftBtn);
  } else if (direction === "right" && toRightBtn) {
    fireEvent.click(toRightBtn);
  } else {
    throw failedQuerySelector(selector);
  }
};

export const fireScroll = (
  container: IContainer,
  type: "source" | "target" = "source"
) => {
  const selectors = [`.${prefixCls}-transfer-list`, `.${prefixCls}-transfer-list-content`]
  const scrollTargetIndex = type === "source" ? 0 : 1;
  const ele = container
    .querySelectorAll(selectors[0])
    .item(scrollTargetIndex)
    .querySelectorAll(selectors[1])
    .item(0);
  if (!ele) throw failedQuerySelectors(selectors);
  fireEvent.scroll(ele);
};

export const fireSearch = (
  container: IContainer,
  opts: { searchText: string; direction: "left" | "right" }
) => {
  const { direction, searchText } = opts;
  const selector = `.${prefixCls}-transfer-list-search`;
  const searchTargetIndex = direction === "left" ? 0 : 1;
  const ele = container
    .querySelectorAll(selector)
    [searchTargetIndex]?.querySelector(".ant-input");
  if (!ele) throw failedQuerySelector(selector);

  fireEvent.change(ele, { target: { value: searchText } });
};
