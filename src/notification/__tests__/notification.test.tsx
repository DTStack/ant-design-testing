import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { notification as Notification } from 'antd';

import * as notification from '..';

describe("Test Notification's fire functions", () => {
    /**
     * @link fireClick
     */
    test('test fireClick', async () => {
        const fn = jest.fn();
        act(() => {
            Notification.info({
                message: 'This is a notification message',
                duration: 0,
                onClick: fn,
            });
        });
        await waitFor(() => {
            expect(notification.query(document.body)).toBeTruthy();
        });
        notification.fireClick(document.body);
        expect(fn).toHaveBeenCalled();

        act(() => {
            Notification.destroy();
        });
    });

    /**
     * @link fireClose
     */
    test('test fireClose', async () => {
        const fn = jest.fn();
        act(() => {
            Notification.info({
                message: 'This is a notification message',
                duration: 0,
                closeIcon: <span>关闭</span>,
                onClose: fn,
            });
        });
        await waitFor(() => {
            expect(notification.query(document.body)).toBeTruthy();
        });
        notification.fireClose(document.body);
        expect(fn).toBeCalled();
    });

    /**
     * @link query
     */
    test('test query', async () => {
        act(() => {
            Notification.info({
                message: 'This is a notification message',
                className: 'test1',
                duration: 0,
            });
        });
        await waitFor(() => {
            expect(notification.query(document.body)).toBeTruthy();
        });
        expect(notification.query(document.body)?.className).toContain('test1');
    });
});
