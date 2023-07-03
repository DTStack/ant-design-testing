import { act, fireEvent } from '@testing-library/react';

import { failedTriggerElement } from '../utils';

/**
 * Show up tooltip
 */
export function fireOpen(ele?: HTMLElement) {
    if (!ele) throw failedTriggerElement();
    act(() => {
        fireEvent.mouseEnter(ele);
        jest.runAllTimers();
    });
}
