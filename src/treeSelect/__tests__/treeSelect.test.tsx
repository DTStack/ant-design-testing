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
            <TreeSelect treeData={treeData} getPopupContainer={(node) => node.parentNode} onSelect={fn} />
        );

        treeSelect.fireOpen(container);
        treeSelect.fireSelect(container, 0);
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
});
