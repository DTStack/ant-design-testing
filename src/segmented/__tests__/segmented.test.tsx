import React from 'react';
import { render } from '@testing-library/react';
import { Segmented } from 'antd';

import * as segmented from '..';

describe("Test Segmented's fire functions", () => {
    test('test fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Segmented options={['One', 'Two', 'Three']} onChange={fn} />);
        segmented.fireChange(container, 1);
        expect(fn).toBeCalledWith('Two');
    });

    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Segmented options={[]} data-testid="test1" />
                <Segmented options={[]} data-testid="test2" />
            </>
        );
        expect(segmented.query(container)).toEqual(getByTestId('test1'));
        expect(segmented.query(container, 1)).toEqual(getByTestId('test2'));
    });
});
