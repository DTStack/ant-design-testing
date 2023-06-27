import { act, fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { _rs as onResize } from "rc-resize-observer/lib/utils/observerUtil";
import { fireClear as inputFireClear } from ".";
import { failedQuerySelector, queryViaSelector } from "../utils";

export function fireFocus(container: IContainer) {
  const selector = "textarea";
  const textareaEl = queryViaSelector(container, selector);
  if (!textareaEl) throw failedQuerySelector(selector);
  fireEvent.focus(textareaEl);
}

export function fireBlur(container: IContainer) {
  const selector = "textarea";
  const textareaEl = queryViaSelector(container, selector);
  if (!textareaEl) throw failedQuerySelector(selector);
  fireEvent.blur(textareaEl);
}

export function fireChange(container: IContainer, value: any) {
  const selector = "textarea";
  const textareaEl = queryViaSelector(container, selector);
  if (!textareaEl) throw failedQuerySelector(selector);
  fireEvent.change(textareaEl, { target: { value } });
}

export function fireClear(container: IContainer) {
  // directly call input's fireClear
  inputFireClear(container);
}

export function firePressEnter(container: IContainer) {
  const selector = "textarea";
  const textareaEl = queryViaSelector(container, selector);
  if (!textareaEl) throw failedQuerySelector(selector);
  fireEvent.keyDown(textareaEl, { keyCode: 13 });
}

export function fireResize(container: IContainer, rect: DOMRect) {
  const selector = "textarea";
  const textareaEl = queryViaSelector(container, selector);
  if (!textareaEl) throw failedQuerySelector(selector);
  const originGetBoundingClientRect = textareaEl.getBoundingClientRect;
  textareaEl.getBoundingClientRect = () => rect;

  act(() => {
    onResize([{ target: textareaEl } as unknown as ResizeObserverEntry]);
  });

  textareaEl.getBoundingClientRect = originGetBoundingClientRect;
}
