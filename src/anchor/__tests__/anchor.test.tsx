import React from "react";
import { render } from "@testing-library/react";
import { Anchor } from "antd";
import { fireClick } from "..";

describe("Test Anchor's fire functions", () => {
  test("test fireClick", () => {
    const fn = jest.fn();
    const { container } = render(
      <Anchor onClick={fn}>
        <Anchor.Link title="a" href="#a" />
        <Anchor.Link title="b" href="#b" />
      </Anchor>
    );
    fireClick(container, "#a");
    expect(fn).toBeCalled();
  });
});
