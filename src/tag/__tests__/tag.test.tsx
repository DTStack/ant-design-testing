import React from 'react';
import { render } from '@testing-library/react';
import { Tag } from 'antd';

import * as tag from '..';

describe("Test Tag's fire functions", () => {
    test('test fireClose', () => {
        const fn = jest.fn();
        const { container } = render(
            <div>
                <Tag>tag1</Tag>
                <Tag closable onClose={fn}>
                    tag2
                </Tag>
            </div>
        );
        tag.fireClose(container, 'tag2');
        expect(fn).toHaveBeenCalled();
    });

    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Tag data-testid="test1">tag1</Tag>
                <Tag data-testid="test2">tag2</Tag>
            </>
        );
        expect(tag.query(container, 0)).toEqual(getByTestId('test1'));
        expect(tag.query(container, 'tag2')).toEqual(getByTestId('test2'));
    });
});
