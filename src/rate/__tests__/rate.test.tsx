import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Breadcrumb, Rate } from "antd";
import { fireChange, fireHoverChange } from "..";

describe("Test rate's fire functions", () => {
  test("test fireChange", () => {
    const fn = jest.fn();
    const { container } = render(
      <Rate allowHalf onChange={fn}/>
    );
    // fireChange(container, 3)
    // expect(fn).toBeCalledWith(3)
    // cleanup()
    fireChange(container, 3.5)
    expect(fn).lastCalledWith(3.5)
  });

    test("test fireHoverChange", () => {
    const fn = jest.fn();
    const { container } = render(
      <Rate allowHalf onHoverChange={fn}/>
    );
    fireHoverChange(container, 3.5)
    expect(fn).toBeCalledWith(3.5)
    // cleanup()
    // fireHoverChange(container, 1)
    // fireHoverChange(container, 4.5)
    // expect(fn.mock.calls[0][0]).toBe(1);
    // expect(fn.mock.calls[1][0]).toBe(4.5)
  });
  
});
