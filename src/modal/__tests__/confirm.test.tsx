import { cleanup, render, waitFor } from "@testing-library/react";
import { Modal } from "antd";
import React from "react";
import { fireCancel, fireOk, fireOpen } from "../confirm";
import { getProvider } from "../../provider";

function Confirm({ onOk, onCancel }: any) {
  const handleConfirm = () => {
    Modal.confirm({
      title: "Do you Want to delete these items?",
      onOk,
      onCancel,
    });
  };

  return (
    <button data-testid="trigger" onClick={handleConfirm}>
      test
    </button>
  );
}

describe("Test confirm's fire functions", () => {
  beforeEach(() => {
    cleanup();
    jest.useFakeTimers();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("fireOpen", async () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Confirm onOk={fn} />);
    await fireOpen(getByTestId("trigger"));

    expect(
      document.querySelector(`.${getProvider("prefixCls")}-modal-root`)
    ).not.toBeNull();
  });

  test("fireOk", async () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Confirm onOk={fn} />);
    await fireOpen(getByTestId("trigger"));
    fireOk(document.body);
    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  test("fireCancel", async () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Confirm onCancel={fn} />);
    await fireOpen(getByTestId("trigger"));
    fireCancel(document.body);
    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });
});
