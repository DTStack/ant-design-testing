import React from 'react';
import { render } from '@testing-library/react';
import { Cascader } from 'antd';

import { fireChange, fireClear, fireOpen, fireSearch, query, queryDropdown, queryInput, querySelect } from '..';

const options = [
    {
        label: '1',
        value: '1',
        children: [
            {
                label: '1-1',
                value: '1-1',
                children: [
                    {
                        label: '1-1-1',
                        value: '1-1-1',
                    },
                ],
            },
        ],
    },
];

describe("Test Cascader's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    test('Test query', () => {
        const { container, getByTestId } = render(
            <div>
                <Cascader data-testid="cascader1" />
                <Cascader data-testid="cascader2" />
            </div>
        );
        expect(query(container)).toBe(getByTestId('cascader1'));
        expect(query(container, 1)).toBe(getByTestId('cascader2'));
    });

    test('querySelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <div>
                <Cascader onDropdownVisibleChange={fn} />
                <Cascader onDropdownVisibleChange={fn} />
            </div>
        );
        fireOpen(querySelect(container)!);
        expect(fn).toBeCalledTimes(1);
        fireOpen(querySelect(container, 1)!);
        // The second time is called by hidden for the first one
        expect(fn).toBeCalledTimes(3);
    });

    test('queryInput', () => {
        const fn = jest.fn();
        const { container, getByTestId } = render(
            <div>
                <Cascader data-testid="cascader1" onSearch={fn} />
                <Cascader data-testid="cascader2" onSearch={fn} />
            </div>
        );

        expect(queryInput(container)).toBe(getByTestId('cascader1').querySelector('input'));
        expect(queryInput(container, 1)).toBe(getByTestId('cascader2').querySelector('input'));
    });

    test('queryDropdown', () => {
        render(<Cascader open options={options} />);
        expect(queryDropdown(document)).not.toBeNull();
    });

    test('Test fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(<Cascader onDropdownVisibleChange={fn} />);
        fireOpen(container);
        expect(fn).toBeCalledTimes(1);
    });

    test('Test fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader onChange={fn} getPopupContainer={(node) => node.parentNode} options={options} />
        );
        fireOpen(container);
        fireChange(container, 0, 0, 0);
        expect(fn).toBeCalled();
    });

    test('fireChange hover', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader
                onChange={fn}
                expandTrigger="hover"
                getPopupContainer={(node) => node.parentNode}
                options={options}
            />
        );
        fireOpen(container);
        fireChange(container, 'hover', 0, 0, 0);
        expect(fn).toBeCalled();
    });

    test('Test fireSearch', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader
                showSearch={{
                    filter: (inputValue, path) =>
                        path.some(
                            (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
                        ),
                }}
                onSearch={fn}
            />
        );
        fireSearch(container, 'test');
        expect(fn).toBeCalled();
    });

    test('Test fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader onClear={fn} options={options} allowClear defaultValue={['1', '1-1', '1-1-1']} />
        );
        fireClear(container);
        expect(fn).toBeCalled();
    });

    test('fireChange with multiple', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <Cascader onChange={fn1} getPopupContainer={(node) => node.parentNode} options={options} />
                <Cascader onChange={fn2} getPopupContainer={(node) => node.parentNode} options={options} />
            </>
        );
        fireOpen(container);
        fireChange(container, 0, 0, 0);
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(0);

        fireOpen(query(container, 1)!);
        fireChange(queryDropdown(container, 1)!, 0, 0, 0);
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);
    });
});
