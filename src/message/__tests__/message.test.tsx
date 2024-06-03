import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Button, message as Message } from 'antd';

import * as button from '../../button';
import * as message from '../index';

describe('Test Message', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
        Message.destroy();
    });

    /**
     * @link query
     */
    test('query', async () => {
        const { container } = render(<Button onClick={() => Message.info('This is message')}>Display</Button>);
        button.fireClick(container);
        await waitFor(async () => {
            expect(message.query(document)).not.toBeNull();
        });
    });

    /**
     * @link fireClick
     */
    test('fireClick', async () => {
        const fn = jest.fn();
        const { container } = render(
            <Button
                onClick={() =>
                    Message.info({
                        content: 'this is message',
                        onClick: fn,
                    })
                }
            >
                Display
            </Button>
        );
        button.fireClick(container);
        message.fireClick(document);
        await waitFor(async () => {
            expect(fn).toBeCalledTimes(1);
        });
    });

    /**
     * @link fireClose
     */
    test('fireClose', async () => {
        const fn = jest.fn();
        const { container } = render(
            <Button
                onClick={() =>
                    Message.info({
                        content: 'this is message',
                        duration: 4,
                        onClose: fn,
                    })
                }
            >
                Display
            </Button>
        );
        button.fireClick(container);
        await message.fireClose(4000);
        await waitFor(async () => {
            expect(fn).toBeCalledTimes(1);
        });
    });
});
