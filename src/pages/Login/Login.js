import React from 'react'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const InputPassword = Input.Password;

const Login = (props={}) => {
 const { form, onFinish  } = props;

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
    label="账号"
    name="phoneNumber"
    rules={[{ required: true, message: '请输入账号' }]}
  >
    <Input placeholder='请输入 11 位手机号' style={{width: 300}}/>
  </FormItem>
  <FormItem
    label="密码"
    name="userSidePasswordHash"
    rules={[{ required: true, message: '请输入密码' }]}
  >
    <InputPassword placeholder='请输入 6 位密码' style={{width: 300}} />
  </FormItem>
  <FormItem wrapperCol={{ offset: 10 }}>
    <Button type="primary" htmlType="submit">
      登录
    </Button>
  </FormItem>
</Form>
 );
};
export default Login;
