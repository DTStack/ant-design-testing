import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Drawer } from 'antd';

import * as drawer from '..';

describe("Test Drawer fire's functions", () => {
    beforeEach(cleanup);

    test('fireClose', () => {
        const fn = jest.fn();
        const { container } = render(<Drawer getContainer={false} open onClose={fn} />);
        drawer.fireClose(container);
        expect(fn).toBeCalled();
    });

    test('fireClose by icon', () => {
        const fn = jest.fn();
        const { container } = render(<Drawer getContainer={false} open onClose={fn} />);
        drawer.fireClose(container, { closeByMask: true });
        expect(fn).toBeCalled();
    });
});
