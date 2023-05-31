import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { Button, Popconfirm } from "antd";
import React from "react";
import { fireCancel, fireConfirm } from "..";

describe("Test popconfirm fire's functions", () => {
  beforeEach(() => {
    cleanup();
    jest.useFakeTimers();
  });

  test("fireCancel", () => {
    const fn = jest.fn();
    const { container } = render(
      <Popconfirm
        title="test"
        onCancel={fn}
        open
        getPopupContainer={(node) => node.parentElement!}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    );
    act(() => {
      jest.runAllTimers();
    });
    fireCancel(container);
    expect(fn).toBeCalled();
  });

  test("fireConfirm", () => {
    const fn = jest.fn();
    const { container } = render(
      <Popconfirm
        title="test"
        onConfirm={fn}
        open
        getPopupContainer={(node) => node.parentElement!}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    );
    act(() => {
      jest.runAllTimers();
    });
    fireConfirm(container);
    expect(fn).toBeCalled();
  });
});
