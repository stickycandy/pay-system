import api from '@/utils/request';

// 查询商户列表
export const queryUserList = data => {
  return api.post('/admin/ajax_user.php?act=userList', data)
}

// 重置appkey
export const resetAppkey = id => {
  return api.get('/admin/ajax_user.php?act=resetUser&uid=' + id)
}

// 设置用户状态
export const setUser = (data) => {
  return api.post('/admin/ajax_user.php?act=setUser', data)
}


// 查询商户的实名状态信息
export const quertUserCert = id => {
  return api.get('/admin/ajax_user.php?act=user_cert&uid=' + id)
}

// 发送结算通知状态
export const setSettlementNotify = id => {
  return api.get('/admin/ajax_user.php?act=settlementNotify&uid=' + id)
}

// 删除商户
export const deleteUser = id => {
  return api.get('/admin/ajax_user.php?act=delUser&uid=' + id)
}

// 添加商户
export const addMerchant = data => {
  return api.post('/admin/ajax_user.php?act=addUser', data)
}

// 查询商户详情
export const queryMerchantDetail = id => {
  return api.get('/admin/ajax_user.php?act=queryUser&uid=' + id)
}

// 编辑商户
export const editMerchant = (uid, data) => {
  return api.post('/admin/ajax_user.php?act=editUser&uid=' + uid, data)
}

// 查询商户费率列表
export const queryUserRateList = (params) => {
  return api.get('/admin/ajax_user.php', {
    params: {
      act: 'userRateList',
      ...params
    }
  })
}

// 查询用户群组
export const queryUserGroup = () => {
  return api.get('/admin/ajax_user.php?act=queryUserGroup')
}