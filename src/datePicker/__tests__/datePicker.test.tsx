import { cleanup, render } from "@testing-library/react";
import { DatePicker } from "antd";
import { fireChange, fireClose, fireOpen, firePanelChange } from "..";
import dayjs from "dayjs";
import React from "react";

describe("Test DatePicker's fire functions", () => {
  beforeEach(cleanup);

  test("fireOpen & fireClose", () => {
    const fn = jest.fn();
    const { container } = render(<DatePicker onOpenChange={fn} />);
    fireOpen(container);
    expect(fn).toBeCalledTimes(1);

    fireClose(container);
    expect(fn).toBeCalledTimes(2);
  });

  test("firePanelChange", () => {
    const fn = jest.fn();
    const { container, rerender } = render(
      <DatePicker
        onPanelChange={fn}
        value={dayjs("2018-04-13 19:18")}
        getPopupContainer={(node) => node.parentElement!}
      />
    );
    fireOpen(container);
    firePanelChange(container);
    expect(fn).lastCalledWith(
      dayjs("2018-04-13 19:18").subtract(1, "month"),
      "date"
    );

    firePanelChange(container, "month");
    expect(fn).lastCalledWith(
      dayjs("2018-04-13 19:18").subtract(1, "month"),
      "month"
    );

    firePanelChange(container, "year");
    expect(fn).lastCalledWith(
      dayjs("2018-04-13 19:18").subtract(1, "month"),
      "year"
    );

    firePanelChange(container, "decade");
    expect(fn).lastCalledWith(
      dayjs("2018-04-13 19:18").subtract(1, "month"),
      "decade"
    );

    fn.mockClear();
    rerender(
      <DatePicker
        picker="quarter"
        onPanelChange={fn}
        value={dayjs("2018-04-13 19:18")}
        getPopupContainer={(node) => node.parentElement!}
      />
    );
    fireOpen(container);
    firePanelChange(container, "quarter");
    expect(fn).lastCalledWith(
      dayjs("2018-04-13 19:18").subtract(1, "year"),
      "quarter"
    );

    fn.mockClear();
    rerender(
      <DatePicker
        picker="week"
        onPanelChange={fn}
        value={dayjs("2018-04-13 19:18")}
        getPopupContainer={(node) => node.parentElement!}
      />
    );
    fireOpen(container);
    firePanelChange(container, "week");
    expect(fn).lastCalledWith(
      dayjs("2018-04-13 19:18").subtract(1, "month"),
      "week"
    );
  });

  describe("fireChange", () => {
    test("fireChange", () => {
      const fn = jest.fn();
      const { container } = render(
        <DatePicker
          onChange={fn}
          value={dayjs("2018-04-13 19:18")}
          getPopupContainer={(node) => node.parentElement!}
        />
      );
      fireOpen(container);
      fireChange(container, "24");
      expect(fn).toBeCalledWith(
        dayjs("2018-04-24 19:18"),
        dayjs("2018-04-24 19:18").format("YYYY-MM-DD")
      );
    });

    test("also could select year or month", () => {
      const fn = jest.fn();
      const { container } = render(
        <DatePicker
          onChange={fn}
          value={dayjs("2018-04-13 19:18")}
          getPopupContainer={(node) => node.parentElement!}
        />
      );
      fireOpen(container);
      firePanelChange(container, "month");
      firePanelChange(container, "year");
      fireChange(container, "2019");
      fireChange(container, "Nov");
      fireChange(container, "24");
      expect(fn).toBeCalledWith(
        dayjs("2019-11-24 19:18"),
        dayjs("2019-11-24 19:18").format("YYYY-MM-DD")
      );
    });
  });

  test("fireCalendarChange", () => {
    const fn = jest.fn();
    const { container } = render(
      <DatePicker.RangePicker
        onCalendarChange={fn}
        defaultValue={[dayjs("2018-04-13 19:18"), dayjs("2018-04-16 19:18")]}
        getPopupContainer={(node) => node.parentElement!}
      />
    );
    fireOpen(container);
    fireChange(container, "15");

    expect(fn).toBeCalled();
  });
});
