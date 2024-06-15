import React from 'react';
import { render } from '@testing-library/react';
import { Anchor } from 'antd';

import * as anchor from '..';

describe("Test Anchor's fire functions", () => {
    /**
     * @link fireClick
     */
    test('test fireClick', () => {
        const fn = jest.fn();
        const items = [
            { title: 'a', href: '#a', key: 'a' },
            { title: 'b', href: '#b', key: 'b' },
        ];
        const { container } = render(<Anchor onClick={fn} items={items} />);
        anchor.fireClick(container, '#a');
        expect(fn.mock.calls[0]?.[1]).toMatchObject({ title: 'a', href: '#a' });
        anchor.fireClick(container, 1);
        expect(fn.mock.calls[1]?.[1]).toMatchObject({ title: 'b', href: '#b' });
    });

    /**
     * @link query
     */
    test('test query', () => {
        const { container } = render(
            <>
                <Anchor className="test1" items={[{ title: 'a', key: 'a', href: '#a' }]} />
                <Anchor className="test2" items={[{ title: 'a', key: 'a', href: '#a' }]} />
            </>
        );
        expect(anchor.query(container)?.className).toContain('test1');
        expect(anchor.query(container, 1)?.className).toContain('test2');
    });

    /**
     * @link queryLink
     */
    test('test queryLink', () => {
        const items = [
            { title: 'a', href: '#a', key: 'a' },
            { title: 'b', href: '#b', key: 'b' },
        ];
        const { container, getByTitle } = render(<Anchor items={items} />);
        expect(anchor.queryLink(container)).toEqual(getByTitle('a'));
        expect(anchor.queryLink(container, 1)).toEqual(getByTitle('b'));
    });
});
