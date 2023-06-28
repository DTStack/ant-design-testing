import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Transfer } from 'antd';

import { fireChange, fireScroll, fireSearch } from '..';

const dataSource = [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c' },
];

describe("Test Transfer's fire functions", () => {
    afterEach(() => cleanup());
    beforeEach(() => {
        jest.useFakeTimers();
    });

    test('test fireChange to target', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <Transfer dataSource={dataSource} selectedKeys={['a']} targetKeys={['b', 'c']} onChange={handleChange} />
        );
        fireChange(container, 'right');
        expect(handleChange).lastCalledWith(['a', 'b', 'c'], 'right', ['a']);
    });

    test('test fireChange to source', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <Transfer
                dataSource={dataSource}
                selectedKeys={['b', 'c']}
                targetKeys={['b', 'c']}
                onChange={handleChange}
            />
        );
        fireChange(container, 'left');
        expect(handleChange).lastCalledWith([], 'left', ['b', 'c']);
    });

    test('test fireScroll', () => {
        const handleScroll = jest.fn();
        const { container } = render(
            <Transfer listStyle={{ height: 30 }} dataSource={dataSource} onScroll={handleScroll} />
        );
        fireScroll(container);
        expect(handleScroll).toBeCalled();
    });

    test('test fireSearch', () => {
        const handleSearch = jest.fn();
        const { container } = render(
            <Transfer
                dataSource={dataSource}
                showSearch
                selectedKeys={[]}
                targetKeys={[]}
                render={(item) => item.title}
                onSearch={handleSearch}
            />
        );
        fireSearch(container, { searchText: 'a', direction: 'left' });
        expect(handleSearch).toBeCalledWith('left', 'a');
        handleSearch.mockReset();
        fireSearch(container, { searchText: 'b', direction: 'right' });
        expect(handleSearch).toBeCalledWith('right', 'b');
    });
});
