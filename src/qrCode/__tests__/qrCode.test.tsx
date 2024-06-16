import React from 'react';
import { render } from '@testing-library/react';
import { QRCode } from 'antd';

import * as qrCode from '..';

describe("Test QRCode fire's functions", () => {
    // Spy on console.log to fix jsdom canvas not implemented error
    const originalLog = console.log;
    const originalError = console.error;

    beforeAll(() => {
        console.log = jest.fn();
        console.error = jest.fn();
    });

    afterAll(() => {
        console.log = originalLog;
        console.error = originalError;
    });

    /**
     * @link query
     */
    test('query', () => {
        const { container } = render(<QRCode value="http://www.google.com" />);
        expect(qrCode.query(container)).toBeTruthy();
    });

    /**
     * @link fireRefresh
     */
    test('fireRefresh', () => {
        const fn = jest.fn();
        const { container } = render(<QRCode value="http://www.google.com" status="expired" onRefresh={fn} />);
        qrCode.fireRefresh(container);
        expect(fn).toBeCalled();
    });
});
