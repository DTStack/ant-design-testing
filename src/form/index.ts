import { IContainer } from '../interface';
import { getProvider } from '../provider';
import { mixinElementWithTestFuncs, queryViaSelector } from '../utils';

const mixins = {
    query,
    queryFormItems,
    queryFormItemControls,
};

/**
 * Returns the `index` container of Form
 * @param index default is `0`
 */
export function query(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-form`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` form item's element
 * @param index default is `0`
 */
export function queryFormItems(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-form-item`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}

/**
 * Returns the `index` form item's control's element
 * @param index default is `0`
 */
export function queryFormItemControls(container: IContainer, index = 0) {
    const selector = `.${getProvider('prefixCls')}-form-item-control`;
    const ele = queryViaSelector(container, selector, index);
    return mixinElementWithTestFuncs(ele, mixins);
}
