import React from 'react';
import { render } from '@testing-library/react';
import { Switch } from 'antd';

import * as switchEl from '..';

describe("Test Switch's fire functions", () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Switch data-testid="switch1" />
                <Switch data-testid="switch2" />
            </>
        );
        expect(switchEl.query(container)).toBe(getByTestId('switch1'));
        expect(switchEl.query(container, 1)).toBe(getByTestId('switch2'));
    });

    /**
     * @link fireClick
     */
    test('fireClick', () => {
        const fn = jest.fn();
        const { container } = render(<Switch onClick={fn} />);

        switchEl.fireClick(container);
        expect(fn).toBeCalledTimes(1);
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Switch onChange={fn} />);

        switchEl.fireChange(container);
        expect(fn).toBeCalledTimes(1);
    });
});
