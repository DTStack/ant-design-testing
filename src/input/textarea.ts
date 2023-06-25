import { act, fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { _rs as onResize } from "rc-resize-observer/lib/utils/observerUtil";
import { fireClear as inputFireClear } from ".";

export function fireFocus(container: IContainer) {
  const textareaEl = container.querySelector("textarea");
  if (!textareaEl) return;
  fireEvent.focus(textareaEl);
}

export function fireBlur(container: IContainer) {
  const textareaEl = container.querySelector("textarea");
  if (!textareaEl) return;
  fireEvent.blur(textareaEl);
}

export function fireChange(container: IContainer, value: any) {
  const textareaEl = container.querySelector("textarea");
  if (!textareaEl) return;
  fireEvent.change(textareaEl, { target: { value } });
}

export function fireClear(container: IContainer) {
  // directly call input's fireClear
  inputFireClear(container);
}

export function firePressEnter(container: IContainer) {
  const textareaEl = container.querySelector("textarea");
  if (!textareaEl) return;
  fireEvent.keyDown(textareaEl, { keyCode: 13 });
}

export function fireResize(container: IContainer, rect: DOMRect) {
  const textareaEl = container.querySelector("textarea");
  if (!textareaEl) return;
  const originGetBoundingClientRect = textareaEl.getBoundingClientRect;
  textareaEl.getBoundingClientRect = () => rect;

  act(() => {
    onResize([{ target: textareaEl } as unknown as ResizeObserverEntry]);
  });

  textareaEl.getBoundingClientRect = originGetBoundingClientRect;
}
