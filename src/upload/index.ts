import { fireEvent } from "@testing-library/react";
import type { IContainer } from "../interface";
import { getProvider } from "../provider";

const { prefixCls } = getProvider();

export const fireUploadAsync = (
  container: IContainer,
  files: File[] | { file: string }[]
) => {
  const ele = container.querySelector("input[type=file]");
  if (!ele) return;
  fireEvent.change(ele, { target: { files } });
};

export const fireRemove = (container: IContainer, index: number = 0) => {
  const selector = `.${prefixCls}-upload-list-text-container:nth-child(${
    index + 1
  }) .${prefixCls}-upload-list-item .anticon-delete`;
  const ele = container.querySelector(selector);
  if (!ele) return;
  fireEvent.click(ele);
};
