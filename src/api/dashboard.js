import api from '@/utils/request';

// 查询首页数据
export const queryDashboard = () => {
  return api.get('/admin/ajax_order.php?act=dataDashboard')
}