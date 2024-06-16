import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ColorPicker } from 'antd';

import * as colorPicker from '..';

describe("Test ColorPicker's fire functions", () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container, getByTestId } = render(
            <>
                <ColorPicker data-testid="colorPicker1" />
                <ColorPicker data-testid="colorPicker2" />
            </>
        );
        expect(colorPicker.query(container)).toEqual(getByTestId('colorPicker1'));
        expect(colorPicker.query(container, 1)).toEqual(getByTestId('colorPicker2'));
    });

    /**
     * @link queryColorPanel
     */
    test('queryColorPanel', () => {
        const { container } = render(<ColorPicker />);
        colorPicker.fireOpen(container);
        expect(colorPicker.queryColorPanel(document)).toBeTruthy();
    });

    /**
     * @link queryColorInput
     */
    test('queryColorInput', () => {
        render(<ColorPicker value="#FFFFFF" open />);
        expect((colorPicker.queryColorInput(document) as unknown as HTMLInputElement)?.value).toBe('ffffff');
    });

    /**
     * @link queryColorAlphaInput
     */
    test('queryColorAlphaInput', () => {
        render(<ColorPicker value="#FFFFFF00" open />);
        expect((colorPicker.queryColorAlphaInput(document) as unknown as HTMLInputElement)?.value).toBe('0%');
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', () => {
        const { container } = render(<ColorPicker trigger="click" />);
        colorPicker.fireOpen(container);
        expect(colorPicker.queryColorPanel(document)).toBeTruthy();
    });

    test('fireOpen trigger by hover', async () => {
        const { container } = render(<ColorPicker trigger="hover" />);
        colorPicker.fireOpen(container, 0, 'hover');
        await waitFor(() => {
            expect(colorPicker.queryColorPanel(document)).toBeTruthy();
        });
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<ColorPicker onChange={fn} />);
        colorPicker.fireOpen(container);
        colorPicker.fireChange(document, { hexColor: '#000000', alpha: '30' });
        // onChange will triiger twice if change hexColor and alpha at the same time
        expect(fn.mock.calls[0][1]).toBe('#000000');
        expect(fn.mock.calls[1][0].metaColor?.a).toBe(0.3);
    });
});
