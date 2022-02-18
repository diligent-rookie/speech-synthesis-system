import moment from 'moment';
import CryptoJS from 'crypto-js';

const userId = "97f60634139f998b";
export const deviceId= "apple";
const token = "db8c4956af0f0f0281f3e0dda9879342dc1f853b";
// 确定时间戳（以秒为单位的10位整数串，一并发送到请求body中）
const time = moment();
const timeStampStr = parseInt(time.valueOf()/1000).toString();
// 确定计算HMAC-SHA1签名的参数
const userIdHash = CryptoJS.MD5(userId).toString(CryptoJS.enc.Hex);
const key = token.substring(0,6) + userIdHash.substring(0,6);
// 计算签名，密钥为appKey，信息为appId+timeStampStr
const msg = token + timeStampStr
const signature = CryptoJS.HmacSHA1(msg,key).toString(CryptoJS.enc.Hex);
// 将签名传递到请求body
export const authToken = "Bearer " + userId+";"+deviceId+";"+token+";"+timeStampStr+";"+signature;