import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { Input } from 'antd';

import * as textarea from '../textarea';

describe("Test textarea's fire functions", () => {
    beforeEach(cleanup);
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Input.TextArea data-testid="textarea1" />
                <Input.TextArea data-testid="textarea2" />
            </>
        );
        expect(textarea.query(container)).toBe(getByTestId('textarea1'));
        expect(textarea.query(container, 1)).toBe(getByTestId('textarea2'));
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onChange={fn} />);
        textarea.fireChange(container, 'test');

        expect(fn).toBeCalled();
    });

    test('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onFocus={fn} />);
        textarea.fireFocus(container);

        expect(fn).toBeCalled();
    });

    test('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onBlur={fn} />);
        textarea.fireBlur(container);

        expect(fn).toBeCalled();
    });

    test('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea allowClear defaultValue="test" onChange={fn} />);
        textarea.fireClear(container);
        expect(fn).toBeCalled();
    });

    test('firePressEnter', () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onPressEnter={fn} />);
        textarea.firePressEnter(container);

        expect(fn).toBeCalled();
    });

    test('fireResize', async () => {
        const fn = jest.fn();
        const { container } = render(<Input.TextArea onResize={fn} />);
        textarea.fireResize(container, { width: 200, height: 300 } as DOMRect);

        await waitFor(() => {
            expect(fn).toBeCalled();
        });
    });
});
