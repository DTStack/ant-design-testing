import React from "react";
import { render } from "@testing-library/react";
import { Input } from "antd";
import { fireBlur, fireChange, fireClear, fireFocus, firePressEnter } from "..";

describe("Test input's fire functions", () => {
  test("fireChange", () => {
    const fn = jest.fn();
    const { container } = render(<Input onChange={fn} />);
    fireChange(container, "test");

    expect(fn).toBeCalled();
  });

  test("fireFocus", () => {
    const fn = jest.fn();
    const { container } = render(<Input onFocus={fn} />);
    fireFocus(container);

    expect(fn).toBeCalled();
  });

  test("fireBlur", () => {
    const fn = jest.fn();
    const { container } = render(<Input onBlur={fn} />);
    fireBlur(container);

    expect(fn).toBeCalled();
  });

  test("fireClear", () => {
    const fn = jest.fn();
    const { container } = render(
      <Input allowClear defaultValue="test" onChange={fn} />
    );
    fireClear(container);
    expect(fn).toBeCalled();
  });

  test("firePressEnter", () => {
    const fn = jest.fn();
    const { container } = render(<Input onPressEnter={fn} />);
    firePressEnter(container);

    expect(fn).toBeCalled();
  });
});
