import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Upload, UploadProps } from 'antd';

import * as upload from '..';

describe("Test Upload's fire functions", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('test fireUpload', async () => {
        const fn = jest.fn();
        const props: UploadProps = {
            beforeUpload: () => false,
            onChange: ({ fileList }) => {
                fn(fileList?.[0]);
            },
        };
        const { container } = render(
            <Upload {...props}>
                <button type="button">upload</button>
            </Upload>
        );
        upload.fireUpload(container, [{ name: 'foo.png' }]);
        await waitFor(() => {
            expect(fn).toBeCalledWith(expect.objectContaining({ name: 'foo.png' }));
        });
    });

    test('test fireRemove', () => {
        const fn = jest.fn();
        const files = [
            {
                uid: '-1',
                name: 'foo.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
            {
                uid: '-2',
                name: 'bar.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
        ];
        const props: UploadProps = {
            beforeUpload: () => false,
            fileList: files as UploadProps['fileList'],
            onRemove: fn,
        };
        const { container } = render(
            <Upload {...props}>
                <button type="button">upload</button>
            </Upload>
        );

        upload.fireRemove(container, 1);
        expect(fn.mock.calls[0][0]).toMatchObject({ name: 'bar.png' });
    });

    test('test query', () => {
        const { container, getByTestId } = render(
            <>
                <Upload data-testid="test1">button1</Upload>
                <Upload data-testid="test2">button2</Upload>
            </>
        );

        expect(upload.query(container)).toEqual(getByTestId('test1'));
        expect(upload.query(container, 1)).toEqual(getByTestId('test2'));
    });

    test('test queryUploadListItem', () => {
        const files = [
            {
                uid: '-1',
                name: 'foo.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
            {
                uid: '-2',
                name: 'bar.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
        ];
        const props: UploadProps = {
            beforeUpload: () => false,
            fileList: files as UploadProps['fileList'],
            itemRender: (_, file) => <div data-testid={file.name}>{file.name}</div>,
        };
        const { container, getByTestId } = render(
            <Upload {...props}>
                <button type="button">upload</button>
            </Upload>
        );
        expect(upload.queryUploadListItem(container)).toEqual(getByTestId('foo.png'));
        expect(upload.queryUploadListItem(container, 1)).toEqual(getByTestId('bar.png'));
    });
});
