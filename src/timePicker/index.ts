import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import { fireOpen as fireDatePickerOpen } from "../datePicker";
import type { IContainer } from "../interface";
import { failedQuerySelector, queryViaSelector } from "../utils";

export function fireOpen(container: IContainer) {
  fireDatePickerOpen(container);
}

export function fireOk(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-picker-ok button`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}

type TimeString = `${string}:${string}:${string}` | `${string}:${string}`;

export function fireSelectCell(container: IContainer, index: number) {
  const selector = `li.${getProvider("prefixCls")}-picker-time-panel-cell`;
  const ele = queryViaSelector(container, selector, index);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
}

function fireSinglePanel(container: HTMLCollection, time: TimeString) {
  const [hour, minute, second] = time.split(":");
  if (hour) {
    fireSelectCell(container.item(0) as HTMLElement, Number(hour));
  }
  if (minute) {
    fireSelectCell(container.item(1) as HTMLElement, Number(minute));
  }
  if (second) {
    fireSelectCell(container.item(2) as HTMLElement, Number(second));
  }
}

export function fireChange(
  container: IContainer,
  time: TimeString | [TimeString, TimeString]
) {
  const selector = `.${getProvider("prefixCls")}-picker-content`;
  const ele = queryViaSelector(container, selector);
  if (!ele) throw failedQuerySelector(selector);

  if (Array.isArray(time)) {
    // It's for RangePicker
    fireSinglePanel(ele.children, time[0]);
    fireOk(container);
    fireSinglePanel(ele.children, time[1]);
    fireOk(container);
  } else {
    fireSinglePanel(ele.children, time);
    fireOk(container);
  }
}
