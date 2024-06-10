import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'antd';

import * as button from '..';

describe("Test Button's fire functions", () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Button data-testid="button1">button1</Button>
                <Button data-testid="button2">button2</Button>
            </>
        );
        expect(button.query(container)).toBe(getByTestId('button1'));
        expect(button.query(container, 1)).toBe(getByTestId('button2'));
    });

    /**
     * @link fireClick
     */
    test('test fireClick', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <Button onClick={fn1}>Button1</Button>
                <Button onClick={fn2}>Button2</Button>
            </>
        );
        button.fireClick(container);
        expect(fn1).toBeCalled();

        button.query(container, 1)?.fireClick();
        expect(fn2).toBeCalled();
    });

    test('fireClick support dom self', () => {
        const fn = jest.fn();
        const { container } = render(<Button onClick={fn}>Button</Button>);
        button.fireClick(button.query(container)!);
        expect(fn).toBeCalled();
    });
});
