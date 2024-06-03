import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from 'antd';

import * as modal from '..';

describe("Test Modal fire's functions", () => {
    /**
     * @link queryModalFooter
     */
    test('queryModalFooter', () => {
        const { container } = render(<Modal getContainer={false} open />);
        expect(modal.queryModalFooter(container)).not.toBeNull();
    });

    /**
     * @link queryCancelButton
     */
    test('queryCancelButton', () => {
        const fn = jest.fn();
        const { container } = render(<Modal getContainer={false} open onCancel={fn} />);
        modal.fireCancel(modal.queryCancelButton(container)!);
        expect(fn).toBeCalled();
    });

    /**
     * @link queryOkButton
     */
    test('queryOkButton', () => {
        const fn = jest.fn();
        const { container } = render(<Modal getContainer={false} open onOk={fn} />);
        modal.fireOk(modal.queryOkButton(container)!);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireCancel
     */
    test('fireCancel', () => {
        const fn = jest.fn();
        const { container } = render(<Modal getContainer={false} open onCancel={fn} />);
        modal.fireCancel(container);
        expect(fn).toBeCalled();
    });

    /**
     * @link queryMask
     */
    test('fireCancel with queryMask', () => {
        const fn = jest.fn();
        const { container } = render(<Modal getContainer={false} open onCancel={fn} />);
        modal.fireCancel(modal.queryMask(container)!);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireOk
     */
    test('fireOk', () => {
        const fn = jest.fn();
        const { container } = render(<Modal getContainer={false} open onOk={fn} />);
        modal.fireOk(container);
        expect(fn).toBeCalled();
    });
});
