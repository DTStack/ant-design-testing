import React from 'react';
import { render } from '@testing-library/react';
import { Rate } from 'antd';

import * as rate from '..';

describe("Test rate's fire functions", () => {
    test('test fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Rate allowHalf onChange={fn} />);
        rate.fireChange(container, 3);
        expect(fn).toBeCalledWith(3);
        rate.fireChange(container, 3.5);
        expect(fn).lastCalledWith(3.5);
    });

    test('test fireHoverChange', () => {
        const fn = jest.fn();
        const { container } = render(<Rate allowHalf onHoverChange={fn} />);
        rate.fireHoverChange(container, 3.5);
        expect(fn).toBeCalledWith(3.5);
        rate.fireHoverChange(container, 1);
        expect(fn).lastCalledWith(1);
    });

    test('test query', () => {
        const { container } = render(
            <>
                <Rate className="test1" />
                <Rate className="test2" />
            </>
        );
        expect(rate.query(container).className).toContain('test1');
        expect(rate.query(container, 1).className).toContain('test2');
    });
});
