import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'antd';

import { fireClick, query } from '..';

describe("Test Button's fire functions", () => {
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Button data-testid="button1">button1</Button>
                <Button data-testid="button2">button2</Button>
            </>
        );
        expect(query(container)).toBe(getByTestId('button1'));
        expect(query(container, 1)).toBe(getByTestId('button2'));
    });
    test('test fireClick', () => {
        const fn = jest.fn();
        const { container } = render(<Button onClick={fn}>Button</Button>);
        fireClick(container);
        expect(fn).toBeCalled();
    });

    test('fireClick support dom self', () => {
        const fn = jest.fn();
        const { container } = render(<Button onClick={fn}>Button</Button>);
        fireClick(query(container)!);
        expect(fn).toBeCalled();
    });
});
