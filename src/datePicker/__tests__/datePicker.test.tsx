import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { DatePicker } from 'antd';
import moment from 'moment';

import * as datePicker from '..';

const dateAdaptor = moment;

describe("Test DatePicker's fire functions", () => {
    beforeEach(cleanup);

    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <DatePicker data-testid="datePicker1" />
                <DatePicker data-testid="datePicker2" />
            </>
        );
        expect(datePicker.query(container)?.querySelector('input')).toBe(getByTestId('datePicker1'));
        expect(datePicker.query(container, 1)?.querySelector('input')).toBe(getByTestId('datePicker2'));
    });

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

    test('queryDropdown', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onChange={fn}
                value={dateAdaptor('2018-04-13 19:18')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.fireChange(datePicker.queryDropdown(container)!, '24');
        expect(
            (fn.mock.calls[0][0] as ReturnType<typeof dateAdaptor>).isSame(dateAdaptor('2018-04-24 19:18'))
        ).toBeTruthy();
        expect(fn.mock.calls[0][1]).toBe(dateAdaptor('2018-04-24 19:18').format('YYYY-MM-DD'));
    });

    test('querySuperPrevButton', () => {
        const { container } = render(
            <DatePicker value={dateAdaptor('2018-04-13 19:18')} getPopupContainer={(node) => node.parentElement!} />
        );
        datePicker.fireOpen(container);
        expect(datePicker.querySuperPrevButton(container)?.nodeName).toBe('BUTTON');
    });

    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(<DatePicker onOpenChange={fn} />);
        datePicker.fireOpen(container);
        expect(fn).toBeCalledTimes(1);
    });

    test('fireClose', () => {
        const fn = jest.fn();
        const { container } = render(<DatePicker onOpenChange={fn} open />);
        datePicker.fireClose(container);
        expect(fn).toBeCalledTimes(1);
    });

    test('firePanelChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onPanelChange={fn}
                value={dateAdaptor('2018-04-13 19:18')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.firePanelChange(container);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18').subtract(1, 'year'), 'date');
    });

    test('firePanelChange with certain button', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onPanelChange={fn}
                value={dateAdaptor('2018-04-13 19:18')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.firePanelChange(datePicker.queryPrevButton(container)!);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18').subtract(1, 'month'), 'date');

        datePicker.firePanelChange(datePicker.queryNextButton(container)!);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18'), 'date');

        datePicker.firePanelChange(datePicker.querySuperNextButton(container)!);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18').add(1, 'year'), 'date');

        datePicker.firePanelChange(datePicker.queryMonthButton(container)!);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18').add(1, 'year'), 'month');

        datePicker.firePanelChange(datePicker.queryYearButton(container)!);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18').add(1, 'year'), 'year');

        datePicker.firePanelChange(datePicker.queryDecadeButton(container)!);
        expect(fn).lastCalledWith(dateAdaptor('2018-04-13 19:18').add(1, 'year'), 'decade');
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <DatePicker
                onChange={fn}
                value={dateAdaptor('2018-04-13 19:18')}
                getPopupContainer={(node) => node.parentElement!}
            />
        );
        datePicker.fireOpen(container);
        datePicker.fireChange(container, '24');
        expect(
            (fn.mock.calls[0][0] as ReturnType<typeof dateAdaptor>).isSame(dateAdaptor('2018-04-24 19:18'))
        ).toBeTruthy();
        expect(fn.mock.calls[0][1]).toBe(dateAdaptor('2018-04-24 19:18').format('YYYY-MM-DD'));
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
