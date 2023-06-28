import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Input } from 'antd';

import { fireBlur, fireChange, fireClear, fireFocus, firePressEnter, fireResize } from '../textarea';

describe("Test textarea's fire functions", () => {
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onChange={fn} />);
        fireChange(container, 'test');

        expect(fn).toBeCalled();
    });

    test('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onFocus={fn} />);
        fireFocus(container);

        expect(fn).toBeCalled();
    });

    test('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onBlur={fn} />);
        fireBlur(container);

        expect(fn).toBeCalled();
    });

    test('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea allowClear defaultValue="test" onChange={fn} />);
        fireClear(container);
        expect(fn).toBeCalled();
    });

    test('firePressEnter', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onPressEnter={fn} />);
        firePressEnter(container);

        expect(fn).toBeCalled();
    });

    test('fireResize', async () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onResize={fn} />);
        fireResize(container, { width: 200, height: 300 } as DOMRect);

        await waitFor(() => {
            expect(fn).toBeCalled();
        });
    });
});
