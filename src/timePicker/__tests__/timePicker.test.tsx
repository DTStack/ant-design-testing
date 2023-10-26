import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { TimePicker } from 'antd';
import moment from 'moment';

import * as timePicker from '..';

const dateAdaptor = moment;

describe("Test TimePicker's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        cleanup();
        document.body.innerHTML = '';
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container } = render(<TimePicker getPopupContainer={(node) => node.parentElement!} />);
        expect(timePicker.query(container)).not.toBeNull();
    });

    /**
     * @link queryDropdown
     */
    test('queryDropdown', () => {
        const { container } = render(<TimePicker getPopupContainer={(node) => node.parentElement!} />);
        timePicker.fireOpen(container);
        expect(timePicker.queryDropdown(container)).not.toBeNull();
    });

    /**
     * @link queryOk
     */
    test('queryOk', () => {
        const { container } = render(<TimePicker getPopupContainer={(node) => node.parentElement!} />);
        timePicker.fireOpen(container);
        expect(timePicker.queryOk(container)).not.toBeNull();
    });

    /**
     * @link fireOk
     */
    test('fireOk', () => {
        const fn = jest.fn();
        const { container } = render(
            <TimePicker
                defaultOpenValue={dateAdaptor('00:00:00', 'HH:mm:ss')}
                onChange={fn}
                getPopupContainer={(node) => node.parentElement!}
            />
        );

        timePicker.fireOpen(container);
        timePicker.fireOk(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(
            <TimePicker onOpenChange={fn} defaultValue={dateAdaptor('00:00:00', 'HH:mm:ss')} />
        );

        timePicker.fireOpen(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <TimePicker
                onChange={fn}
                getPopupContainer={(node) => node.parentElement!}
                defaultValue={dateAdaptor('00:00:00', 'HH:mm:ss')}
            />
        );

        timePicker.fireOpen(container);
        timePicker.fireChange(container, '12:33:44');
        expect(fn).toBeCalled();
    });

    test('fireChange with RangePicker', () => {
        const fn = jest.fn();
        const { container } = render(
            <TimePicker.RangePicker onChange={fn} getPopupContainer={(node) => node.parentElement!} />
        );

        timePicker.fireOpen(container);
        timePicker.fireChange(container, ['00:00:00', '12:33:44']);
        expect(fn).toBeCalled();
    });
});
