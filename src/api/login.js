import api from '@/utils/request';

export const login = data => {
  return api.post('/admin/login.php?act=login', data)
}

// 退出登录
export const loginOut = () => {
  return api.get('admin/login.php?logout')
}