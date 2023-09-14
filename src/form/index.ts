import { IContainer } from '../interface';
import { getProvider } from '../provider';
import { queryViaSelector } from '../utils';

/**
 * Returns the `index` container of Form
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-form`;
    return queryViaSelector(container, selector, index);
}

/**
 * Returns the `index` form item's element
 * @param index default is `0`
 */
export function queryFormItems(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-form-item`;
    return queryViaSelector(container, selector, index);
}

/**
 * Returns the `index` form item's control's element
 * @param index default is `0`
 */
export function queryFormItemControls(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-form-item-control`;
    return queryViaSelector(container, selector, index);
}
