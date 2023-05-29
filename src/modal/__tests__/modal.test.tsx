import { cleanup, render } from "@testing-library/react";
import { Modal } from "antd";
import React from "react";
import { fireCancel, fireOk } from "..";

describe("Test Modal fire's functions", () => {
  beforeEach(cleanup);

  test("fireCancel", () => {
    const fn = jest.fn();
    const { container } = render(
      <Modal getContainer={false} open onCancel={fn} />
    );
    fireCancel(container);
    expect(fn).toBeCalled();
  });

  test("fireCancel by icon", () => {
    const fn = jest.fn();
    const { container } = render(
      <Modal getContainer={false} open onCancel={fn} />
    );
    fireCancel(container, { closeByButton: false });
    expect(fn).toBeCalled();
  });

  test("fireOk", () => {
    const fn = jest.fn();
    const { container } = render(
      <Modal getContainer={false} open onOk={fn} />
    );
    fireOk(container);
    expect(fn).toBeCalled();
  });
});
