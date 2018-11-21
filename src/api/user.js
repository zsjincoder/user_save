import axios from '../lib/testAxios.js'
//用户登陆
export const userLogin = (data)=>{
  return axios.request({
    url: '/login',
    data:data,
    method: 'post'
  });
}

//用户注册
export const userRegister = (data)=>{
  return axios.request({
    url: '/register',
    data:data,
    method: 'post'
  });
}
