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

    test('query', () => {
        const { container } = render(
            <Popconfirm title="test" getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        expect(confirm.query(container)).not.toBeNull();
    });

    test('queryButtons', () => {
        const { container } = render(
            <Popconfirm title="test" getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        expect(confirm.queryButtons(container)).not.toBeNull();
    });

    test('queryCancelButton', () => {
        const fn = jest.fn();
        const { container } = render(
            <Popconfirm title="test" onCancel={fn} getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        confirm.fireCancel(confirm.queryCancelButton(container)!);
        expect(fn).toBeCalled();
    });

    test('queryConfirmButton', () => {
        const fn = jest.fn();
        const { container } = render(
            <Popconfirm title="test" onConfirm={fn} getPopupContainer={(node) => node.parentElement!}>
                <Button danger>Delete</Button>
            </Popconfirm>
        );
        confirm.fireOpen(button.query(container)!);
        confirm.fireConfirm(confirm.queryConfirmButton(container)!);
        expect(fn).toBeCalled();
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
