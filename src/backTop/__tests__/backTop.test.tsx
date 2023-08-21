import React from "react";
import { render } from "@testing-library/react";
import { Alert, BackTop } from "antd";
import { fireClick } from "..";

describe("Test BackTop's fire functions", () => {
    test('test fireClick', () => {
        const onClick = jest.fn()
        const { container } = render(<BackTop onClick={onClick} visibilityHeight={0} />);
        fireClick(container);
        expect(onClick).toHaveBeenCalled();
    })
})