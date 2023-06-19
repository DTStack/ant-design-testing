import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";

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
  const iconEl = container.querySelector(
    `.${getProvider("prefixCls")}-input-clear-icon`
  );
  if (!iconEl) return;
  fireEvent.click(iconEl);
}

export function firePressEnter(container: IContainer) {
  const inputEl = container.querySelector("input");
  if (!inputEl) return;
  fireEvent.keyDown(inputEl, { key: "Enter" });
}
