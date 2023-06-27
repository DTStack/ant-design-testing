import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Table } from "antd";
import { fireExpand, fireSelect, fireSelectAll } from "..";

const columns = [
  { dataIndex: "name", title: "Name" },
  { dataIndex: "address", title: "Address" },
];

const dataSource = [
  { id: 1, name: "ZhangSan", age: 17, address: "New York No. 1 Lake Park" },
  { id: 2, name: "LiSi", age: 17, address: "Bei Jing No. 1 Lake Park" },
  { id: 3, name: "WangWu", age: 17, address: "Zhe Jiang No. 1 Lake Park" },
];

describe("Test Table's fire functions", () => {
  beforeEach(cleanup);

  test("test fireSelect", () => {
    const handleSelect = jest.fn();
    const { container } = render(
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          onChange: handleSelect,
        }}
      />
    );
    fireSelect(container, 1);
    expect(handleSelect.mock.calls[0][0]).toEqual([2]);
  });

  test("test fireSelectAll", () => {
    const handleSelect = jest.fn();
    const { container } = render(
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          onSelectAll: handleSelect,
        }}
      />
    );
    fireSelectAll(container);
    expect(handleSelect.mock.calls[0][0]).toBeTruthy();
  });

  test("test fireExpand", () => {
    const handleExpand = jest.fn();
    const { container } = render(
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <p>{record.name}</p>,
          rowExpandable: (record) => record.id !== 2,
          onExpand: handleExpand,
        }}
      />
    );
    fireExpand(container, 2);
    expect(handleExpand.mock.calls[0][0]).toBeTruthy();
    expect(handleExpand.mock.calls[0][1]).toEqual(dataSource[2]);
  });
});
