import React from 'react';
import { render } from '@testing-library/react';
import { TreeSelect } from 'antd';

import * as treeSelect from '..';

describe("Test treeSelect's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        document.body.innerHTML = '';
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(<TreeSelect onDropdownVisibleChange={fn} />);

        treeSelect.fireOpen(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireSearch
     */
    test('fireSearch', () => {
        const fn = jest.fn();
        const { container } = render(<TreeSelect onSearch={fn} />);

        treeSelect.fireSearch(container, 'test');
        expect(fn).toBeCalled();
    });

    /**
     * @link fireSelect
     */
    test('fireSelect', () => {
        const fn = jest.fn();
        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                children: [
                    {
                        title: 'Child Node1',
                        value: '0-0-1',
                    },
                    {
                        title: 'Child Node2',
                        value: '0-0-2',
                    },
                ],
            },
            {
                title: 'Node2',
                value: '0-1',
            },
        ];
        const { container } = render(
            <TreeSelect
                treeData={treeData}
                treeDefaultExpandAll
                getPopupContainer={(node) => node.parentNode}
                onSelect={fn}
            />
        );

        treeSelect.fireOpen(container);
        treeSelect.fireSelect(container, 3);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireTreeExpand
     */
    test('fireTreeExpand', () => {
        const fn = jest.fn();
        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                children: [
                    {
                        title: 'Child Node1',
                        value: '0-0-1',
                    },
                    {
                        title: 'Child Node2',
                        value: '0-0-2',
                    },
                ],
            },
            {
                title: 'Node2',
                value: '0-1',
            },
        ];
        const { container } = render(
            <TreeSelect treeData={treeData} getPopupContainer={(node) => node.parentNode} onTreeExpand={fn} />
        );

        treeSelect.fireOpen(container);
        treeSelect.fireTreeExpand(container, 0);
        expect(fn).toBeCalled();
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <TreeSelect data-testid="tree1" />
                <TreeSelect data-testid="tree2" />
            </>
        );
        expect(treeSelect.query(container)).toBe(getByTestId('tree1'));
        expect(treeSelect.query(container, 1)).toBe(getByTestId('tree2'));
    });

    /**
     * @link queryInput
     */
    test('queryInput', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <TreeSelect onSearch={fn1} />
                <TreeSelect showSearch onSearch={fn2} />
            </>
        );
        treeSelect.fireSearch(treeSelect.queryInput(container)!, 'test1');
        treeSelect.fireSearch(treeSelect.queryInput(container, 1)!, 'test2');
        expect(fn1).toBeCalledWith('test1');
        expect(fn2).toBeCalledWith('test2');
    });

    /**
     * @link querySelector
     */
    test('querySelector', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <TreeSelect onDropdownVisibleChange={fn1} />
                <TreeSelect onDropdownVisibleChange={fn2} />
            </>
        );
        treeSelect.fireOpen(treeSelect.querySelector(container)!);
        expect(fn1).toBeCalledTimes(1);
        treeSelect.fireOpen(treeSelect.querySelector(container, 1)!);
        expect(fn2).toBeCalledTimes(1);
    });

    /**
     * @link queryDropdown
     */
    test('queryDropdown', () => {
        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                children: [
                    {
                        title: 'Child Node1',
                        value: '0-0-1',
                    },
                    {
                        title: 'Child Node2',
                        value: '0-0-2',
                    },
                ],
            },
        ];
        const fn = jest.fn();
        const { container } = render(<TreeSelect treeData={treeData} onSelect={fn} />);
        treeSelect.fireOpen(treeSelect.querySelector(container)!);
        treeSelect.fireSelect(treeSelect.queryDropdown(document)!, 0);
        expect(fn).toBeCalledWith('0-0', expect.objectContaining({ title: 'Node1', value: '0-0' }));
    });

    /**
     * @link queryOption
     */
    test('queryOption', () => {
        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                children: [
                    {
                        title: 'Child Node1',
                        value: '0-0-1',
                    },
                    {
                        title: 'Child Node2',
                        value: '0-0-2',
                    },
                ],
            },
        ];
        const fn = jest.fn();
        const { container } = render(
            <TreeSelect
                treeData={treeData}
                getPopupContainer={(node) => node.parentNode}
                treeDefaultExpandAll
                onSelect={fn}
            />
        );
        treeSelect.fireOpen(container);
        treeSelect.fireSelect(treeSelect.queryOption(container, 2)!, 0);
        expect(fn).toBeCalledWith('0-0-2', expect.objectContaining({ title: 'Child Node2', value: '0-0-2' }));
    });
});
