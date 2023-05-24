import { cleanup, render } from "@testing-library/react";
import { Collapse } from "antd";
import React from "react";
import { fireChange } from "..";

describe("Test Collapse's fire functions", () => {
  beforeEach(cleanup);

  test("fireChange", () => {
    const fn = jest.fn();
    const { container } = render(
      <Collapse onChange={fn}>
        <Collapse.Panel header="This is panel header 1" key="qq">
          1
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" key="tt">
          2
        </Collapse.Panel>
      </Collapse>
    );

    fireChange(container, 0);
    expect(fn).toBeCalled();
  });
});
