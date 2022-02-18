import axios from 'axios';

import { authToken, deviceId } from '../util'

const prefix = '/api';

/* 发送验证码 */
export const senCode = (params) =>{
  return axios.post(`${prefix}/user/register/v2/getToken/`, {
    deviceId,
    ...params
  });
}

/* 注册 */
export const register = (params) =>{
  return axios.post(`${prefix}/user/register/v2/`, {
    deviceId,
    ...params
  });
}

/* 登录 */
export const login = (params) =>{
  return axios.post(`${prefix}/user/login/password/`, {
    deviceId,
    ...params
  });
}

/* 创建合成记录 */
export const createRecord = () =>{
  return axios.post(`${prefix}/synthesis/create_synthesis_record/`,{}, {
    headers:{
      Authorization: authToken
    }
  });
}

/* 提交合成内容 */
export const submitText = (params) =>{
  return axios.post(`${prefix}/synthesis/submit_task/`,{...params}, {
    headers:{Authorization: authToken}
  });
}

/* 获取合成语音 */
export const getResult = (params) =>{
  return axios.get(`${prefix}/synthesis/get_result/`, {
    headers:{Authorization: authToken},
    params
  });
}