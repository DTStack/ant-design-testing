import { provider } from '../src/provider';

Object.defineProperty(global.window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
    })),
});

provider({ prefixCls: 'ant' });
