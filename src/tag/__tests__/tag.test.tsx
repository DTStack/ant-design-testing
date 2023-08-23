import React from "react";
import { render } from "@testing-library/react";
import { Tag } from "antd";
import { fireClose } from "..";

describe("Test Tag's fire functions", () => {
  test("test fireClose", () => {
    const fn = jest.fn();
    const { container } = render(
      <div>
        <Tag>tag1</Tag>
        <Tag closable onClose={fn}>
          tag2
        </Tag>
        <Tag>tag3</Tag>
      </div>
    );
    fireClose(container, "tag2");
    expect(fn).toHaveBeenCalled();
  });
});
