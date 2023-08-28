import { act, render } from "@testing-library/react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import React from "react";
import { fireMenuItemClick, fireSubMenuClick } from "..";

type MenuItems = Required<MenuProps>["items"];

const menuItems: MenuItems = [
  { key: "Option1", label: "Option1" },
  { key: "Option2", label: "Option2" },
  { key: "Option3", label: "Option3" },
  {
    key: "SubOption1",
    label: "SubOption1",
    children: [{ key: "Option4", label: "Option4" }],
  },
  {
    key: "SubOption2",
    label: "SubOption2",
    children: [{ key: "Option5", label: "Option5" }],
  },
];

describe("Test menu fire's functions", () => {
  test("fire menu item click", () => {
    const onClick = jest.fn();
    const menuItems: MenuItems = [
      { key: "Option1", label: "Option1" },
      { key: "Option2", label: "Option2" },
      { key: "Option3", label: "Option3" },
    ];

    const { container } = render(
      <Menu
        items={menuItems}
        onClick={(info) => {
          onClick(info.key);
        }}
      />
    );

    act(() => {
      fireMenuItemClick(container, 0);
    });
    expect(onClick).toBeCalledWith("Option1");
  });

  test("fire submenu click", () => {
    const fn = jest.fn();
    const menuItems: MenuItems = [
      { key: "Option1", label: "Option1" },
      {
        key: "SubOption1",
        label: "SubOption1",
        children: [{ key: "Option2", label: "Option2" }],
      },
      {
        key: "SubOption2",
        label: "SubOption2",
        children: [{ key: "Option3", label: "Option3" }],
      },
    ];

    const { container } = render(
      <Menu items={menuItems} onOpenChange={fn} triggerSubMenuAction="click" />
    );

    act(() => {
      fireSubMenuClick(container, 1);
    });
    expect(fn).toBeCalledWith(["SubOption2"]);
  });
});
