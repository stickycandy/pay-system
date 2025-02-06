import api from '@/utils/request';

// 查询黑名单列表
export const queryBlackList = data => {
  return api.post('/admin/ajax_user.php?act=blackList', data)
}

// 添加黑名单
export const addBlackList = data => {
  return api.post('/admin/ajax_user.php?act=addBlack', data)
}

// 删除黑名单
export const deleteBlackList = data => {
  return api.post('/admin/ajax_user.php?act=delBlack', data)
}