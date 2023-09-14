import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { Button, Form, Input } from 'antd';

import * as button from '../../button';
import * as form from '../';

describe("Test form's functions", () => {
    beforeEach(() => {
        cleanup();
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    test('query', () => {
        const { container } = render(
            <>
                <Form name="basic" />
                <Form name="advance" />
            </>
        );
        expect(form.query(container)?.id).toBe('basic');
        expect(form.query(container, 1)?.id).toBe('advance');
    });

    test('queryFormItems', async () => {
        const fn = jest.fn();
        const { container } = render(
            <Form onFinish={fn}>
                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
        button.fireClick(form.queryFormItems(container, 1)!);
        await waitFor(() => {
            expect(fn).toBeCalledTimes(1);
        });
    });

    test('queryFormItemControls', () => {
        const { container } = render(
            <Form>
                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>
            </Form>
        );
        expect(form.queryFormItemControls(container)?.querySelector('label')).toBeNull();
    });
});
