import React from "react";
import { notification } from "antd";
import { act, waitFor } from "@testing-library/react";
import { fireClick, fireClose } from "..";

describe("Test Notification's fire functions", () => {
  test("test fireClick", async () => {
    const onClick = jest.fn();
    act(() => {
      notification.info({
        message: "This is a notification message",
        duration: 0,
        onClick,
      });
    });

    await waitFor(() => {
      fireClick(document.body);
      expect(onClick).toHaveBeenCalled();
    });
  });

  test("test fireClose", async () => {
    const onClose = jest.fn();
    act(() => {
      notification.info({
        message: "This is a notification message",
        duration: 0,
        closeIcon: <span>关闭</span>,
        onClose,
      });
    });
    await waitFor(() => {
      fireClose(document.body);
      expect(onClose).toBeCalled();
    });
  });
});
