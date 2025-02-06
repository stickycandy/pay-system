import api from '@/utils/request';

// 查询收款订单列表
export const queryOrderList = data => {
  return api.post('/admin/ajax_order.php?act=orderList', data)
}

// 查询收款订单详情
export const getOrderDetail = id => {
  return api.get('/admin/ajax_order.php?act=order&trade_no=' + id)
}

// 设置订单状态
export const setStatusOrder = (id, status) => {
  return api.get('/admin/ajax_order.php?act=setStatus&trade_no=' + id + '&status=' + status)
}

// 重新通知
export const reNotify = (data) => {
  return api.post('/admin/ajax_order.php?act=notify' + data)
}

// 手动补单
export const manualRefund = data => {
  return api.post('/admin/ajax_order.php?act=fillorder', data)
}

// 查询收款金额
export const getProvince = (data) => {
  return api.post('/admin/ajax_order.php?act=getmoney', data)
}

export const setRefund = data => {
  return api.post('/admin/ajax_order.php?act=apirefund', data)
}

// 查单
export const checkOrder = data => {
  return api.post('/admin/ajax_order.php?act=checkOrder', data)
}