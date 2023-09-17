import React from 'react';
import { render } from '@testing-library/react';
import { Anchor } from 'antd';

import * as anchor from '..';

describe("Test Anchor's fire functions", () => {
    test('test fireClick', () => {
        const fn = jest.fn();
        const { container } = render(
            <Anchor onClick={fn}>
                <Anchor.Link title="a" href="#a" />
                <Anchor.Link title="b" href="#b" />
            </Anchor>
        );
        anchor.fireClick(container, '#a');
        expect(fn.mock.calls[0]?.[1]).toMatchObject({ title: 'a', href: '#a' });
        anchor.fireClick(container, 1);
        expect(fn.mock.calls[1]?.[1]).toMatchObject({ title: 'b', href: '#b' });
    });

    test('test query', () => {
        const { container } = render(
            <>
                <Anchor className="test1">
                    <Anchor.Link title="a" href="#a" />
                </Anchor>
                <Anchor className="test2">
                    <Anchor.Link title="b" href="#b" />
                </Anchor>
            </>
        );
        expect(anchor.query(container)?.className).toContain('test1');
        expect(anchor.query(container, 1)?.className).toContain('test2');
    });

    test('test queryLink', () => {
        const { container, getByTitle } = render(
            <Anchor>
                <Anchor.Link title="a" href="#a" />
                <Anchor.Link title="b" href="#b" />
            </Anchor>
        );
        expect(anchor.queryLink(container)).toEqual(getByTitle('a'));
        expect(anchor.queryLink(container, 1)).toEqual(getByTitle('b'));
    });
});
