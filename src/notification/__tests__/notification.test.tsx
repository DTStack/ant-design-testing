import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { notification } from 'antd';

import { fireClick, fireClose, query } from '..';

describe("Test Notification's fire functions", () => {
    afterEach(() => {
        act(() => {
            notification.destroy();
        });
    });

    test('test fireClick', () => {
        const fn = jest.fn();
        act(() => {
            notification.info({
                message: 'This is a notification message',
                duration: 0,
                onClick: fn,
            });
        });
        fireClick(document.body);
        expect(fn).toHaveBeenCalled();
    });

    test('test fireClose', async () => {
        const fn = jest.fn();
        act(() => {
            notification.info({
                message: 'This is a notification message',
                duration: 0,
                closeIcon: <span>关闭</span>,
                onClose: fn,
            });
        });
        fireClose(document.body);
        await waitFor(() => {
            expect(fn).toBeCalled();
        });
    });

    test('test query', () => {
        act(() => {
            notification.info({
                message: 'This is a notification message',
                className: 'test1',
                duration: 0,
            });
        });
        expect(query(document.body)?.className).toContain('test1');
    });
});
