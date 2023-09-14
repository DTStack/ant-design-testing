import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Button, message as Message } from 'antd';

import * as button from '../../button';
import * as message from '../index';

describe('Test Message', () => {
    beforeEach(() => {
        cleanup();
        document.body.innerHTML = '';
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
        Message.destroy();
    });

    it('query', () => {
        const { container } = render(<Button onClick={() => Message.info('This is message')}>Display</Button>);
        button.fireClick(container);
        expect(message.query(document)).not.toBeNull();
    });

    it('fireClick', () => {
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
        expect(fn).toBeCalledTimes(1);
    });

    it('fireClose', async () => {
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
        expect(fn).toBeCalledTimes(1);
    });
});
