import React from 'react';
import { render } from '@testing-library/react';
import { AutoComplete } from 'antd';

import * as autoComplete from '..';

describe('Test Select fire functions', () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <AutoComplete data-testid="autoComplete1" />
                <AutoComplete data-testid="autoComplete2" />
            </>
        );
        expect(autoComplete.query(container)).toBe(getByTestId('autoComplete1'));
        expect(autoComplete.query(container, 1)).toBe(getByTestId('autoComplete2'));
    });

    /**
     * @link querySelector
     */
    test('querySelector', () => {
        const { container } = render(
            <>
                <AutoComplete data-testid="autoComplete1" />
                <AutoComplete data-testid="autoComplete2" />
            </>
        );
        expect(autoComplete.querySelector(container)).not.toBe(autoComplete.querySelector(container, 1));
    });

    /**
     * @link queryDropdown
     */
    test('queryDropdown', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <AutoComplete options={[{ label: '1', value: '1' }]} onSelect={fn1} />
                <AutoComplete options={[{ label: '2', value: '2' }]} onSelect={fn2} />
            </>
        );
        autoComplete.fireOpen(autoComplete.querySelector(container)!);
        autoComplete.fireSelect(autoComplete.queryDropdown(document)!, 0);
        expect(fn1).toBeCalledWith('1', expect.objectContaining({ label: '1', value: '1' }));

        autoComplete.fireOpen(autoComplete.querySelector(container, 1)!);
        autoComplete.fireSelect(autoComplete.queryDropdown(document)!, 0);
        expect(fn2).toBeCalledWith('2', expect.objectContaining({ label: '2', value: '2' }));
    });

    /**
     * @link queryOption
     */
    test('queryOption', () => {
        const { container } = render(
            <AutoComplete
                getPopupContainer={(node) => node.parentNode}
                options={[
                    { label: 'a', value: 'a' },
                    { label: 'b', value: 'b' },
                ]}
            />
        );
        autoComplete.fireOpen(container);
        expect(autoComplete.queryOption(container)?.textContent).toBe('a');
        expect(autoComplete.queryOption(container, 1)?.textContent).toBe('b');
    });

    /**
     * @link queryClear
     */
    test('queryClear', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <AutoComplete onClear={fn1} value={1} allowClear options={[{ label: 'a', value: 'a' }]} />
                <AutoComplete onClear={fn2} value={1} allowClear options={[{ label: 'a', value: 'a' }]} />
            </>
        );
        autoComplete.fireClear(autoComplete.queryClear(container)!);
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).not.toBeCalled();
        autoComplete.fireClear(autoComplete.queryClear(container, 1)!);
        expect(fn2).toBeCalledTimes(1);
    });

    /**
     * @link queryInput
     */
    test('queryInput', () => {
        const { container, getByTestId } = render(
            <>
                <AutoComplete data-testid="autoComplete1" />
                <AutoComplete data-testid="autoComplete2" />
            </>
        );
        expect(autoComplete.queryInput(container)).toBe(getByTestId('autoComplete1').querySelector('input'));
        expect(autoComplete.queryInput(container, 1)).toBe(getByTestId('autoComplete2').querySelector('input'));
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete onDropdownVisibleChange={fn} options={[{ label: 'a', value: 'a' }]} />
        );
        autoComplete.fireOpen(container);
        expect(fn).toBeCalledWith(true);
    });

    /**
     * @link fireSelect
     */
    test('fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete
                onChange={fn}
                getPopupContainer={(node) => node.parentNode}
                options={[{ label: 'a', value: 'a' }]}
            />
        );
        autoComplete.fireOpen(container);
        autoComplete.fireSelect(container, 0);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireSearch
     */
    test('fireSearch', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onSearch={fn} showSearch options={[{ label: 'a', value: 'a' }]} />);
        autoComplete.fireSearch(container, 'test');
        expect(fn).toBeCalled();
    });

    /**
     * @link fireFocus
     */
    test('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onFocus={fn} options={[{ label: 'a', value: 'a' }]} />);
        autoComplete.fireFocus(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireBlur
     */
    test('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onBlur={fn} options={[{ label: 'a', value: 'a' }]} />);
        autoComplete.fireFocus(container);
        autoComplete.fireBlur(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireClear
     */
    test('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete onClear={fn} defaultValue={1} allowClear options={[{ label: 'a', value: 'a' }]} />
        );
        autoComplete.fireClear(container);
        expect(fn).toBeCalled();
    });
});
