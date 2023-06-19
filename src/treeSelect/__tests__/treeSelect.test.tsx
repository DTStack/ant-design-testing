import { cleanup, render } from "@testing-library/react";
import { TreeSelect } from "antd";
import React from "react";
import { fireOpen, fireSearch, fireSelect, fireTreeExpand } from "..";

describe("Test treeSelect's fire functions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    cleanup();
  });

  test("fireOpen", () => {
    const fn = jest.fn();
    const { container } = render(<TreeSelect onDropdownVisibleChange={fn} />);

    fireOpen(container);
    expect(fn).toBeCalled();
  });

  test("fireSearch", () => {
    const fn = jest.fn();
    const { container } = render(<TreeSelect onSearch={fn} />);

    fireSearch(container, "test");
    expect(fn).toBeCalled();
  });

  test("fireSelect", () => {
    const fn = jest.fn();
    const treeData = [
      {
        title: "Node1",
        value: "0-0",
        children: [
          {
            title: "Child Node1",
            value: "0-0-1",
          },
          {
            title: "Child Node2",
            value: "0-0-2",
          },
        ],
      },
      {
        title: "Node2",
        value: "0-1",
      },
    ];
    const { container } = render(
      <TreeSelect
        treeData={treeData}
        getPopupContainer={(node) => node.parentNode}
        onSelect={fn}
      />
    );

    fireOpen(container);
    fireSelect(container, 0);
    expect(fn).toBeCalled();
  });

  test("fireTreeExpand", () => {
    const fn = jest.fn();
    const treeData = [
      {
        title: "Node1",
        value: "0-0",
        children: [
          {
            title: "Child Node1",
            value: "0-0-1",
          },
          {
            title: "Child Node2",
            value: "0-0-2",
          },
        ],
      },
      {
        title: "Node2",
        value: "0-1",
      },
    ];
    const { container } = render(
      <TreeSelect
        treeData={treeData}
        getPopupContainer={(node) => node.parentNode}
        onTreeExpand={fn}
      />
    );

    fireOpen(container);
    fireTreeExpand(container, 0);
    expect(fn).toBeCalled();
  });
});
