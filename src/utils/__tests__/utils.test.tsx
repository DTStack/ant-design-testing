import React from 'react';
import { render } from '@testing-library/react';

import { failedQuerySelector, failedQuerySelectors, failedTriggerElement, queryViaSelector } from '..';

describe('Test utils', () => {
    [failedQuerySelector, failedTriggerElement].forEach((fn) => {
        it(fn.name, () => {
            expect(fn('test')).toBeInstanceOf(Error);
        });
    });
    it('failedQuerySelectors', () => {
        expect(failedQuerySelectors(['test', 'test2'])).toBeInstanceOf(Error);
    });

    it('queryViaSelector', () => {
        const { container, getByTestId } = render(
            <div data-testid="container">
                <span data-testid="span1" />
                <span data-testid="span2" />
            </div>
        );

        expect(queryViaSelector(container, 'span', 0)).toBe(getByTestId('span1'));
        expect(queryViaSelector(getByTestId('span1'), 'span', 0)).toBe(getByTestId('span1'));
    });
});
