import React from 'react';
import { Form, Input, Button, message } from 'antd';

import * as api from '../../api';

import css from './index.module.scss'

const FormItem = Form.Item;
const InputPassword = Input.Password;

const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
const codeReg = /^\d{6}$/;

const Register = (props={}) => {
 const { form, onFinish  } = props;


 const handleSendCode = () =>{
   const phoneNumber = form.getFieldValue('phoneNumber');
   console.log('phoneNumber', form, phoneNumber)
    if(phoneReg.test(phoneNumber)){
       api.senCode({phoneNumber})
       .then(({data={}})=>{
          const { errcode, message:info='未知错误' } = data
          if(errcode===10000){
            message.success('验证码发送成功，请注意查收');
          }else{
            message.error(info)
          }
       })
    }
 }
 
 return (
  <Form
  name="login"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 20 }}
  form={form}
  onFinish={onFinish}
  autoComplete="off"
>
  <FormItem
    label="用户名"
    name="userName"
    rules={[{ required: true, message: '请输入用户名' }]}
  >
    <Input placeholder='请输入用户名' style={{width: 300}}/>
  </FormItem>
  <div className={css.phone}>
    <FormItem
      label="手机号"
      name="phoneNumber"
      rules={
        [
          { required: true, message: '请输入手机号' },
          { pattern: phoneReg, message:'请输入正确格式的手机号'}
        ]
      }
    >
      <Input placeholder='请输入 11 位手机号' style={{width: 200}} />
    </FormItem>
    <div className={css.sendBtn}>
      <Button
        type="primary"
        onClick={handleSendCode}
      >
        发送验证码
      </Button>
    </div>
  </div>
  <FormItem
    label="验证码"
    name="smsToken"
    rules={
      [
        { required: true, message: '请输入验证码' },
        { pattern: codeReg, message: '请输入 6 位数字'}
      ]
    }
  >
    <Input placeholder='请输入 6 位验证码' style={{width: 300}} />
  </FormItem>
  <FormItem
    label="密码"
    name="passWordMD5Hash"
    rules={
      [
        { required: true, message: '请输入密码' },
        { pattern: codeReg, message: '请输入 6 位数字'}
      ]
    }
  >
    <InputPassword placeholder='请输入 6 位密码' style={{width: 300}} />
  </FormItem>
  <FormItem wrapperCol={{ offset: 10 }}>
    <Button type="primary" htmlType="submit">
      注册
    </Button>
  </FormItem>
</Form>
 );
};
export default Register;
