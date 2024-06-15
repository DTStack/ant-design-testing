import React from 'react';
import { render } from '@testing-library/react';
import { Collapse } from 'antd';

import * as collapse from '..';

describe("Test Collapse's fire functions", () => {
    /**
     * @link query
     */
    test('query', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const items = [
            { key: '1', label: 'panel1', children: 'panel1' },
            { key: '2', label: 'panel2', children: 'panel2' },
        ];
        const { container } = render(
            <>
                <Collapse onChange={fn1} items={items} />
                <Collapse onChange={fn2} items={items} />
            </>
        );
        collapse.query(container, 1)?.fireChange(0);
        expect(fn1).not.toBeCalled();
        expect(fn2).toBeCalled();
    });

    /**
     * @link queryPanelContent
     */
    test('queryPanelContent', () => {
        const items = [
            { key: '1', label: 'panel1', children: 'content1' },
            { key: '2', label: 'panel2', children: 'content2' },
        ];
        const { container, getByText } = render(<Collapse items={items} />);
        // Need to open content panel first
        collapse.fireChange(container, 0);
        collapse.fireChange(container, 1);
        expect(collapse.queryPanelContent(container, 0)).toBe(getByText('content1'));
        expect(collapse.queryPanelContent(container, 1)).toBe(getByText('content2'));
    });

    /**
     * @link queryPanelHeader
     */
    test('queryPanelHeader', () => {
        const items = [
            { key: '1', label: 'panel1', children: 'panel1' },
            { key: '2', label: 'panel2', children: 'panel2' },
        ];
        const { container, getByText } = render(<Collapse items={items} />);
        expect(collapse.queryPanelHeader(container, 0)).toBe(getByText('panel1'));
        expect(collapse.queryPanelHeader(container, 1)).toBe(getByText('panel2'));
    });

    /**
     * @link fireChange
     */
    test('fireChange', () => {
        const fn = jest.fn();
        const items = [
            { key: '1', label: 'panel1', children: 'panel1' },
            { key: '2', label: 'panel2', children: 'panel2' },
        ];
        const { container } = render(<Collapse onChange={fn} items={items} />);
        collapse.fireChange(container, 0);
        expect(fn).toBeCalled();
    });
});
