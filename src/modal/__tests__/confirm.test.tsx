import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from 'antd';

import { getProvider } from '../../provider';
import * as confirm from '../confirm';

function Confirm({ onOk, onCancel }: any) {
    const handleConfirm = () => {
        Modal.confirm({
            title: 'Do you Want to delete these items?',
            onOk,
            onCancel,
        });
    };

    return (
        <button data-testid="trigger" onClick={handleConfirm}>
            test
        </button>
    );
}

describe("Test confirm's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    /**
     * @link query
     */
    test('query', () => {
        const { getByTestId } = render(<Confirm />);
        confirm.fireOpen(getByTestId('trigger'));
        expect(confirm.query(document)).not.toBeNull();
    });

    /**
     * @link queryBtns
     */
    test('queryBtns', () => {
        const { getByTestId } = render(<Confirm />);
        confirm.fireOpen(getByTestId('trigger'));
        expect(confirm.queryBtns(document)).not.toBeNull();
    });

    /**
     * @link queryCancelButton
     */
    test('queryCancelButton', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onCancel={fn} />);
        confirm.fireOpen(getByTestId('trigger'));
        confirm.fireCancel(confirm.queryCancelButton(document)!);
        expect(fn).toBeCalled();
    });

    /**
     * @link queryOkButton
     */
    test('queryOkButton', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onOk={fn} />);
        confirm.fireOpen(getByTestId('trigger'));
        confirm.fireOk(confirm.queryOkButton(document)!);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireOpen
     */
    test('fireOpen', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onOk={fn} />);
        confirm.fireOpen(getByTestId('trigger'));

        expect(document.querySelector(`.${getProvider('prefixCls')}-modal-root`)).not.toBeNull();
    });

    /**
     * @link fireOk
     */
    test('fireOk', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onOk={fn} />);
        confirm.fireOpen(getByTestId('trigger'));
        confirm.fireOk(document.body);
        expect(fn).toBeCalled();
    });

    /**
     * @link fireCancel
     */
    test('fireCancel', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onCancel={fn} />);
        confirm.fireOpen(getByTestId('trigger'));
        confirm.fireCancel(document.body);
        expect(fn).toBeCalled();
    });
});
