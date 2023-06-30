import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Button, Popconfirm } from 'antd';

import * as button from '../../button';
import * as confirm from '..';

describe("Test popconfirm fire's functions", () => {
    beforeEach(() => {
        cleanup();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('fireOpen', () => {
        const fn = jest.fn();
        const { container } = render(
            <Popconfirm title="test" onOpenChange={fn} getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        expect(fn).toBeCalledTimes(1);
    });

    test('fireCancel', () => {
        const fn = jest.fn();
        const { container } = render(
            <Popconfirm title="test" onCancel={fn} getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        confirm.fireCancel(container);
        expect(fn).toBeCalled();
    });

    test('fireConfirm', () => {
        const fn = jest.fn();
        const { container } = render(
            <Popconfirm title="test" onConfirm={fn} getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        confirm.fireConfirm(container);
        expect(fn).toBeCalled();
    });
});
