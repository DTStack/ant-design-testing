import { act, fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";
import { failedQuerySelector } from "../utils";

export const fireUploadAsync = (
  container: IContainer,
  files: File[] | { file: string }[]
) => {
  const selector = "input[type=file]";
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  act(() => {
    fireEvent.change(ele, { target: { files } });
    jest.runAllTimers();
  });
};

export const fireRemove = (container: IContainer, index: number = 0) => {
  const selector = `.${getProvider(
    "prefixCls"
  )}-upload-list-text-container:nth-child(${index + 1}) .${getProvider(
    "prefixCls"
  )}-upload-list-item .anticon-delete`;
  const ele = container.querySelector(selector);
  if (!ele) throw failedQuerySelector(selector);
  fireEvent.click(ele);
};
