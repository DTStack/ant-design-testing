import React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from 'antd';

import * as breadCrumb from '..';

describe("Test breadcrumb's fire functions", () => {
    test('test fireClick', () => {
        const fn = jest.fn();
        const { container } = render(
            <Breadcrumb>
                <Breadcrumb.Item>Foo</Breadcrumb.Item>
                <Breadcrumb.Item onClick={fn}>Bar</Breadcrumb.Item>
            </Breadcrumb>
        );
        breadCrumb.fireClick(container, 1);
        expect(fn).toBeCalled();
    });

    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Breadcrumb data-testid="test1" />
                <Breadcrumb data-testid="test2" />
            </>
        );
        expect(breadCrumb.query(container)).toBe(getByTestId('test1'));
        expect(breadCrumb.query(container, 1)).toBe(getByTestId('test2'));
    });

    test('test queryBreadcrumbItem', () => {
        const { container, queryByText } = render(
            <Breadcrumb>
                <Breadcrumb.Item>Foo</Breadcrumb.Item>
                <Breadcrumb.Item>Bar</Breadcrumb.Item>
            </Breadcrumb>
        );
        expect(breadCrumb.queryBreadcrumbItem(container)).toBe(queryByText('Foo'));
        expect(breadCrumb.queryBreadcrumbItem(container, 1)).toBe(queryByText('Bar'));
    });
});
