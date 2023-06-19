import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import type { DatePickerProps } from "antd";

type PanelMode = Parameters<NonNullable<DatePickerProps["onPanelChange"]>>[1];

export function fireOpen(container: IContainer) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.mouseDown(ele);
  fireEvent.focus(ele);
}

export function fireClose(container: IContainer) {
  const ele = container.querySelector("input");
  if (!ele) return;
  fireEvent.blur(ele);
}

export function firePanelChange(
  container: IContainer,
  mode: PanelMode = "date"
) {
  const ele = (() => {
    switch (mode) {
      case "quarter":
        return container.querySelector(
          `.${getProvider("prefixCls")}-picker-header-super-prev-btn`
        );
      case "week":
      case "date":
        return container.querySelector(
          `.${getProvider("prefixCls")}-picker-header-prev-btn`
        );
      case "month":
        return container.querySelector(
          `.${getProvider("prefixCls")}-picker-month-btn`
        );
      case "year":
        return container.querySelector(
          `.${getProvider("prefixCls")}-picker-year-btn`
        );
      case "decade":
        return container.querySelector(
          `.${getProvider("prefixCls")}-picker-decade-btn`
        );
      default:
        return null;
    }
  })();
  if (!ele) return;

  fireEvent.click(ele);
}

export function fireChange(container: IContainer, text: string) {
  const table = container.querySelector("table");
  const cell = Array.from(table?.querySelectorAll("td") || []).find((td) => {
    return td.textContent === String(text) && td.className.includes("-in-view");
  });
  if (!cell) return;
  fireEvent.click(cell);
}
