import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

export function fireOpen(container: IContainer) {
  const ele = container.querySelector(
    `.${getProvider("prefixCls")}-select-selector`
  );
  if (!ele) return;
  fireEvent.mouseDown(ele);
}

export function fireChange(
  container: IContainer,
  type: string,
  ...indexes: number[]
) {
  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    const ele = container
      .querySelectorAll<HTMLUListElement>(
        `ul.${getProvider("prefixCls")}-cascader-menu`
      )
      ?.item(i);
    const li = ele?.querySelectorAll<HTMLLIElement>(
      `li.${getProvider("prefixCls")}-cascader-menu-item`
    );
    if (!li?.item(index)) return;
    fireEvent[type as keyof typeof fireEvent]?.(li.item(index));
  }
}

export function fireSearch(container: IContainer, value: string) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value } });
}
