import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import type { DatePickerProps } from "antd";
import { failedQuerySelector } from "../utils";

type PanelMode = Parameters<NonNullable<DatePickerProps["onPanelChange"]>>[1];

export function fireOpen(container: IContainer) {
  const selector = "input";
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.mouseDown(ele);
  fireEvent.focus(ele);
}

export function fireClose(container: IContainer) {
  const selector = "input";
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.blur(ele);
}

export function firePanelChange(
  container: IContainer,
  mode: PanelMode = "date"
) {
  const selector = (() => {
    switch (mode) {
      case "quarter":
        return `.${getProvider("prefixCls")}-picker-header-super-prev-btn`;
      case "week":
      case "date":
        return `.${getProvider("prefixCls")}-picker-header-prev-btn`;
      case "month":
        return `.${getProvider("prefixCls")}-picker-month-btn`;
      case "year":
        return `.${getProvider("prefixCls")}-picker-year-btn`;
      case "decade":
        return `.${getProvider("prefixCls")}-picker-decade-btn`;
      default:
        return null;
    }
  })();
  if (!selector) {
    throw new Error(`${selector} is invaild selector`);
  }
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }

  fireEvent.click(ele);
}

export function fireChange(container: IContainer, text: string) {
  const eles = container.querySelectorAll("table td");
  const selector = "-in-view";
  const cell = Array.from(eles).find((td) => {
    return td.textContent === String(text) && td.className.includes(selector);
  });
  if (!cell) {
    throw failedQuerySelector(`end with ${selector}`);
  }
  fireEvent.click(cell);
}

export function fireOk(container: IContainer) {
  const selector = `.${getProvider("prefixCls")}-picker-ok > *`;
  const ele = container.querySelector(selector);
  if (!ele) {
    throw failedQuerySelector(selector);
  }
  fireEvent.click(ele);
}
