import React from "react";
import { render } from "@testing-library/react";
import { Rate } from "antd";
import { fireChange, fireHoverChange } from "..";

describe("Test rate's fire functions", () => {
  test("test fireChange", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Rate allowHalf onChange={onChange}/>
    );
    fireChange(container, 3);
    expect(onChange).toBeCalledWith(3)
    fireChange(container, 3.5)
    expect(onChange).lastCalledWith(3.5)
  });

    test("test fireHoverChange", () => {
    const onHoverChange = jest.fn();
    const { container } = render(
      <Rate allowHalf onHoverChange={onHoverChange}/>
    );
    fireHoverChange(container, 3.5)
    expect(onHoverChange).toBeCalledWith(3.5)
    fireHoverChange(container, 1)
    expect(onHoverChange).lastCalledWith(1)
  });
  
});
