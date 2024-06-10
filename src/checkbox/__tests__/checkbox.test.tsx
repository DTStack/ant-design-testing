import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from 'antd';

import * as checkbox from '..';

describe('Test checkbox', () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <Checkbox data-testid="Checkbox1">Checkbox</Checkbox>
                <Checkbox data-testid="Checkbox2">Checkbox</Checkbox>
            </>
        );
        expect(checkbox.query(container)?.queryInput()).toBe(getByTestId('Checkbox1'));
        expect(checkbox.query(container, 1)?.queryInput()).toBe(getByTestId('Checkbox2'));
    });

    /**
     * @link queryGroup
     */
    test('queryGroup', () => {
        const { container, getByTestId } = render(
            <>
                <Checkbox.Group data-testid="Checkbox1" />
                <Checkbox.Group data-testid="Checkbox2" />
            </>
        );
        expect(checkbox.queryGroup(container)).toBe(getByTestId('Checkbox1'));
        expect(checkbox.queryGroup(container, 1)).toBe(getByTestId('Checkbox2'));
    });

    /**
     * @link queryInput
     */
    test('queryInput', () => {
        const fn = jest.fn();
        const { container } = render(<Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={fn} />);
        checkbox.fireChange(checkbox.queryInput(container)!, 0);
        expect(fn).toBeCalledWith(['Apple']);
    });

    test('queryInput via chain', () => {
        const fn = jest.fn();
        const { container } = render(<Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={fn} />);
        checkbox.queryInput(container)?.fireChange(0);
        expect(fn).toBeCalledWith(['Apple']);
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={fn} />);
        checkbox.fireChange(container, 0);
        expect(fn).toBeCalledWith(['Apple']);
    });
});
