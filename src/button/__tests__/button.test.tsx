import React from "react";
import { render } from "@testing-library/react";
import { Button } from "antd";
import { fireClick } from "..";

describe("Test Button's fire functions", () => {
  test("test fireClick", () => {
    const fn = jest.fn();
    const { container } = render(<Button onClick={fn}>Button</Button>);
    fireClick(container);
    expect(fn).toBeCalled();
  });
});
