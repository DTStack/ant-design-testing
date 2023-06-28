import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Select } from 'antd';

import { fireBlur, fireChange, fireClear, fireDeSelect, fireFocus, fireOpen, fireSelect, query } from '..';

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
        const { container } = render(<Select onDropdownVisibleChange={fn} options={[{ label: 1, value: 1 }]} />);
        fireOpen(container);
        expect(fn).toBeCalledWith(true);
    });

    it('Test fireSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select onChange={fn} getPopupContainer={(node) => node.parentNode} options={[{ label: 1, value: 1 }]} />
        );
        fireOpen(container);
        fireSelect(container, 0);
        expect(fn).toBeCalled();
    });

    it('Test fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Select onSearch={fn} showSearch options={[{ label: 1, value: 1 }]} />);
        fireChange(container, 'test');
        expect(fn).toBeCalled();
    });

    it('Test fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<Select onFocus={fn} options={[{ label: 1, value: 1 }]} />);
        fireFocus(container);
        expect(fn).toBeCalled();
    });

    it('Test fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<Select onBlur={fn} options={[{ label: 1, value: 1 }]} />);
        fireFocus(container);
        fireBlur(container);
        expect(fn).toBeCalled();
    });

    it('Test fireClear', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select onClear={fn} defaultValue={1} allowClear options={[{ label: 1, value: 1 }]} />
        );
        fireClear(container);
        expect(fn).toBeCalled();
    });

    it('Test fireDeSelect', () => {
        const fn = jest.fn();
        const { container } = render(
            <Select onDeselect={fn} defaultValue="1" allowClear mode="tags" options={[{ label: 1, value: '1' }]} />
        );
        fireDeSelect(container, 0);
        expect(fn).toBeCalled();
    });

    it('Test select query', () => {
        const fn = jest.fn();
        const { container } = render(
            <div>
                <Select defaultValue="1" allowClear mode="tags" options={[{ label: 1, value: '1' }]} />
                <Select onSearch={fn} defaultValue="1" allowClear mode="tags" options={[{ label: 1, value: '1' }]} />
            </div>
        );
        const el = query(container, 1);
        fireChange(el, '1');
        expect(fn).toBeCalledWith('1');
    });
});
