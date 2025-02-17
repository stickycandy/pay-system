import api from '@/utils/request';

// 查询首页数据
export const queryDashboard = () => {
  return api.get('/admin/ajax_order.php?act=dataDashboard')
}

// 通道统计
export const queryChannel = () => {
  return api.get('/admin/ajax_order.php?act=currentChannelData')
}