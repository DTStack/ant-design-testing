import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from 'antd';

import * as alert from '..';

describe("Test Segmented's fire functions", () => {
    /**
     * @link fireClose
     */
    test('test fireClose', () => {
        const fn = jest.fn();
        const { container } = render(<Alert message="Warning Text" type="warning" closable onClose={fn} />);
        alert.fireClose(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link query
     */
    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Alert message="Warning Text1" data-testid="test1" />
                <Alert message="Warning Text2" data-testid="test2" />
            </>
        );
        expect(alert.query(container)).toEqual(getByTestId('test1'));
        expect(alert.query(container, 1)).toEqual(getByTestId('test2'));
        alert.query(container, 1);
    });
});
