import { cleanup, render } from "@testing-library/react";
import { Drawer } from "antd";
import React from "react";
import { fireClose } from "..";

describe("Test Drawer fire's functions", () => {
  beforeEach(cleanup);

  test("fireClose", () => {
    const fn = jest.fn();
    const { container } = render(
      <Drawer getContainer={false} open onClose={fn} />
    );
    fireClose(container);
    expect(fn).toBeCalled();
  });

  test("fireClose by icon", () => {
    const fn = jest.fn();
    const { container } = render(
      <Drawer getContainer={false} open onClose={fn} />
    );
    fireClose(container, { closeByMask: false });
    expect(fn).toBeCalled();
  });
});
