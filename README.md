<div align="center">ant-design-testing</div>

_Easier testing for ant-design-based UI library_

## Usage

```shell
$ pnpm install ant-design-testing -D
```

then, modify the prefixCls if you need it

```tsx
// setupTests.ts
import { provider } from 'ant-design-testing';

provider({ prefixCls: 'ant' });
```

```tsx
// yourInput.test.tsx
import { input } from 'ant-design-testing';

describe("Test input's fire functions", () => {
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Input onChange={fn} />);
        input.fireChange(container, 'test');
        expect(fn).toBeCalled();
    });
});
```
