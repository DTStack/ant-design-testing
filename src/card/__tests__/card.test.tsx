import React from 'react';
import { render } from '@testing-library/react';
import { Card } from 'antd';

import * as card from '..';

describe("Test card's fire functions", () => {
    test('test fireTabChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <Card
                tabList={[
                    { key: 'tab1', tab: 'tab1' },
                    { key: 'tab2', tab: 'tab2' },
                ]}
                onTabChange={fn}
            />
        );
        card.fireTabChange(container, 'tab2');
        expect(fn).toBeCalledWith('tab2');
    });

    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Card data-testid="test1" />
                <Card data-testid="test2" />
            </>
        );
        expect(card.query(container)).toEqual(getByTestId('test1'));
        expect(card.query(container, 1)).toEqual(getByTestId('test2'));
    });
});
