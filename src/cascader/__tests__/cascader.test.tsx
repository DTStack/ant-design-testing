import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Cascader } from 'antd';

import * as cascader from '..';

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
    test('query', () => {
        const { container, getByTestId } = render(
            <div>
                <Cascader data-testid="cascader1" />
                <Cascader data-testid="cascader2" />
            </div>
        );
        expect(cascader.query(container)).toBe(getByTestId('cascader1'));
        expect(cascader.query(container, 1)).toBe(getByTestId('cascader2'));
    });

    test('querySelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <div>
                <Cascader onDropdownVisibleChange={fn} />
                <Cascader onDropdownVisibleChange={fn} />
            </div>
        );
        cascader.fireOpen(cascader.querySelect(container)!);
        expect(fn).toBeCalledTimes(1);
        cascader.fireOpen(cascader.querySelect(container, 1)!);
        // The second time is called because of hidden the first one
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

        expect(cascader.queryInput(container)).toBe(getByTestId('cascader1').querySelector('input'));
        expect(cascader.queryInput(container, 1)).toBe(getByTestId('cascader2').querySelector('input'));
    });

    test('queryDropdown', () => {
        render(<Cascader open options={options} />);
        expect(cascader.queryDropdown(document)).not.toBeNull();
    });

    test('queryMenu', () => {
        const fn = jest.fn();
        render(<Cascader open options={options} changeOnSelect onChange={fn} />);
        cascader.fireChange(cascader.queryMenu(document)!, 0);
        expect(fn).toBeCalled();
    });

    test('queryMenuItem', () => {
        const fn = jest.fn();
        render(<Cascader open options={options} changeOnSelect onChange={fn} />);
        fireEvent.click(cascader.queryMenuItem(document)!);
        expect(fn).toBeCalled();
    });

    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(<Cascader onDropdownVisibleChange={fn} />);
        cascader.fireOpen(container);
        expect(fn).toBeCalledTimes(1);
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader onChange={fn} getPopupContainer={(node) => node.parentNode} options={options} />
        );
        cascader.fireOpen(container);
        cascader.fireChange(container, 0, 0, 0);
        expect(fn).toBeCalled();
    });

    test('fireChange with hover trigger', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader
                onChange={fn}
                expandTrigger="hover"
                getPopupContainer={(node) => node.parentNode}
                options={options}
            />
        );
        cascader.fireOpen(container);
        cascader.fireChange(container, 'hover', 0, 0, 0);
        expect(fn).toBeCalled();
    });

    test('fireSearch', () => {
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
        cascader.fireSearch(container, 'test');
        expect(fn).toBeCalled();
    });

    test('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <Cascader onClear={fn} options={options} allowClear defaultValue={['1', '1-1', '1-1-1']} />
        );
        cascader.fireClear(container);
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
        cascader.fireOpen(container);
        cascader.fireChange(container, 0, 0, 0);
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(0);

        cascader.fireOpen(cascader.query(container, 1)!);
        cascader.fireChange(cascader.queryDropdown(container, 1)!, 0, 0, 0);
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);
    });
});
