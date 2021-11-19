import axios from 'axios';
import Vue from 'vue';
let request = axios.create({})
request.defaults.baseURL="http://47.96.65.127:21020/"
request.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  if(token){
    config.headers.token = token;
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
request.interceptors.response.use(function (config) {
  
  return config;
})
export default request;