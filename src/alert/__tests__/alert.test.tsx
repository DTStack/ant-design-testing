import React from "react";
import { render } from "@testing-library/react";
import { Alert } from "antd";
import { fireClose } from "..";

describe("Test Segmented's fire functions", () => {
    test('test fireChange', () => {
        const fn = jest.fn()
        const { container } = render(
          <Alert
            message="Warning Text"
            type="warning"
            closable
            onClose={fn}
          />
        );
        fireClose(container);
        expect(fn).toBeCalled()
    })
})