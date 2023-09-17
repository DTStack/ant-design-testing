import React from 'react';
import { render } from '@testing-library/react';
import { BackTop } from 'antd';

import * as backTop from '..';

describe("Test BackTop's fire functions", () => {
    test('test fireClick', () => {
        const onClick = jest.fn();
        const { container } = render(<BackTop onClick={onClick} visibilityHeight={0} />);
        backTop.fireClick(container);
        expect(onClick).toHaveBeenCalled();
    });
});
