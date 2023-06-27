import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import {
  failedQuerySelector,
  failedQuerySelectors,
  queryViaSelector,
  queryViaSelectors,
} from "../utils";

export const fireChange = (
  container: IContainer,
  direction: "left" | "right"
) => {
  const selector = `.${getProvider("prefixCls")}-transfer .${getProvider(
    "prefixCls"
  )}-transfer-operation button`;
  const toRightBtn = queryViaSelector(container, selector, 0);
  const toLeftBtn = queryViaSelector(container, selector, 1);

  const btn = direction === "left" ? toLeftBtn : toRightBtn;
  if (!btn) throw failedQuerySelector(selector);
  fireEvent.click(btn);
};

export const fireScroll = (
  container: IContainer,
  type: "source" | "target" = "source"
) => {
  const selectors = [
    `.${getProvider("prefixCls")}-transfer-list`,
    `.${getProvider("prefixCls")}-transfer-list-content`,
  ];
  const scrollTargetIndex = type === "source" ? 0 : 1;
  const ele = queryViaSelectors(container, selectors, [scrollTargetIndex, 0]);
  if (!ele)
    throw failedQuerySelector(
      `${selectors[0]}[${scrollTargetIndex}] ${selectors[1]}[0]`
    );
  fireEvent.scroll(ele);
};

export const fireSearch = (
  container: IContainer,
  opts: { searchText: string; direction: "left" | "right" }
) => {
  const { direction, searchText } = opts;
  const selectors = [
    `.${getProvider("prefixCls")}-transfer-list-search`,
    `.${getProvider("prefixCls")}-input`,
  ];
  const searchTargetIndex = direction === "left" ? 0 : 1;
  const ele = queryViaSelectors(container, selectors, [searchTargetIndex]);
  if (!ele)
    throw failedQuerySelector(
      `${selectors[0]}[${searchTargetIndex}] ${selectors[1]}`
    );

  fireEvent.change(ele, { target: { value: searchText } });
};
