import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Modal } from 'antd';

import { getProvider } from '../../provider';
import { fireCancel, fireOk, fireOpen } from '../confirm';

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
        cleanup();
        jest.useFakeTimers();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('fireOpen', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onOk={fn} />);
        fireOpen(getByTestId('trigger'));

        expect(document.querySelector(`.${getProvider('prefixCls')}-modal-root`)).not.toBeNull();
    });

    test('fireOk', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onOk={fn} />);
        fireOpen(getByTestId('trigger'));
        fireOk(document.body);
        expect(fn).toBeCalled();
    });

    test('fireCancel', () => {
        const fn = jest.fn();
        const { getByTestId } = render(<Confirm onCancel={fn} />);
        fireOpen(getByTestId('trigger'));
        fireCancel(document.body);
        expect(fn).toBeCalled();
    });
});
