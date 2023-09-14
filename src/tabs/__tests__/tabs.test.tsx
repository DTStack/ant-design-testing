import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Tabs, type TabsProps } from 'antd';

import * as tabs from '..';

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

    test('query', () => {
        const { container } = render(<Tabs defaultActiveKey="1" items={items} />);
        expect(tabs.query(container)).not.toBeNull();
    });

    test('queryTabTitle', () => {
        const { container } = render(<Tabs defaultActiveKey="1" items={items} />);
        expect(tabs.queryTabTitle(container, '1')?.textContent).toBe('Tab 1');
    });

    test('queryAddButton', () => {
        const { container } = render(<Tabs type="editable-card" defaultActiveKey="1" items={items} />);
        expect(tabs.queryAddButton(container)).toBeInstanceOf(HTMLButtonElement);
    });

    test('queryRemoveButton', () => {
        const { container } = render(<Tabs type="editable-card" defaultActiveKey="1" items={items} />);
        expect(tabs.queryRemoveButton(container, '1')).toBeInstanceOf(HTMLButtonElement);
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" items={items} onChange={fn} />);
        tabs.fireChange(container, '2');
        expect(fn).toBeCalled();
    });

    test('fireClick', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" items={items} onTabClick={fn} />);
        tabs.fireClick(container, '1');
        expect(fn).toBeCalled();
    });

    test('fireEdit', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" type="editable-card" items={items} onEdit={fn} />);
        tabs.fireEdit(container, 'add');
        expect(fn).toBeCalledTimes(1);

        tabs.fireEdit(container, 'remove', '1');
        expect(fn).toBeCalledTimes(2);
    });

    test('fireEdit should throw error', () => {
        const fn = jest.fn();
        const { container } = render(<Tabs defaultActiveKey="1" type="editable-card" items={items} onEdit={fn} />);
        // @ts-ignore
        expect(() => tabs.fireEdit(container, 'test')).toThrow();
    });
});
