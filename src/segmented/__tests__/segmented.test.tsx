import React from "react";
import { render } from "@testing-library/react";
import { Segmented } from "antd";
import { fireChange } from "..";

describe("Test Segmented's fire functions", () => {
    test('test fireChange', () => {
        const fn = jest.fn()
        const {container} = render(<Segmented options={['One', 'Two', 'Three']} onChange={fn}/>)
        fireChange(container, 1);
        expect(fn).toBeCalledWith('Two')
    })
})