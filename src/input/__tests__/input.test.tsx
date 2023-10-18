import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Input } from 'antd';

import * as input from '..';

describe("Test input's fire functions", () => {
    test('query', () => {
        const { container, getByTestId } = render(
            <div>
                <Input data-testid="input1" />
                <Input data-testid="input2" />
            </div>
        );
        expect(input.query(container)).toBe(getByTestId('input1'));
        expect(input.query(container, 1)).toBe(getByTestId('input2'));
    });

    test('querySearchButton', () => {
        const fn = jest.fn();
        const { container } = render(<Input.Search onSearch={fn} />);
        fireEvent.click(input.querySearchButton(container)!);
        expect(fn).toBeCalled();
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Input onChange={fn} />);
        input.fireChange(container, 'test');
        expect(fn).toBeCalled();
    });

    test('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<Input onFocus={fn} />);
        input.fireFocus(container);
        expect(fn).toBeCalled();
    });

    test('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<Input onBlur={fn} />);
        input.fireBlur(container);
        expect(fn).toBeCalled();
    });

    test('fireClear', () => {
        const fn = jest.fn();
        const { container } = render(<Input allowClear defaultValue="test" onChange={fn} />);
        input.fireClear(container);
        expect(fn).toBeCalled();
    });

    test('firePressEnter', () => {
        const fn = jest.fn();
        const { container } = render(<Input onPressEnter={fn} />);
        input.firePressEnter(container);
        expect(fn).toBeCalled();
    });

    test('fireOnSearch', () => {
        const fn = jest.fn();
        const { container } = render(<Input.Search onSearch={fn} />);
        input.fireSearch(container);
        expect(fn).toBeCalled();
    });
});
