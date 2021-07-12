import request from '@/utils/request'

export function login(data) {
  const formData = new FormData()
  for (let key in data) {
    if (data[key] instanceof Array){
      for(let i = 0 ; i < data[key].length ; i++){
        formData.append(key, data[key][i])
      }
    }else{
      formData.append(key, data[key])
    }
  }
  return request({
    url: '/ums-user/login',
    method: 'post',
    data:formData
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
