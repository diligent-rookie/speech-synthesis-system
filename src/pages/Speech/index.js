import React,{ useState } from 'react';
import { useSearchParams } from "react-router-dom"
import { Form, Input, Button, Card, message } from 'antd';

import * as api from '../../api'

import css from './index.module.scss'

const FormItem = Form.Item;
const { TextArea } = Input;

const Speech = () => {

 const [ searchParams ] = useSearchParams();
 const [form] = Form.useForm();

 const [url,setUrl] = useState('');
 const [loading,setLoading] = useState(false);

 const userName =  searchParams.get('userName')

 const onFinish = (values) =>{
   setLoading(true);
   // 创建合成记录
    api.createRecord()
    .then(({data={}})=>{
      const {errcode, message:info='未知错误',result={}} = data;
      if(errcode===10000){
        const { RecordId } = result;
        // 提交合成内容
        api.submitText({recordId: RecordId, ...values})
        .then(({data={}})=>{
          const {errcode, message:info='未知错误'} = data;
          if(errcode===10000){
            // 获取合成语音：由于生成语音会需要一定时间，所以立即获取语音可能存在结果为空，我们尝试自动请求 10 次接口
            let count = 0;
            let res ='';
            const timer = setInterval(() => {
              if(!res||count<10){
                count ++;

                api.getResult({recordId:RecordId})
                .then(({data={}})=>{
                  const {errcode,message:info='未知错误', result={}} = data;
                  if(errcode===10000){
                    const { FileUrl } = result;
                    setUrl(FileUrl);
                    res = FileUrl;
                    message.success('语音合成成功');
                    setLoading(false);
                    clearInterval(timer);
                    return;
                  }

                  if(count===10){
                    message.error(info);
                    clearInterval(timer);
                    setLoading(false);
                  }

                })
              }
            }, 1000);
            return;
          }
          setLoading(false);
          message.error(info);
        })
        return;
      }
      setLoading(false);
      message.error(info)
    })
 }

 return (
  <div className={css.root}>
    <div className={css.header}>{`您好: ${userName}，欢迎来到语音合成系统！`}</div>
    <Card className={css.card} bordered={false} >
      <div className={css.content}>
        <Form
          name="speech"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <FormItem
            label="需要转换的文字内容："
            name="text"
            rules={[{ required: true, message: '请输入需要转换的文字内容' }]}
          >
            <TextArea 
              showCount 
              placeholder='请输入要生成语音的文字'
              rows={5}
            />
          </FormItem>
          <FormItem wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              确认生成
            </Button>
          </FormItem>
        </Form> 
        {
          url
          ? <div className={css.audioContainer}>
            <audio controls src={url}>您的浏览器不支持 audio 标签</audio>
          </div>
          :null
        }
      </div>
      <div className={css.gif}></div>
    </Card>
  </div>
 );
};
export default Speech;