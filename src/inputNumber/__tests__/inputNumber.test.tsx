import React from 'react';
import { render } from '@testing-library/react';
import { InputNumber } from 'antd';

import * as inputNumber from '..';

describe("Test inputNumber's fire functions", () => {
    test('query', () => {
        const { container } = render(
            <>
                <InputNumber className="test1" />
                <InputNumber className="test2" />
            </>
        );
        expect(inputNumber.query(container)?.className).toEqual(expect.stringContaining('test1'));
        expect(inputNumber.query(container, 1)?.className).toEqual(expect.stringContaining('test2'));
    });

    test('queryInput', () => {
        const { container } = render(<InputNumber />);
        expect(inputNumber.queryInput(container)?.nodeName).toBe('INPUT');
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<InputNumber onChange={fn} />);
        inputNumber.fireChange(container, 1);

        expect(fn).toBeCalledWith(1);
    });

    test('fireStepUp', () => {
        const fn = jest.fn();
        const { container } = render(<InputNumber onStep={fn} defaultValue={1} />);
        inputNumber.fireStepUp(container);

        expect(fn).toBeCalledWith(2, expect.objectContaining({ type: 'up' }));
    });

    test('fireStepDown', () => {
        const fn = jest.fn();
        const { container } = render(<InputNumber onStep={fn} defaultValue={1} />);
        inputNumber.fireStepDown(container);

        expect(fn).toBeCalledWith(0, expect.objectContaining({ type: 'down' }));
    });

    test('fireFocus', () => {
        const fn = jest.fn();
        const { container } = render(<InputNumber onFocus={fn} />);
        inputNumber.fireFocus(container);

        expect(fn).toBeCalled();
    });

    test('fireBlur', () => {
        const fn = jest.fn();
        const { container } = render(<InputNumber onBlur={fn} />);
        inputNumber.fireBlur(container);

        expect(fn).toBeCalled();
    });

    test('firePressEnter', () => {
        const fn = jest.fn();
        const { container } = render(<InputNumber onPressEnter={fn} />);
        inputNumber.firePressEnter(container);

        expect(fn).toBeCalled();
    });
});
