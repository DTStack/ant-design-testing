import React from 'react';
import { render } from '@testing-library/react';
import { Transfer } from 'antd';

import * as transfer from '..';

const dataSource = [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c' },
];

describe("Test Transfer's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container } = render(<Transfer />);
        expect(transfer.query(container)).not.toBeNull();
    });

    /**
     * @link queryOperationButton
     */
    test('queryOperationButton', () => {
        const { container } = render(<Transfer />);
        expect(transfer.queryOperationButton(container)).not.toBeNull();
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <Transfer dataSource={dataSource} selectedKeys={['a']} targetKeys={['b', 'c']} onChange={fn} />
        );
        transfer.fireChange(container, 'right');
        expect(fn).lastCalledWith(['a', 'b', 'c'], 'right', ['a']);
    });

    test('fireChange with left direction', () => {
        const fn = jest.fn();
        const { container } = render(
            <Transfer dataSource={dataSource} selectedKeys={['b', 'c']} targetKeys={['b', 'c']} onChange={fn} />
        );
        transfer.fireChange(container, 'left');
        expect(fn).lastCalledWith([], 'left', ['b', 'c']);
    });

    /**
     * @link fireScroll
     */
    test('fireScroll', () => {
        const fn = jest.fn();
        const { container } = render(<Transfer listStyle={{ height: 30 }} dataSource={dataSource} onScroll={fn} />);
        transfer.fireScroll(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireSearch
     */
    test('fireSearch', () => {
        const fn = jest.fn();
        const { container } = render(
            <Transfer
                dataSource={dataSource}
                showSearch
                selectedKeys={[]}
                targetKeys={[]}
                render={(item) => item.title}
                onSearch={fn}
            />
        );
        transfer.fireSearch(container, { searchText: 'a', direction: 'left' });
        expect(fn).toBeCalledWith('left', 'a');
        fn.mockReset();
        transfer.fireSearch(container, { searchText: 'b', direction: 'right' });
        expect(fn).toBeCalledWith('right', 'b');
    });
});
