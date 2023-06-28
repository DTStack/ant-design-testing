import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { AutoComplete } from 'antd';

import { fireBlur, fireChange, fireClear, fireFocus, fireOpen, fireSelect, query } from '..';

describe('Test Select fire functions', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        cleanup();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Test fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete onDropdownVisibleChange={fn} options={[{ label: 'a', value: 'a' }]} />
        );
        fireOpen(container);
        expect(fn).toBeCalledWith(true);
    });

    it('Test fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete
                onChange={fn}
                getPopupContainer={(node) => node.parentNode}
                options={[{ label: 'a', value: 'a' }]}
            />
        );
        fireOpen(container);
        fireSelect(container, 0);
        expect(fn).toBeCalled();
    });

    it('Test fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onSearch={fn} showSearch options={[{ label: 'a', value: 'a' }]} />);
        fireChange(container, 'test');
        expect(fn).toBeCalled();
    });

    it('Test fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onFocus={fn} options={[{ label: 'a', value: 'a' }]} />);
        fireFocus(container);
        expect(fn).toBeCalled();
    });

    it('Test fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<AutoComplete onBlur={fn} options={[{ label: 'a', value: 'a' }]} />);
        fireFocus(container);
        fireBlur(container);
        expect(fn).toBeCalled();
    });

    it('Test fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <AutoComplete onClear={fn} defaultValue={1} allowClear options={[{ label: 'a', value: 'a' }]} />
        );
        fireClear(container);
        expect(fn).toBeCalled();
    });

    it('Test select query', () => {
        const fn = jest.fn();
        const { container } = render(
            <div>
                <AutoComplete allowClear options={[{ label: 'a', value: 'a' }]} />
                <AutoComplete onSearch={fn} allowClear options={[{ label: 'a', value: 'a' }]} />
            </div>
        );
        const el = query(container, 1);
        fireChange(el, 'a');
        expect(fn).toBeCalledWith('a');
    });
});
