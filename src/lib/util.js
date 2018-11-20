import Md5 from "js-md5"

//写入token
export const setSessionStore=(key,value)=>{
  sessionStorage.setItem(key,value);
}

//获取token
export const getSessionStore=(key)=>{
  sessionStorage.getItem(key)
}

//md5加密密码
export const setMd5=(str)=>{
  let sort ="kfsfoekfpfksmdlfs''']/"
  return Md5(str+sort);
}
