import React from "react";
import { render } from "@testing-library/react";
import { Breadcrumb } from "antd";
import { fireClick } from "..";

describe("Test breadcrumb's fire functions", () => {
  test("test fireClick", () => {
    const fn = jest.fn();
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.Item>Foo</Breadcrumb.Item>
        <Breadcrumb.Item onClick={fn}>Bar</Breadcrumb.Item>
      </Breadcrumb>
    );
    fireClick(container, 1);
    expect(fn).toBeCalled();
  });
});
