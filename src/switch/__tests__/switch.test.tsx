import { cleanup, render } from "@testing-library/react";
import { Switch } from "antd";
import React from "react";
import { fireClick, fireChange, query } from "..";

describe("Test Switch's fire functions", () => {
  beforeEach(cleanup);

  test("fireClick", () => {
    const fn = jest.fn();
    const { container } = render(<Switch onClick={fn} />);

    fireClick(container);
    expect(fn).toBeCalledTimes(1);
  });

  test("fireChange", () => {
    const fn = jest.fn();
    const { container } = render(<Switch onChange={fn} />);

    fireChange(container);
    expect(fn).toBeCalledTimes(1);
  });

  test("query switch", () => {
    const fn = jest.fn();
    const { container } = render(<div>
      <Switch />
      <Switch onClick={fn} />
    </div>);

    const el = query(container, 1)
    fireClick(el);
    expect(fn).toBeCalledTimes(1);
  });
});
