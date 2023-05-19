import React from "react";
import { render } from "@testing-library/react";
import { Input } from "antd";
import { fireChange } from "..";

describe("Test input's fire functions", () => {
  test("fireChange", () => {
    const fn = jest.fn();
    const { container } = render(<Input onChange={fn} />);
    fireChange(container, "test");

    expect(fn).toBeCalled();
  });
});
