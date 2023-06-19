import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import type { IContainer } from "../interface";

export function fireChange(container: IContainer, value: any) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.change(ele, { target: { value } });
}

export function fireStepUp(container: IContainer) {
  const ele = container.querySelector(
    `.${getProvider("prefixCls")}-input-number-handler-up`
  );
  if (!ele) return;
  fireEvent.mouseDown(ele);
}

export function fireStepDown(container: IContainer) {
  const ele = container.querySelector(
    `.${getProvider("prefixCls")}-input-number-handler-down`
  );
  if (!ele) return;
  fireEvent.mouseDown(ele);
}

export function firePressEnter(container: IContainer) {
  const inputEl = container.querySelector("input");
  if (!inputEl) return;
  fireEvent.keyDown(inputEl, { key: "Enter" });
}

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
