import React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from 'antd';

import * as breadCrumb from '..';

describe("Test breadcrumb's fire functions", () => {
    /**
     * @link fireClick
     */
    test('test fireClick', () => {
        const fn = jest.fn();
        const items = [{ title: 'Foo' }, { title: 'Bar', onClick: fn }];
        const { container } = render(<Breadcrumb items={items} />);
        breadCrumb.fireClick(container, 1);
        expect(fn).toBeCalled();
    });

    /**
     * @link query
     */
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

    /**
     * @link queryBreadcrumbItem
     */
    test('test queryBreadcrumbItem', () => {
        const items = [{ title: 'Foo' }, { title: 'Bar' }];
        const { container, queryByText } = render(<Breadcrumb items={items} />);

        expect(breadCrumb.queryBreadcrumbItem(container)).toBe(queryByText('Foo'));
        expect(breadCrumb.queryBreadcrumbItem(container, 1)).toBe(queryByText('Bar'));
    });
});
