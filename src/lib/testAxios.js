import Axios from 'axios'
const baseURL="http://127.0.0.1:8081"
import {getSessionStore} from "@/lib/util.js"
let AUTH_TOKEN=(function(){
  return getSessionStore("token");
})();
let conf = {
  baseURL: baseURL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    //'X-URL-PATH': location.pathname
    'Token':getSessionStore("token")
  }
}
let instance = Axios.create(conf);
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
instance.interceptors.request.use(function(config){
  let url = config.url;
  if(url.indexOf("login")>-1){
    sessionStorage.setItem('token',"");
    config.headers.Authorization = "";
  }
  if(url.indexOf("/")>-1 && url.indexOf("login")<0){
    config.headers.Authorization =sessionStorage.getItem("token");
  }
  return config;
},function(err){
  return Promise.reject(err);
});
instance.interceptors.response.use(function(res){
  if(res.headers.token){
    sessionStorage.setItem('token',res.headers.token);
  }
  return res;
},function(err){
  return err;
});
export default instance;
