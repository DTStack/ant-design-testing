import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { AutoComplete } from 'antd';

import * as autoComplete from '..';

describe('Test Select fire functions', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        cleanup();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('query', () => {
        const { container, getByTestId } = render(
            <>
                <AutoComplete data-testid="autoComplete1" />
                <AutoComplete data-testid="autoComplete2" />
            </>
        );
        expect(autoComplete.query(container)).toBe(getByTestId('autoComplete1'));
        expect(autoComplete.query(container, 1)).toBe(getByTestId('autoComplete2'));
    });

    it('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete onDropdownVisibleChange={fn} options={[{ label: 'a', value: 'a' }]} />
        );
        autoComplete.fireOpen(container);
        expect(fn).toBeCalledWith(true);
    });

    it('fireSelect', () => {
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

    it('fireSearch', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onSearch={fn} showSearch options={[{ label: 'a', value: 'a' }]} />);
        autoComplete.fireSearch(container, 'test');
        expect(fn).toBeCalled();
    });

    it('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onFocus={fn} options={[{ label: 'a', value: 'a' }]} />);
        autoComplete.fireFocus(container);
        expect(fn).toBeCalled();
    });

    it('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onBlur={fn} options={[{ label: 'a', value: 'a' }]} />);
        autoComplete.fireFocus(container);
        autoComplete.fireBlur(container);
        expect(fn).toBeCalled();
    });

    it('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete onClear={fn} defaultValue={1} allowClear options={[{ label: 'a', value: 'a' }]} />
        );
        autoComplete.fireClear(container);
        expect(fn).toBeCalled();
    });
});
