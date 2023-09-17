import React from 'react';
import { render } from '@testing-library/react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import * as menu from '..';

type MenuItems = Required<MenuProps>['items'];

describe("Test menu fire's functions", () => {
    test('fire menu item click', () => {
        const fn = jest.fn();
        const menuItems: MenuItems = [
            { key: 'Option1', label: 'Option1' },
            { key: 'Option2', label: 'Option2' },
        ];

        const { container } = render(<Menu items={menuItems} onClick={fn} />);
        menu.fireMenuItemClick(container, 0);
        expect(fn.mock.calls[0][0]).toMatchObject({ key: 'Option1' });
    });

    test('fire submenu click', () => {
        const fn = jest.fn();
        const menuItems: MenuItems = [
            { key: 'Option1', label: 'Option1' },
            {
                key: 'SubOption1',
                label: 'SubOption1',
                children: [{ key: 'Option2', label: 'Option2' }],
            },
            {
                key: 'SubOption2',
                label: 'SubOption2',
                children: [{ key: 'Option3', label: 'Option3' }],
            },
        ];

        const { container } = render(<Menu items={menuItems} onOpenChange={fn} triggerSubMenuAction="click" />);

        menu.fireSubMenuClick(container, 1);
        expect(fn).toBeCalledWith(['SubOption2']);
    });

    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Menu data-testid="test1" items={[]} />
                <Menu data-testid="test2" items={[]} />
            </>
        );
        expect(menu.query(container)).toEqual(getByTestId('test1'));
        expect(menu.query(container, 1)).toEqual(getByTestId('test2'));
    });
});
