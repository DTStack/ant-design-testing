import React from "react";
import { render } from "@testing-library/react";
import { Pagination } from "antd";
import { firePageChange, firePageSizeChange } from "..";

describe("Test Pagination's fire functions", () => {
  test("test firePageChange", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination pageSize={10} total={50} onChange={onChange} />
    );
    firePageChange(container, 2);
    expect(onChange).toBeCalledWith(2, 10);
  });

  test("test firePageSizeChange", () => {
    const onPageSizeChange = jest.fn();
    const { container } = render(
      <Pagination
        total={100}
        onShowSizeChange={onPageSizeChange}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    );
    firePageSizeChange(container, 1);
    expect(onPageSizeChange).toBeCalledWith(1, 20);
  });
});
