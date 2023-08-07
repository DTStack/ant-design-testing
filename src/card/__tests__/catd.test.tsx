import React from "react";
import { render } from "@testing-library/react";
import {  Card } from "antd";
import {  fireTabChange } from "..";

describe("Test card's fire functions", () => {
  test("test fireTabChange", () => {
    const fn = jest.fn();
    const { container } = render(
      <Card tabList={[{key: 'tab1', tab: 'tab1'}, {key: 'tab2', tab: 'tab2'}]} onTabChange={fn}></Card>
    );
    fireTabChange(container, 'tab2')
    expect(fn).toBeCalledWith('tab2');
  });
});
