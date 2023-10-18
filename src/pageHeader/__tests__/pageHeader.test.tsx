import React from 'react';
import { render } from '@testing-library/react';
import { PageHeader } from 'antd';

import * as pageHeader from '..';

describe("Test PageHeader's fire functions", () => {
    test('test fireBack', () => {
        const fn = jest.fn();
        const { container } = render(<PageHeader title="header" onBack={fn} />);
        pageHeader.fireBack(container);
        expect(fn).toHaveBeenCalled();
    });

    test('test query', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <PageHeader title="test1" onBack={fn1} />
                <PageHeader title="test2" onBack={fn2} />
            </>
        );
        pageHeader.fireBack(pageHeader.query(container)!);
        expect(fn1).toBeCalled();
        expect(fn2).not.toBeCalled();
    });
});
