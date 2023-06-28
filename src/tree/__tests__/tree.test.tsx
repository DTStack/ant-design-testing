import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';

import { fireCheck, fireExpand, fireRightClick, fireSelect } from '..';

const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: <span style={{ color: '#1677ff' }}>sss</span>,
                        key: '0-0-1-0',
                    },
                ],
            },
        ],
    },
];

describe("Test Tree's fire functions", () => {
    beforeEach(cleanup);

    test('fireCheck', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onCheck={fn} treeData={treeData} />);

        fireCheck(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireExpand', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onExpand={fn} treeData={treeData} />);

        fireExpand(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireRightClick', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onRightClick={fn} treeData={treeData} />);

        fireRightClick(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onSelect={fn} treeData={treeData} />);

        fireSelect(container, 'parent 1');
        expect(fn).toBeCalled();
    });
});
