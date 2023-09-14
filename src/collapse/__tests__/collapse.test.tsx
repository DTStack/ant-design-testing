import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Collapse } from 'antd';

import * as collapse from '..';

describe("Test Collapse's fire functions", () => {
    beforeEach(cleanup);

    test('query', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const { container } = render(
            <>
                <Collapse onChange={fn1}>
                    <Collapse.Panel header="This is panel header 1" key="qq">
                        1
                    </Collapse.Panel>
                </Collapse>
                <Collapse onChange={fn2}>
                    <Collapse.Panel header="This is panel header 1" key="qq">
                        1
                    </Collapse.Panel>
                </Collapse>
            </>
        );
        collapse.fireChange(collapse.query(container, 1)!, 0);
        expect(fn1).not.toBeCalled();
        expect(fn2).toBeCalled();
    });

    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(
            <Collapse onChange={fn}>
                <Collapse.Panel header="This is panel header 1" key="qq">
                    1
                </Collapse.Panel>
                <Collapse.Panel header="This is panel header 2" key="tt">
                    2
                </Collapse.Panel>
            </Collapse>
        );

        collapse.fireChange(container, 0);
        expect(fn).toBeCalled();
    });
});
