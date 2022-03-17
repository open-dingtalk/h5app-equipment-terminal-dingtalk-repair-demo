/*
 * @Author: huangyh
 * @Date: 2021-09-24 14:46:01
 * @LastEditors: huangyh
 * @LastEditTime: 2021-09-24 14:52:29
 */
// 本地数据分页
import array from 'lodash/array';
const paging = (list, pageIndex, pageSize) => {
  if (!list) return [];
  const skipList = array.drop(list, pageSize * (pageIndex - 1));
  const pageData = array.take(skipList, pageSize);
  return pageData;
};
export default paging;
