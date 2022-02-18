import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, message } from 'antd';

import * as api from '../../api'

import Login from './Login'
import Register from './Register'

import css from './index.module.scss'


const Index = () => {
  
 const navigate = useNavigate();

 const [form] = Form.useForm()
 const [isLogin, setIslogin] = useState(false);

 const onFinish = (values) =>{
   if(isLogin){
     api.login(values)
     .then(({data={}})=>{
       const { errcode, message:info='未知错误' } = data
       if(errcode===10000){
        const { phoneNumber } = values;
        message.success('登录成功')
        navigate(`/speech?userName=${phoneNumber}`)
        return;
       }
        message.error(info);
     })
   }else{
     api.register(values)
     .then(({data={}})=>{
       const { errcode, message:info='未知错误' } = data
       if(errcode===10000){
         message.success('注册成功，请进行登录');
         setIslogin(true);
         return;
       }
       message.error(info)
     })
   }
 }

 const handleEnterLogin = () =>setIslogin(!isLogin)

 return (
  <div className={css.root}>
    <div className={css.form}>
      <div className={css.header}>
        <div className={css.title}>语音合成系统</div>
        <div className={css.desc}>
          <div className={css.word}>
            欢迎使用语音合成系统，输入文字即可生成语音
          </div>
        </div>
      </div>
      {
        isLogin 
        ? <Login form={form} onFinish={onFinish} />
        : <Register form={form} onFinish={onFinish} />
      }
      <div className={css.tips}>
        <span>{`${isLogin?'没有账号请前往':'已有账号请前往'}`}</span>
        <Button
          type="link"
          style={{padding:0}}
          onClick={handleEnterLogin}
        >
          {`${isLogin?'注册':'登录'}`}
        </Button>
      </div>
    </div>
  </div>
 );
};
export default Index;
