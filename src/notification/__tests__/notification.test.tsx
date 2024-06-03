import React from 'react';
import { act, waitForElementToBeRemoved } from '@testing-library/react';
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
        notification.fireClick(document.body);
        expect(fn).toHaveBeenCalled();

        // fix act warnings, need to wait for notfications removed.
        act(() => {
            Notification.destroy();
        });
        await waitForElementToBeRemoved(() => document.body.querySelector('.ant-notification'));
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
        notification.fireClose(document.body);
        expect(fn).toBeCalled();

        // fix act warnings, need to wait for notfications removed.
        act(() => {
            Notification.destroy();
        });
        await waitForElementToBeRemoved(() => document.body.querySelector('.ant-notification'));
    });

    /**
     * @link query
     */
    test('test query', () => {
        act(() => {
            Notification.info({
                message: 'This is a notification message',
                className: 'test1',
                duration: 0,
            });
        });
        expect(notification.query(document.body)?.className).toContain('test1');
    });
});
