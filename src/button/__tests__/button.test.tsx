import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'antd';

import * as button from '..';

describe("Test Button's fire functions", () => {
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
    test('test fireClick', () => {
        const fn = jest.fn();
        const { container } = render(<Button onClick={fn}>Button</Button>);
        button.fireClick(container);
        expect(fn).toBeCalled();
    });

    test('fireClick support dom self', () => {
        const fn = jest.fn();
        const { container } = render(<Button onClick={fn}>Button</Button>);
        button.fireClick(button.query(container)!);
        expect(fn).toBeCalled();
    });
});
