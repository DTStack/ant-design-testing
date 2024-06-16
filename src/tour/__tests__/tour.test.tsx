import React, { useRef, useState } from 'react';
import { render } from '@testing-library/react';
import { Button, Tour, TourProps } from 'antd';

import { button } from '../../index';
import * as tour from '..';

const TourDemo = ({ onChange, onClose }: any) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: 'Save1',
            description: 'Save your changes.',
            target: () => ref1.current,
        },
        {
            title: 'Save2',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
    ];
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </Button>
            <Button ref={ref1}> Upload</Button>
            <Button ref={ref1}> Upload</Button>
            <Tour
                open={open}
                onClose={() => {
                    setOpen(false);
                    onClose?.();
                }}
                steps={steps}
                onChange={onChange}
            />
        </>
    );
};

describe("Test Tour fire's functions", () => {
    /**
     * @link query
     */
    test('query', () => {
        const { container } = render(<TourDemo />);
        button.fireClick(container);
        expect(tour.query(document)).toEqual(document.querySelector('.ant-tour'));
    });

    /**
     * @link fireNextStep
     */
    test('fireNextStep', () => {
        const fn = jest.fn();
        const { container } = render(<TourDemo onChange={fn} />);
        button.fireClick(container);
        tour.fireNextStep(document);
        expect(fn).toBeCalled();
    });

    /**
     * @link firePrevStep
     */
    test('firePrevStep', () => {
        const fn = jest.fn();
        const { container } = render(<TourDemo onChange={fn} />);
        button.fireClick(container);
        tour.fireNextStep(document);
        expect(fn).toHaveBeenLastCalledWith(1);
        tour.firePrevStep(document);
        expect(fn).toHaveBeenLastCalledWith(0);
    });

    /**
     * @link fireClose
     */
    test('fireClose', () => {
        const fn = jest.fn();
        const { container } = render(<TourDemo onClose={fn} />);
        button.fireClick(container);
        tour.fireClose(document);
        expect(fn).toBeCalled();
    });
});
