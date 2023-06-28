import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Radio } from 'antd';

import { fireChange, fireMouseEnter, fireMouseLeave } from '..';

describe("Test Radio's fire functions", () => {
    beforeEach(cleanup);

    describe('fireMouseEnter', () => {
        test('fireMouseEnter', () => {
            const fn = jest.fn();
            const { container } = render(<Radio onMouseEnter={fn}>Radio</Radio>);

            fireMouseEnter(container);
            expect(fn).toBeCalledTimes(1);
        });

        test('radio group', () => {
            const fn = jest.fn();
            const { container } = render(
                <Radio.Group onMouseEnter={fn}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            );

            fireMouseEnter(container);
            expect(fn).toBeCalledTimes(1);
        });
    });

    describe('fireMouseLeave', () => {
        test('fireMouseLeave', () => {
            const fn = jest.fn();
            const { container } = render(<Radio onMouseLeave={fn}>Radio</Radio>);

            fireMouseLeave(container);
            expect(fn).toBeCalledTimes(1);
        });

        test('radio group', () => {
            const fn = jest.fn();
            const { container } = render(
                <Radio.Group onMouseLeave={fn}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            );

            fireMouseLeave(container);
            expect(fn).toBeCalledTimes(1);
        });

        test('fireChange', () => {
            const fn = jest.fn();
            const { container } = render(
                <Radio.Group onChange={fn} defaultValue={1}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            );

            fireChange(container, 2);
            expect(fn).toBeCalledTimes(1);
        });
    });
});
