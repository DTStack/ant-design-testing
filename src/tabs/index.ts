import { getProvider } from "../provider";
import type { IContainer } from "../interface";
import { fireEvent } from "@testing-library/react";
import type { TabsProps } from "antd";

export function fireClick(container: IContainer, activeKey: string) {
  const ele = container.querySelector(
    `.${getProvider("prefixCls")}-tabs-tab[data-node-key="${activeKey}"]`
  );
  if (!ele) return;
  fireEvent.click(ele);
}

export function fireChange(container: IContainer, activeKey: string) {
  fireClick(container, activeKey);
}

type ActionType = Parameters<NonNullable<TabsProps["onEdit"]>>[1];
export function fireEdit(container: IContainer, action: "add"): void;
export function fireEdit(
  container: IContainer,
  action: "remove",
  activeKey: string
): void;
export function fireEdit(
  container: IContainer,
  action: ActionType,
  activeKey?: string
) {
  switch (action) {
    case "add": {
      const ele = container.querySelector(
        `.${getProvider("prefixCls")}-tabs-nav-add`
      );
      if (!ele) return;
      fireEvent.click(ele);
      break;
    }
    case "remove": {
      const ele = container
        .querySelector(
          `.${getProvider("prefixCls")}-tabs-tab[data-node-key="${activeKey}"]`
        )
        ?.querySelector(`.${getProvider("prefixCls")}-tabs-tab-remove`);
      if (!ele) return;
      fireEvent.click(ele);
      break;
    }

    default:
      break;
  }
}
