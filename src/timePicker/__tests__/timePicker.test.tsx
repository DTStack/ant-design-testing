import { cleanup, render } from "@testing-library/react";
import { TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { fireChange, fireOpen } from "..";

const dateAdaptor = moment;

describe("Test TimePicker's fire functions", () => {
  beforeEach(cleanup);

  test("fireOpen", () => {
    const fn = jest.fn();
    const { container } = render(
      <TimePicker
        onOpenChange={fn}
        defaultValue={dateAdaptor("00:00:00", "HH:mm:ss")}
      />
    );

    fireOpen(container);
    expect(fn).toBeCalled();
  });

  describe("fireChange", () => {
    test("fireChange", () => {
      const fn = jest.fn();
      const { container } = render(
        <TimePicker
          onChange={fn}
          getPopupContainer={(node) => node.parentElement!}
          defaultValue={dateAdaptor("00:00:00", "HH:mm:ss")}
        />
      );

      fireOpen(container);
      fireChange(container, "12:33:44");
      expect(fn).toBeCalled();
    });

    test("RangePicker", () => {
      const fn = jest.fn();
      const { container } = render(
        <TimePicker.RangePicker
          onChange={fn}
          getPopupContainer={(node) => node.parentElement!}
        />
      );

      fireOpen(container);
      fireChange(container, ["00:00:00", "12:33:44"]);
      expect(fn).toBeCalled();
    });

    test("format", () => {
      const fn = jest.fn();
      const format = "HH:mm";
      const { container } = render(
        <TimePicker
          defaultValue={dateAdaptor("12:08", format)}
          format={format}
          getPopupContainer={(node) => node.parentElement!}
          onChange={fn}
        />
      );

      fireOpen(container);
      fireChange(container, "13:00");
      expect(fn).toBeCalled();
    });
  });
});
