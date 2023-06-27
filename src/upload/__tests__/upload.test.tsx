import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Upload, UploadProps } from "antd";
import { fireRemove, fireUploadAsync } from "..";

describe("Test Upload's fire functions", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => cleanup());
  afterEach(() => {
    jest.clearAllTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test("test fireUpload", (done) => {
    const props: UploadProps = {
      beforeUpload: () => false,
      onChange: ({ fileList }) => {
          expect(fileList[0]?.file).toBe('foo.png');
          done();
      },
    };
    const { container } = render(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>
    );

    fireUploadAsync(container, [{ file: "foo.png" }]);
  });

  test("test fireRemove", () => {
    const handleRemove = jest.fn()
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
    const props: UploadProps = {
      beforeUpload: () => false,
      fileList: files as UploadProps["fileList"],
      onRemove: handleRemove,
    };
    const { container } = render(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>
    );

    fireRemove(container, 1);
    expect(handleRemove.mock.calls[0][0]).toMatchObject({name: 'bar.png'})
  });
});
