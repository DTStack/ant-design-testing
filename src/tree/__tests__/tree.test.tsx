import { cleanup, fireEvent, render } from "@testing-library/react";
import { Tree } from "antd";
import React from "react";
import { fireCheck } from "..";

const treeData: DataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

describe("Test Tree's fire functions", () => {
  beforeEach(cleanup);

  test("fireCheck", () => {
    const fn = jest.fn();
    const { container } = render(
      <Tree checkable onCheck={fn} treeData={treeData} />
    );

    fireCheck(container, "parent 1");
  });

  test("fireExpand", () => {});
});
