import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefixCls = getProvider("prefixCls");

export const fireChange = (container: IContainer, value: number) => {
  const isHalfStar = !Number.isInteger(value);
  const starIntValue = Math.ceil(value);
  const selector = `.${prefixCls}-rate .${prefixCls}-rate-star > div[aria-posinset="${starIntValue}"]`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);

  fireEvent(ele, new MouseEvent("click", { clientX: isHalfStar ? -1 : 0, bubbles: true }));
};

export const fireHoverChange = (container: IContainer, value: number) => {
  const isHalfStar = !Number.isInteger(value);
  const starIntValue = Math.ceil(value);
  const selector = `.${prefixCls}-rate .${prefixCls}-rate-star > div[aria-posinset="${starIntValue}"]`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);

  fireEvent(ele, new MouseEvent("mousemove", { clientX: isHalfStar ? -1 : 0, bubbles: true }));
};
