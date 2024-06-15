import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import * as datePicker from '..';

const dateAdaptor = dayjs;

describe("Test DatePicker's fire functions", () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <DatePicker data-testid="datePicker1" />
                <DatePicker data-testid="datePicker2" />
            </>
        );
        expect(datePicker.query(container)?.queryInput()).toBe(getByTestId('datePicker1'));
        expect(datePicker.query(container, 1)?.queryInput()).toBe(getByTestId('datePicker2'));
    });

    /**
     * @link queryInput
     */
    test('queryInput', () => {
        const { container, getByTestId } = render(
            <>
                <DatePicker data-testid="datePicker1" />
                <DatePicker data-testid="datePicker2" />
            </>
        );
        expect(datePicker.queryInput(container)).toBe(getByTestId('datePicker1'));
        expect(datePicker.queryInput(container, 1)).toBe(getByTestId('datePicker2'));
    });

    /**
     * @link queryDropdown
     */
    test('queryDropdown', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onChange={fn}
                value={dateAdaptor('2018-04-13')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.queryDropdown(container)?.fireChange('24');
        expect((fn.mock.calls[0][0] as ReturnType<typeof dateAdaptor>).isSame(dateAdaptor('2018-04-24'))).toBeTruthy();
        expect(fn.mock.calls[0][1]).toBe('2018-04-24');
    });

    /**
     * @link querySuperPrevButton
     */
    test('querySuperPrevButton', () => {
        const { container } = render(
            <DatePicker value={dateAdaptor('2018-04-13 19:18')} getPopupContainer={(node) => node.parentElement!} />
        );
        datePicker.fireOpen(container);
        expect(datePicker.querySuperPrevButton(container)?.nodeName).toBe('BUTTON');
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', async () => {
        const fn = jest.fn();
        const { container } = render(<DatePicker onOpenChange={fn} />);
        datePicker.fireOpen(container);
        expect(fn).toBeCalledTimes(1);
    });

    /**
     * @link fireClose
     */
    test('fireClose', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(<DatePicker onOpenChange={(isOpen) => (isOpen ? fn1() : fn2())} />);
        datePicker.fireOpen(container);
        expect(fn1).toBeCalled();

        datePicker.fireClose(container);
        await waitFor(() => {
            expect(fn2).toBeCalled();
        });
    });

    /**
     * @link firePanelChange
     */
    test('firePanelChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onPanelChange={fn}
                value={dateAdaptor('2018-04-13')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.firePanelChange(container);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13').subtract(1, 'year'), 'date');
    });

    test('firePanelChange with certain button', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onPanelChange={fn}
                value={dateAdaptor('2018-04-13')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.queryPrevButton(container)?.firePanelChange();
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13').subtract(1, 'month'), 'date');

        datePicker.queryNextButton(container)?.firePanelChange();
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13'), 'date');

        datePicker.querySuperNextButton(container)?.firePanelChange();
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13').add(1, 'year'), 'date');

        datePicker.queryMonthButton(container)?.firePanelChange();
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13').add(1, 'year'), 'month');

        datePicker.queryYearButton(container)?.firePanelChange();
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13').add(1, 'year'), 'year');

        datePicker.queryDecadeButton(container)?.firePanelChange();
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13').add(1, 'year'), 'decade');
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onChange={fn}
                value={dateAdaptor('2018-04-13')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.fireChange(container, '24');

        expect(fn.mock.calls[0][1]).toBe('2018-04-24');
    });

    test('fireCalendarChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker.RangePicker
                onCalendarChange={fn}
                defaultValue={[dateAdaptor('2018-04-13 19:18'), dateAdaptor('2018-04-16 19:18')]}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.fireChange(container, '15');

        expect(fn).toBeCalled();
    });

    /**
     * @link fireOk
     */
    test('fireOk', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                showTime
                onOk={fn}
                value={dateAdaptor('2018-04-13 19:18')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );

        datePicker.fireOpen(container);
        datePicker.fireOk(container);
        expect(fn).toBeCalledTimes(1);
    });
});
