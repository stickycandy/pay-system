import api from '@/utils/request';

export const login = data => {
  return api.post('/admin/login.php?act=login', data)
}

// 退出登录
export const loginOut = () => {
  return api.get('admin/login.php?logout')
}

// 检查登录状态
export const checkLogin = () => {
  return api.get('/admin/ajax_user.php?act=checkLogin')
}