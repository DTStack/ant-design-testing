import React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from 'antd';

import * as pagination from '../';

describe('Test Pagination', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.query(container)).not.toBeNull();
    });

    /**
     * @link queryPrevButton
     */
    test('queryPrevButton', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.queryPrevButton(container)).not.toBeNull();
    });

    /**
     * @link queryNextButton
     */
    test('queryNextButton', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.queryNextButton(container)).not.toBeNull();
    });

    /**
     * @link queryPaginationItem
     */
    test('queryPaginationItem', () => {
        const { container } = render(<Pagination defaultCurrent={6} total={500} />);
        expect(pagination.queryPaginationItem(container, 1)).not.toBeNull();
    });

    /**
     * @link fireSizeChange
     */
    test('fireSizeChange', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={6} total={500} onShowSizeChange={fn} />);
        pagination.fireSizeOpen(container);
        pagination.fireSizeChange(container, 1);
        expect(fn).toBeCalledWith(6, 20);
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(container);
        expect(fn).toBeCalledWith(2, 10);
    });

    test('fireChange with queryPrevButton', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(container);
        expect(fn).toBeCalledWith(2, 10);
        pagination.fireChange(pagination.queryPrevButton(container)!);
        expect(fn).toBeCalledWith(1, 10);
    });

    test('fireChange with specific item', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(pagination.queryPaginationItem(container, 3)!);
        expect(fn).toBeCalledWith(3, 10);
    });

    /**
     * @link queryJumpNext
     */
    test('fireChange with jump next', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={1} total={500} onChange={fn} />);
        pagination.fireChange(pagination.queryJumpNext(container)!);
        expect(fn).toBeCalledWith(6, 10);
    });

    /**
     * @link queryJumpPrev
     */
    test('fireChange with jump prev', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={6} total={500} onChange={fn} />);
        pagination.fireChange(pagination.queryJumpPrev(container)!);
        expect(fn).toBeCalledWith(1, 10);
    });

    /**
     * @link queryQuickJump
     */
    test('fireChange with quick jump', () => {
        const fn = jest.fn();
        const { container } = render(<Pagination defaultCurrent={6} total={500} onChange={fn} showQuickJumper />);
        pagination.fireChange(pagination.queryQuickJump(container)!, 20);
        expect(fn).toBeCalledWith(20, 10);
    });
});
