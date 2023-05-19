import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";

type IContainer = HTMLElement;

const { prefixCls } = getProvider();

export function fireFocus(container: IContainer) {
  const inputEl = container.querySelector("input");
  if (!inputEl) return;
  fireEvent.focus(inputEl);
}

export function fireBlur(container: IContainer) {
  const inputEl = container.querySelector("input");
  if (!inputEl) return;
  fireEvent.blur(inputEl);
}

export function fireChange(container: IContainer, value: any) {
  const inputEl = container.querySelector("input");
  if (!inputEl) return;
  fireEvent.change(inputEl, { target: { value } });
}

export function fireClear(container: IContainer) {
  const iconEl = container.querySelector(`${prefixCls}.-input-clear-icon`);
  if (!iconEl) return;
  fireEvent.click(iconEl);
}

export function firePressEnter(container: IContainer) {
  const inputEl = container.querySelector("input");
  if (!inputEl) return;
  fireEvent.keyDown(inputEl, { key: "Enter" });
}
