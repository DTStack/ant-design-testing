import React from "react";
import { render } from "@testing-library/react";
import { Cascader } from "antd";
import { fireChange, fireOpen, fireSearch, query } from "..";

describe("Test Cascader's fire functions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test("Test fireOpen", () => {
    const fn = jest.fn();
    const { container } = render(<Cascader onDropdownVisibleChange={fn} />);
    fireOpen(container);
    expect(fn).toBeCalled();
  });

  test("Test fireChange", () => {
    const fn = jest.fn();
    const { container } = render(
      <Cascader
        onChange={fn}
        getPopupContainer={(node) => node.parentNode}
        expandTrigger="click"
        options={[
          {
            label: "1",
            value: "1",
            children: [
              {
                label: "1-1",
                value: "1-1",
                children: [
                  {
                    label: "1-1-1",
                    value: "1-1-1",
                  },
                ],
              },
            ],
          },
        ]}
      />
    );
    fireOpen(container);
    fireChange(container, "click", 0, 0, 0);
    expect(fn).toBeCalled();
  });
  
  test("Test fireSearch", () => {
    const fn = jest.fn();
    const { container } = render(
      <Cascader
        showSearch={{
          filter: (inputValue, path) =>
            path.some(
              (option) =>
                (option.label as string)
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase()) > -1
            ),
        }}
        onSearch={fn}
      />
    );
    fireSearch(container, "test");
    expect(fn).toBeCalled();
  });

  test("Test query", () => {
    const fn = jest.fn();
    const { container } = render(
      <div>
        <Cascader />
        <Cascader
          showSearch={{
            filter: (inputValue, path) =>
              path.some(
                (option) =>
                  (option.label as string)
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) > -1
              ),
          }}
          onSearch={fn}
        />
      </div>
    );
    const el = query(container, 1);
    fireSearch(el, "test");
    expect(fn).toBeCalled();
  });
});
