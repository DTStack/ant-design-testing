import React from 'react';
import { render } from '@testing-library/react';
import { BackTop } from 'antd';

import * as backTop from '..';

describe("Test BackTop's fire functions", () => {
    /**
     * @link fireClick
     */
    test('test fireClick', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <BackTop onClick={fn1} visibilityHeight={0} />
                <BackTop onClick={fn2} visibilityHeight={0} />
            </>
        );
        backTop.fireClick(container);
        expect(fn1).toBeCalledTimes(1);

        backTop.query(container, 1)?.fireClick();
        expect(fn2).toBeCalledTimes(1);
    });

    /**
     * @link query
     */
    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <BackTop data-testid="test1" />
                <BackTop data-testid="test2" />
            </>
        );
        expect(backTop.query(container)).toBe(getByTestId('test1'));
        expect(backTop.query(container, 1)).toBe(getByTestId('test2'));
    });
});
