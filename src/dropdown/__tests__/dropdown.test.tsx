import React from 'react';
import { render } from '@testing-library/react';
import { Dropdown } from 'antd';

import * as dropdown from '..';

const items = [
    { label: '菜单项一', key: 'item-1' },
    { label: '菜单项二', key: 'item-2' },
];

describe("Test Dropdown's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('test fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(
            <Dropdown menu={{ items }} onOpenChange={fn} trigger={['click', 'hover', 'contextMenu']}>
                <a>button</a>
            </Dropdown>
        );
        dropdown.fireOpen(container);
        expect(fn).toBeCalledTimes(1);
        dropdown.fireOpen(container, 'click');
        expect(fn).toBeCalledTimes(2);
        dropdown.fireOpen(container, 'contextMenu');
        expect(fn).toBeCalledTimes(3);
    });

    test('test fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <Dropdown menu={{ items, onClick: fn }} getPopupContainer={(trigger) => trigger.parentElement!}>
                <a>button</a>
            </Dropdown>
        );
        dropdown.fireOpen(container);
        dropdown.fireSelect(dropdown.queryDropdownMenu(container) as HTMLElement, 1);
        expect(fn.mock.calls[0][0]).toMatchObject({ key: 'item-2' });
    });

    test('test fireCloseWithESC', () => {
        const fn = jest.fn();
        const { container } = render(
            <Dropdown menu={{ items }} onOpenChange={(open) => !open && fn()}>
                <a>button</a>
            </Dropdown>
        );
        dropdown.fireOpen(container);
        dropdown.fireCloseWithESC();
        expect(fn).toBeCalled();
    });

    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Dropdown>
                    <a data-testid="test1">button1</a>
                </Dropdown>
                <a>button2</a>
                <Dropdown>
                    <a data-testid="test2">button3</a>
                </Dropdown>
            </>
        );
        expect(dropdown.query(container)).toEqual(getByTestId('test1'));
        expect(dropdown.query(container, 1)).toEqual(getByTestId('test2'));
    });

    test('test queryDropdownMenuItem', () => {
        const fn = jest.fn();
        const { container } = render(
            <Dropdown
                menu={{
                    items: [
                        { key: 1, label: 'test1' },
                        { key: 2, label: 'test2' },
                    ],
                    onClick: fn,
                }}
                getPopupContainer={(triggerNode) => triggerNode.parentElement!}
            >
                <a>button1</a>
            </Dropdown>
        );
        dropdown.fireOpen(container);
        expect(dropdown.queryDropdownMenuItem(container)?.textContent).toEqual('test1');
        expect(dropdown.queryDropdownMenuItem(container, 1)?.textContent).toEqual('test2');

        dropdown.fireSelect(dropdown.queryDropdownMenuItem(container, 1) as HTMLElement);
        expect(fn).toBeCalledWith(expect.objectContaining({ key: '2' }));
    });
});
