import { cleanup, render } from "@testing-library/react";
import { Tooltip } from "antd";
import React from "react";
import { fireOpen } from "..";

describe("test tooltip's fire functions", () => {
  beforeEach(() => {
    cleanup();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("fireOpen", () => {
    const fn = jest.fn();
    const { getByText, getByTestId } = render(
      <Tooltip
        title="This's title"
        getPopupContainer={(node) => node.parentElement!}
        onOpenChange={fn}
      >
        <a data-testid="trigger">trigger</a>
      </Tooltip>
    );
    fireOpen(getByTestId("trigger"));

    expect(fn).toBeCalledTimes(1);
    expect(getByText("This's title")).not.toBeNull();
  });
});
