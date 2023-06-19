import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";
import { fireOpen as fireDatePickerOpen } from "../datePicker";
import type { IContainer } from "../interface";

export function fireOpen(container: IContainer) {
  fireDatePickerOpen(container);
}

export function fireOk(container: IContainer) {
  const ele = container
    .querySelector(`.${getProvider("prefixCls")}-picker-ok`)
    ?.querySelector("button");
  if (!ele) return;
  fireEvent.click(ele);
}

type TimeString = `${string}:${string}:${string}` | `${string}:${string}`;

export function fireSelectCell(container: IContainer, index: number) {
  const ele = container.querySelectorAll(
    `li.${getProvider("prefixCls")}-picker-time-panel-cell`
  );
  if (!ele.item(index)) return;
  fireEvent.click(ele.item(index));
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
  const content = container.querySelector(
    `.${getProvider("prefixCls")}-picker-content`
  );
  if (!content) return;

  if (Array.isArray(time)) {
    // It's for RangePicker
    fireSinglePanel(content.children, time[0]);
    fireOk(container);
    fireSinglePanel(content.children, time[1]);
    fireOk(container);
  } else {
    fireSinglePanel(content.children, time);
    fireOk(container);
  }
}
