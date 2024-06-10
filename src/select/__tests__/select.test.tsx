import React from 'react';
import { render } from '@testing-library/react';
import { Select } from 'antd';

import * as select from '..';

describe('Test Select fire functions', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Select data-testid="select1" />
                <Select data-testid="select2" />
            </>
        );
        expect(select.query(container)).toBe(getByTestId('select1'));
        expect(select.query(container, 1)).toBe(getByTestId('select2'));
    });

    /**
     * @link queryInput
     */
    test('queryInput', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <Select showSearch onSearch={fn1} />
                <Select showSearch onSearch={fn2} />
            </>
        );
        select.fireSearch(select.queryInput(container)!, 'test1');
        select.fireSearch(select.queryInput(container, 1)!, 'test2');
        expect(fn1).toBeCalledWith('test1');
        expect(fn2).toBeCalledWith('test2');
    });

    /**
     * @link querySelectorWrapper
     */
    test('querySelectorWrapper', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <Select onDropdownVisibleChange={fn1} />
                <Select onDropdownVisibleChange={fn2} />
            </>
        );
        select.fireOpen(select.querySelectorWrapper(container)!);
        expect(fn1).toBeCalledTimes(1);
        select.fireOpen(select.querySelectorWrapper(container, 1)!);
        expect(fn2).toBeCalledTimes(1);
    });

    /**
     * @link queryDropdown
     */
    test('queryDropdown', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <Select options={[{ label: 1, value: 1 }]} onSelect={fn1} />
                <Select options={[{ label: 2, value: 2 }]} onSelect={fn2} />
            </>
        );
        select.fireOpen(select.querySelectorWrapper(container)!);
        select.fireSelect(select.queryDropdown(document)!, 0);
        expect(fn1).toBeCalledWith(1, expect.objectContaining({ label: 1, value: 1 }));

        select.fireOpen(select.querySelectorWrapper(container, 1)!);
        select.fireSelect(select.queryDropdown(document)!, 0);
        expect(fn2).toBeCalledWith(2, expect.objectContaining({ label: 2, value: 2 }));
    });

    /**
     * @link queryOption
     */
    test('queryOption', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select
                options={[
                    { label: 1, value: 1 },
                    { label: 2, value: 2 },
                ]}
                getPopupContainer={(node) => node.parentNode}
                onSelect={fn}
            />
        );
        select.fireOpen(container);
        select.fireSelect(select.queryOption(container, 1)!, 0);
        expect(fn).toBeCalledWith(2, expect.objectContaining({ label: 2, value: 2 }));
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(<Select onDropdownVisibleChange={fn} options={[{ label: 1, value: 1 }]} />);
        select.fireOpen(container);
        expect(fn).toBeCalledWith(true);
    });

    /**
     * @link fireSelect
     */
    test('fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select onChange={fn} getPopupContainer={(node) => node.parentNode} options={[{ label: 1, value: 1 }]} />
        );
        select.fireOpen(container);
        select.fireSelect(container, 0);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireSearch
     */
    test('fireSearch', () => {
        const fn = jest.fn();
        const { container } = render(<Select onSearch={fn} showSearch options={[{ label: 1, value: 1 }]} />);
        select.fireSearch(container, 'test');
        expect(fn).toBeCalled();
    });

    /**
     * @link fireFocus
     */
    test('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<Select onFocus={fn} options={[{ label: 1, value: 1 }]} />);
        select.fireFocus(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireBlur
     */
    test('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<Select onBlur={fn} options={[{ label: 1, value: 1 }]} />);
        select.fireFocus(container);
        select.fireBlur(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireClear
     */
    test('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select onClear={fn} defaultValue={1} allowClear options={[{ label: 1, value: 1 }]} />
        );
        select.fireClear(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireDeSelect
     */
    test('fireDeSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select onDeselect={fn} defaultValue="1" allowClear mode="tags" options={[{ label: 1, value: '1' }]} />
        );
        select.fireDeSelect(container, 0);
        expect(fn).toBeCalled();
    });
});
