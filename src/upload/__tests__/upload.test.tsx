import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import { Upload, type UploadFile } from "antd";
import { fireRemove, fireUploadAsync } from "..";

describe("Test Upload's fire functions", () => {
  beforeEach(() => {
    cleanup();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("test fireUpload", async () => {
    const fn = jest.fn();
    const { container } = render(
      <Upload beforeUpload={() => false} onChange={fn}>
        <button type="button">upload</button>
      </Upload>
    );

    fireUploadAsync(container, [{ file: "foo.png" }]);
    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
      expect(fn.mock.calls[0][0].fileList[0].file).toBe("foo.png");
    });
  });

  test("test fireRemove", () => {
    const fn = jest.fn();
    const files = [
      {
        uid: "-1",
        name: "foo.png",
        status: "done",
        url: "http://www.baidu.com/xxx.png",
      },
      {
        uid: "-2",
        name: "bar.png",
        status: "done",
        url: "http://www.baidu.com/xxx.png",
      },
    ];
    const { container } = render(
      <Upload
        beforeUpload={() => false}
        fileList={files as UploadFile[]}
        onRemove={fn}
      >
        <button type="button">upload</button>
      </Upload>
    );
    fireRemove(container, 1);
    waitFor(() => {
      expect(fn.mock.calls[0][0]).toMatchObject({ name: "bar.png" });
    });
  });
});
