import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

const prefix = getProvider('prefixCls');

export const fireMenuItemClick = (container: IContainer, index: number) => {
  const selector = `li.${prefix}-menu-item`;
  const ele = container.querySelectorAll(selector)[index];
  if (!ele) throw failedQuerySelector(`${selector} with index ${index}`);
  fireEvent.click(ele);
};

export const fireSubMenuClick = (container: IContainer, index: number) => {
  const selector = `div.${prefix}-menu-submenu-title`;
  const ele = container.querySelectorAll(selector)[index];
  if (!ele) throw failedQuerySelector(`${selector} with index ${index}`);
  fireEvent.click(ele);
}
