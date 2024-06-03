import React from 'react';
import { render } from '@testing-library/react';
import { Radio } from 'antd';

import * as radio from '..';

describe("Test Radio's fire functions", () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container } = render(<Radio>Radio</Radio>);
        expect(radio.query(container)).not.toBeNull();
    });

    /**
     * @link queryGroup
     */
    test('queryGroup', () => {
        const { container } = render(<Radio.Group options={['Apple', 'Pear', 'Orange']} />);
        expect(radio.queryGroup(container)).not.toBeNull();
    });

    /**
     * @link queryInput
     */
    test('queryInput', () => {
        const { container } = render(<Radio.Group options={['Apple', 'Pear', 'Orange']} />);
        expect(radio.queryInput(container)).not.toBeNull();
    });

    /**
     * @link fireMouseEnter
     */
    test('fireMouseEnter', () => {
        const fn = jest.fn();
        const { container } = render(<Radio onMouseEnter={fn}>Radio</Radio>);

        radio.fireMouseEnter(container);
        expect(fn).toBeCalledTimes(1);
    });

    test('fireMouseEnter with group', () => {
        const fn = jest.fn();
        const { container } = render(
            <Radio.Group onMouseEnter={fn}>
                <Radio value={1}>A</Radio>
            </Radio.Group>
        );

        radio.fireMouseEnter(container);
        expect(fn).toBeCalledTimes(1);
    });

    /**
     * @link fireMouseLeave
     */
    test('fireMouseLeave', () => {
        const fn = jest.fn();
        const { container } = render(<Radio onMouseLeave={fn}>Radio</Radio>);

        radio.fireMouseLeave(container);
        expect(fn).toBeCalledTimes(1);
    });

    /**
     * @link fireMouseLeave
     */
    test('fireMouseLeave with group', () => {
        const fn = jest.fn();
        const { container } = render(
            <Radio.Group onMouseLeave={fn}>
                <Radio value={1}>A</Radio>
            </Radio.Group>
        );

        radio.fireMouseLeave(container);
        expect(fn).toBeCalledTimes(1);
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <Radio.Group onChange={fn} defaultValue={1}>
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
            </Radio.Group>
        );

        radio.fireChange(container, 1);
        expect(fn).toBeCalledTimes(1);
    });
});
