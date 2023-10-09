import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';

import * as tree from '..';

const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                    {
                        title: 'leaf1',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf2',
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

        tree.fireCheck(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireExpand', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onExpand={fn} treeData={treeData} />);

        tree.fireExpand(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireRightClick', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onRightClick={fn} treeData={treeData} />);

        tree.fireRightClick(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(<Tree checkable onSelect={fn} treeData={treeData} />);

        tree.fireSelect(container, 'parent 1');
        expect(fn).toBeCalled();
    });

    test('fireDrag', () => {
        const onDragStart = jest.fn();
        const onDragEnter = jest.fn();
        const onDragOver = jest.fn();
        const onDragLeave = jest.fn();
        const onDrop = jest.fn();
        const onDragEnd = jest.fn();
        const { container } = render(
            <Tree
                treeData={treeData}
                defaultExpandAll
                draggable
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
            />
        );
        tree.fireDrag(container, 'leaf1', 'leaf2');
        expect(onDrop).toHaveBeenCalledWith(
            expect.objectContaining({
                dragNode: expect.objectContaining({ title: 'leaf1' }),
                node: expect.objectContaining({ title: 'leaf2' }),
            })
        );
        expect(onDragStart).toBeCalled();
        expect(onDragEnter).toBeCalled();
        expect(onDragOver).toBeCalled();
        expect(onDragLeave).toBeCalled();
        expect(onDragEnd).toBeCalled();
    });

    test('query', () => {
        const { container } = render(
            <>
                <Tree rootClassName="test1" treeData={treeData} />
                <Tree rootClassName="test2" treeData={treeData} />
            </>
        );
        expect(tree.query(container)?.className).toEqual(expect.stringContaining('test1'));
        expect(tree.query(container, 1)?.className).toEqual(expect.stringContaining('test2'));
    });
});
