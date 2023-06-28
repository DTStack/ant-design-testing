import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Tabs, type TabsProps } from 'antd';

import { fireChange, fireEdit } from '..';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Tab 1`,
        children: `Content of Tab Pane 1`,
    },
    {
        key: '2',
        label: `Tab 2`,
        children: `Content of Tab Pane 2`,
    },
    {
        key: '3',
        label: `Tab 3`,
        children: `Content of Tab Pane 3`,
    },
];

describe("Test Tabs' fire functions", () => {
    beforeEach(cleanup);

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" items={items} onChange={fn} />);
        fireChange(container, '2');
        expect(fn).toBeCalled();
    });

    test('fireClick', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" items={items} onTabClick={fn} />);
        fireChange(container, '1');
        expect(fn).toBeCalled();
    });

    test('fireEdit', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" type="editable-card" items={items} onEdit={fn} />);
        fireEdit(container, 'add');
        expect(fn).toBeCalledTimes(1);

        fireEdit(container, 'remove', '1');
        expect(fn).toBeCalledTimes(2);
    });
});
